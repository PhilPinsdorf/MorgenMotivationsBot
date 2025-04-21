import { IUser } from '../types/interfaces';
import { User } from './database_shemas';

export async function user_exists(chat_id: number): Promise<IUser> {
    try {
        const user = await User.findOne({ chat_id: chat_id });
        return user; 
    } catch (err) {
        console.error(`[Database] Error in user_exists:\n${err}`);
    }
}

export async function all_users(): Promise<IUser[]> {
    try {
        const users = await User.find({ });
        return users; 
    } catch (err) {
        console.error(`[Database] Error in all_users:\n${err}`);
    }
}

export async function add_user(chat_id: number, name: string): Promise<IUser> {
    try {
        const possible_user = await user_exists(chat_id);

        if(!possible_user) {
            const user = await new User({ chat_id: chat_id, name: name} ).save();
            console.log(`${name}/${chat_id}: User Registered.`);
            return user;
        }

        console.warn(`${name}/${chat_id}: Tried to register again.`);
    } catch (err) {
        console.error(`[Database] Error in add_user:\n${err}`);
    }
}

export async function remove_user(chat_id: number, name: string, blocked: boolean): Promise<IUser> {
    try {
        const user = await User.findOneAndDelete({ chat_id: chat_id });
        if (user) {
            console.log(`${name}/${chat_id}: Deleted Account.${blocked ? " (Blocked)" : ""}`);
            return user;
        }

        console.warn(`${name}/${chat_id}: Failed to delete Account.`);
    } catch (err) {
        console.log(`[Database] Error in remove_user:\n${err}`);
    }
}