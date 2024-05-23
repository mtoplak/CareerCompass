'use server';
import { type Chat } from '@/lib/types';

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {

  } catch (error) {
    return [];
  }
}

export async function getChat(id: string, userId: string) {

}

export async function saveChat(chat: Chat) {

}

export async function getMissingKeys() {
  const keysRequired = ['GOOGLE_GENERATIVE_AI_API_KEY'];
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '');
}
