"use client"

import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {editTransactionsStatus, removeTransaction} from "@/app/lib/actions";
import React from "react";
import {Status} from "@/app/lib/definitions";
import {TransactionsStatus} from "@/app/ui/transactions/status";

export function CreateTransaction() {
    return (<Link
        href="/dashboard/transactions/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white
        transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
        <span className="">Create Transaction</span>
        <PlusIcon className="h-5 ml-2"/>
    </Link>);
}

export function MarkStatus({status, selectedTransactionIds}: { status: Status, selectedTransactionIds: string[] }) {
    const handleMarkStatus = async (event: React.MouseEvent) => {
        try {
            await editTransactionsStatus(selectedTransactionIds, status);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (<TransactionsStatus onClick={handleMarkStatus} status={status}/>);
}

export function UpdateTransaction({id, onClick}: { id: string, onClick?: (event: React.MouseEvent) => void; }) {
    return (<Link
        href={`/dashboard/transactions/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
        onClick={onClick}
    >
        <PencilIcon className="w-5"/>
    </Link>);
}

export function RemoveTransaction({id, onClick}: { id: string, onClick?: (event: React.MouseEvent) => void; }) {
    const removeTransactionWithId = removeTransaction.bind(null, id)
    return (<form action={removeTransactionWithId} onClick={onClick}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5"/>
        </button>
    </form>);
}
