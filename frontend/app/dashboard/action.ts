'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getToken() {
  return (await cookies()).get('session_token')?.value ?? '';
}

// Now takes FormData so it can be used directly as a <form action>
export async function addExpense(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const rawAmount = String(formData.get('amount') ?? '').trim();
  const amount = Number(rawAmount);
  const date = String(formData.get('date') ?? '');
  const today = new Date().toISOString().split('T')[0];

  // Server-side validation (replaces the old toast checks)
  if (!title) throw new Error('Title cannot be empty');
  if (rawAmount === '' || !Number.isFinite(amount)) throw new Error('Amount must be a valid number');
  if (!date || date > today) throw new Error('Date is required and cannot be in the future');

  const res = await fetch(`${process.env.BACKEND_URL}/api/expense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: await getToken() },
    body: JSON.stringify({ title, amount, date }),
  });

  if (!res.ok) throw new Error('Failed to add expense');

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

export async function getExpenses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense`, {
    headers: { Authorization: await getToken() },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}
