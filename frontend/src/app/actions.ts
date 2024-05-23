'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

export async function removeChat({ id, path }: { id: string; path: string; }) {
  // const session = await auth();

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   };
  // }

  //Convert uid to string for consistent comparison with session.user.id


  revalidatePath('/');
  return revalidatePath(path);
}

export async function clearChats() {

}

export async function getSharedChat(id: string) {

}

export async function shareChat(id: string) {

}

export async function saveChat(chat: Chat) {

}

export async function refreshHistory(path: string) {
  redirect(path);
}

export async function getMissingKeys() {
  const keysRequired = ['GOOGLE_GENERATIVE_AI_API_KEY'];
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '');
}
