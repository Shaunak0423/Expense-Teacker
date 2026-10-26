// app/dashboard/actions.ts
'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getToken() {
  return (await cookies()).get('session_token')?.value ?? '';
}

export async function addExpense(title: string, amount: number, date: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: await getToken() },
    body: JSON.stringify({ title, amount, date}),
  });
  revalidatePath('/dashboard');
}

export async function deleteExpense(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense/${id}`, {
    method: 'DELETE',
    headers: { Authorization: await getToken() },
  });
  revalidatePath('/dashboard');
}

export async function updateExpense(id: string, title: string, amount: number, date: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense/${id}`, {
    method: 'PUT', // or PATCH, whichever your backend uses
    headers: { 'Content-Type': 'application/json', Authorization: await getToken() },
    body: JSON.stringify({ title, amount, date }),
  });
  revalidatePath('/dashboard');
}