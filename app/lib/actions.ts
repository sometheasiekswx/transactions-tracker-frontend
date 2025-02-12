'use server';

import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

import {z} from 'zod';
import {addTransaction, deleteTransaction, updateTransaction, updateTransactionsStatus} from "@/app/api/transactions";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {Status} from "@/app/lib/definitions";

const TransactionSchema = z.object({
    description: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['Pending', 'Paid', 'Unpaid']),
    date: z.preprocess((value) => (value === '' || value === null ? new Date().toJSON().slice(0, 10) : value), z.string().date()),
});

export async function createTransaction(formData: FormData) {
    const {description, amount, status, date} = TransactionSchema.parse({
        description: formData.get('description'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        date: formData.get('date')
    });

    const response = await addTransaction(description, amount, status, new Date(date));
    if (response && response.data) {
    } else {
        throw new Error('Failed to addTransaction');
    }
}

export async function removeTransaction(id: string) {
    const response = await deleteTransaction(id);
    if (response && response.data) {
        revalidatePath('/dashboard/transactions')
    } else {
        throw new Error('Failed to removeTransaction');
    }
}

export async function editTransactionsStatus(ids: string[], status: Status) {
    if (ids.length === 0) {
        // TODO: Popup modal saying that a transaction needs to be selected to be marked
        return
    }

    const response = await updateTransactionsStatus(ids, status);
    if (response && response.data) {
        revalidatePath('/dashboard/transactions')
    } else {
        throw new Error('Failed to editTransactionsStatus');
    }
}

export async function editTransaction(id: string, formData: FormData) {
    const {description, amount, status, date} = TransactionSchema.parse({
        description: formData.get('description'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        date: formData.get('date')
    });

    const response = await updateTransaction(id, {
        description: description, amount: amount, status: status, date: new Date(date)
    });
    if (response && response.data) {
        revalidatePath('/dashboard/transactions')
        redirect('/dashboard/transactions')
    } else {
        throw new Error('Failed to updateTransaction');
    }
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