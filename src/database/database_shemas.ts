import {Schema, model} from 'mongoose';
import { IUser } from '../types/interfaces';

const UserShema = new Schema({
    chat_id: { 
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    joined: {
      type: Date,
      default: Date.now,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
  });
  
  export const User = model<IUser>('User', UserShema);