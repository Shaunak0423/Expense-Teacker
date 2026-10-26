'use server';

import {redirect} from 'next/navigation';
import { cookies } from 'next/headers';

export async function LoginAction(formData: FormData){
        
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Handle login failure (e.g., redirect to an error page or use actionState)
    redirect('/');
  }

  const data = await response.json();

  // 2. Set the data values (like tokens) without useState using HTTP-Only cookies
  const cookieStore = await cookies();
  cookieStore.set('session_token', data.token, {
    httpOnly: true, // Secure against XSS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  // 3. Redirect the user without using client-side useRouter
  // Note: Next.js expects redirect() to be called outside try/catch blocks
  redirect('/dashboard'); 

}