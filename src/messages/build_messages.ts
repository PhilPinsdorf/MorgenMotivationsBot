import { emojis, greetings, motivations } from "../types/definitions";

// Escape all special characters
export function escape_message(message: string): string {
    // return message.replace(/[.\-_+!?^${}()|[\]\\]/g, '\\$&');
    return message.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

export function random_greeting(): string {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

export function random_motivation(): string {
    const randomIndex = Math.floor(Math.random() * motivations.length);
    return motivations[randomIndex];
}

export function random_emoji(): string {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}