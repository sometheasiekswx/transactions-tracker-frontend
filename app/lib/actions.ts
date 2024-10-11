'use server';

import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

import {z} from 'zod';

const FormSchema = z.object({
    description: z.string(), amount: z.coerce.number(), status: z.enum(['Pending', 'Paid', 'Unpaid']),
    date: z.preprocess(
        (value) => (value === '' || value === null ? new Date().toJSON().slice(0, 10) : value),
        z.string().date()
    ),
});

const CreateInvoice = FormSchema;

export async function createTransaction(formData: FormData) {
    const {description, amount, status, date} = CreateInvoice.parse({
        description: formData.get('description'), amount: formData.get('amount'), status: formData.get('status'),
        date: formData.get('date')
    });

    console.log(description, amount, status, date);
}

export async function authenticate(prevState: string | undefined, formData: FormData,) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}