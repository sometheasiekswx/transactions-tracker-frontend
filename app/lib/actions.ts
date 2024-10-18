'use server';

import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

import {z} from 'zod';
import {addTransaction, deleteTransaction, updateTransaction, updateTransactionsAsPaid} from "@/app/api/transactions";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

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
        // console.log('addTransaction', response.data);
        // revalidatePath('/dashboard/transactions')
        // redirect('/dashboard/transactions')
    }
    // else if (response && response.message) {
    //     throw new Error(response.message);
    // }
    else {
        throw new Error('Failed to addTransaction');
    }
}

export async function removeTransaction(id: string) {
    const response = await deleteTransaction(id);
    if (response && response.data) {
        // console.log('removeTransaction', response.data);
        revalidatePath('/dashboard/transactions')
        // redirect('/dashboard/transactions')
    }
    // else if (response && response.message) {
    //     throw new Error(response.message);
    // }
    else {
        throw new Error('Failed to removeTransaction');
    }
}

export async function editTransactionStatus(id: string, status: string) {
    const response = await updateTransaction(id, {status: status});
    if (response && response.data) {
        // console.log('editTransactionStatus', response.data);
        revalidatePath('/dashboard/transactions')
        // redirect('/dashboard/transactions')
    }
    // else if (response && response.message) {
    //     throw new Error(response.message);
    // }
    else {
        throw new Error('Failed to editTransactionStatus');
    }
}

export async function editTransactionStatusAsPaid(ids: string[]) {
    const response = await updateTransactionsAsPaid(ids);
    if (response && response.data) {
        console.log('editTransactionStatusAsPaid', response.data);
        revalidatePath('/dashboard/transactions')
        // redirect('/dashboard/transactions')
    }
    // else if (response && response.message) {
    //     throw new Error(response.message);
    // }
    else {
        throw new Error('Failed to editTransactionStatusAsPaid');
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
        // console.log(response);
        // console.log('updateTransaction', response.data);
        revalidatePath('/dashboard/transactions')
        redirect('/dashboard/transactions')
    }
    // else if (response && response.message) {
    //     throw new Error(response.message);
    // }
    else {
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