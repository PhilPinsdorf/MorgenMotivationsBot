import { bot } from ".";
import { replys } from "./types/definitions"; 
import sanitize from "mongo-sanitize";
import { Context } from "grammy";
import { user_exists, add_user, remove_user } from "./database/database_operations"
import { escape_message } from "./messages/build_messages";
import { send_one } from "./messages/send_messages";

// Returns a promise, that starts the bot
export function start_bot(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        bot.command('start', async (ctx) => {
            const { chat_id, name } = get_user_info(ctx);
            const user = await add_user(chat_id, name);
            
            if(user) {
                ctx.reply(
                    escape_message(replys.start(name)),
                    { parse_mode: "MarkdownV2" }
                );
                return;
            } 
            
            ctx.reply(replys.already_registered());
        });


        bot.command('stop', async (ctx) => {
            const { chat_id, name } = get_user_info(ctx);
            const user = await remove_user(chat_id, name, false);

            if(user) {
                ctx.reply(
                    escape_message(replys.stop(name)),
                    { parse_mode: "MarkdownV2" }
                );
                return; 
            }

            ctx.reply(replys.already_deleted());
        });


        bot.command('motivate', async (ctx) => {
            const { chat_id, name } = get_user_info(ctx);
            const user = await user_exists(chat_id);

            if(!user) {
                ctx.reply(replys.only_after_start());
                console.warn(`${name}/${chat_id}: Failed to send Motivation.`);
                return;
            }

            await send_one(user);
        });

        bot.start();
        resolve();
    });
}

export async function suggest_commands(): Promise<void> {
    await bot.api.setMyCommands([
        { command: "motivate", description: "Motivate yourself." },
        { command: "start", description: "Subscribe to daily canteen updates." },
        { command: "stop", description: "Unsubscribe from daily canteen updates." },
    ]);
}

function get_user_info(ctx: Context): { chat_id: number, name: string } {
    return {
        chat_id: ctx.message.chat.id,
        name: sanitize(ctx.message.from.first_name)
    };
}