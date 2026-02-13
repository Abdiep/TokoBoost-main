import { redirect } from 'next/navigation';

export default function RegisterPage() {
    // Siapa pun yang buka /register, langsung tendang ke /login
    redirect('/login');
}