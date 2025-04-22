import { Bot } from "grammy";
import { connect } from 'mongoose';
import * as schedule from 'node-schedule'; 
import { start_bot, suggest_commands } from './telegram_bot';
import { send_all } from "./messages/send_messages";
import dotenv from 'dotenv';

dotenv.config();
export const bot = new Bot(process.env.BOT_SECRET as string);
const dbUri = process.env.DB_URI as string;
run();

async function run() {
    await connect(dbUri);
    console.log('Connected to Database');
    
    await suggest_commands();
    await start_bot();
    console.log('Telegram Bot started.')

    schedule.scheduleJob('0 5 * * 1-5', () => { send_all() });
}

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());