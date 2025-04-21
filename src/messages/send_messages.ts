import { IUser } from "../types/interfaces";
import { all_users, remove_user } from "../database/database_operations";
import { bot } from "..";
import { escape_message, random_emoji, random_greeting, random_motivation } from "./build_messages";

export async function send_one(user: IUser): Promise<void> {
    const greeting: string = random_greeting();
    const motivation: string = random_motivation();
    const emoji: string = random_emoji();

    send_message(user, greeting, motivation, emoji, "Send Message");
}

export async function send_all(): Promise<void> {
    console.log(`\nStarting Broadcasting Messages.`);

    const greeting: string = random_greeting();
    const motivation: string = random_motivation();
    const emoji: string = random_emoji();

    const users = await all_users();
    for(const user of users) {
        send_message(user, greeting, motivation, emoji, "Broadcasted Message");
    }

    console.log(`\n`);
}

async function send_message(user: IUser, greeting: string, motivation: string, emoji:string, log_message: string): Promise<void> {
    try {
        await bot.api.sendMessage(user.chat_id, `${escape_message(greeting)} ${escape_message(user.name)} ${emoji}\\!\n\n\_${escape_message(motivation)}\_`, { parse_mode: "MarkdownV2"  });
        console.log(`${user.name}/${user.chat_id}: ${log_message}.`);
    } catch (err) {
        console.error(`[Bot] Error in send_message ${user.name}/${user.chat_id}: ${err}.`);

        if (err.error_code == 403) {
            await remove_user(user.chat_id, user.name, true);
        }
    }
}