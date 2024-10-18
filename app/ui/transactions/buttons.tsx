"use client"

import {CheckIcon, NoSymbolIcon, PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {editTransactionStatusAsPaid, removeTransaction} from "@/app/lib/actions";
import React from "react";

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

export function MarkAsPaid({selectedTransactionIds}: { selectedTransactionIds: string[] }) {
    const handleMarkStatusPaid = async (event: React.MouseEvent) => {
        // event.stopPropagation();

        try {
            // Update the status on the backend
            await editTransactionStatusAsPaid(selectedTransactionIds);
            // console.log(`Transaction ${id} status updated to ${newStatus}`);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (<button
        className="flex h-10 items-center rounded-full bg-green-500 px-4 text-sm font-medium text-white
        transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-green-500"
        onClick={handleMarkStatusPaid}
    >
        <span className="">Mark as Paid</span>
        <CheckIcon className="h-5 ml-2"/>
    </button>);
}

export function MarkAsUnpaid() {
    return (<button
        // href="/dashboard/transactions/create"
        className="flex h-10 items-center rounded-full bg-gray-100 px-4 text-sm font-medium text-gray-500
        transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:bg-gray-100"
    >
        <span className="">Mark as Paid</span>
        <NoSymbolIcon className="h-5 ml-2"/>
    </button>);
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
