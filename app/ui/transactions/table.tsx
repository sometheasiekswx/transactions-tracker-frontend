"use client"

import React, {useState} from 'react';
import {TransactionStatus} from '@/app/ui/transactions/status';
import {formatDateToString, formatTransactionCurrency} from '@/app/lib/utils';
import {Transaction} from "@/app/lib/definitions";
import {MarkStatus, RemoveTransaction, UpdateTransaction} from "@/app/ui/transactions/buttons";

export default function TransactionsTable({transactions}: { transactions: Transaction[] }) {
    const [selectedTransactionIds, setSelectedTransactionIds] = useState<string[]>([]);

    const handleCheckboxChange = (transactionId: string) => {
        setSelectedTransactionIds((prevSelectedIds) => prevSelectedIds.includes(transactionId) ? prevSelectedIds.filter((id) => id !== transactionId) : [...prevSelectedIds, transactionId]);
    };

    const handleRowClick = (transactionId: string) => {
        handleCheckboxChange(transactionId);
    };

    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const calculateTotal = (selectedTransactionIds: string[]) => {
        const selectedTransactions = transactions.filter((transaction) => selectedTransactionIds.includes(transaction._id));
        const total = selectedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        return formatTransactionCurrency(total);
    };

    return (<>
        <div className={`mt-4 flex justify-between items-center gap-2`}>
            <div
                className={`flex h-10 items-center px-4 text-sm font-medium rounded-full transition-colors 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
            >
                <span className="">Total: {calculateTotal(selectedTransactionIds)}</span>
            </div>
            <div className="flex justify-end items-center gap-2" onClick={() => {
                setSelectedTransactionIds([])
            }}>
                <MarkStatus status={"Paid"} selectedTransactionIds={selectedTransactionIds}/>
                <MarkStatus status={"Pending"} selectedTransactionIds={selectedTransactionIds}/>
                <MarkStatus status={"Unpaid"} selectedTransactionIds={selectedTransactionIds}/>
            </div>
        </div>
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 lg:pt-0">
                    <div className="lg:hidden">
                        {transactions?.map((transaction) => (<div
                            key={transaction._id}
                            className={`
                            flex w-full mb-2 rounded-md p-4 cursor-pointer relative overflow-hidden 
                            ${selectedTransactionIds.includes(transaction._id) ? 'bg-blue-200' : 'bg-white'}
                        `}
                            onClick={() => handleRowClick(transaction._id)}
                        >
                            <div className="flex items-center justify-between">
                                <input
                                    type="checkbox"
                                    checked={selectedTransactionIds.includes(transaction._id)}
                                    onChange={() => handleCheckboxChange(transaction._id)}
                                    className={`
                                    mr-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 hidden
                                `}
                                    onClick={stopPropagation}
                                />
                            </div>

                            <div className={`w-full`}>
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="mb-2 flex items-center">
                                        <p className="text-md font-bold">{transaction.description}</p>
                                    </div>
                                    <TransactionStatus status={transaction.status}/>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-md font-medium">
                                            {formatTransactionCurrency(transaction.amount)}
                                        </p>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={`text-sm`}>{formatDateToString(transaction.date)}</p>
                                            {/*<ArrowPathIcon className="h-3 w-3 text-gray-500"/>*/}
                                            {/*<p className="text-xs text-gray-500 mr-4">*/}
                                            {/*    {formatDateToStringShort(transaction.date)}*/}
                                            {/*</p>*/}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateTransaction id={transaction._id} onClick={stopPropagation}/>
                                        <RemoveTransaction id={transaction._id} onClick={stopPropagation}/>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </div>

                    <table className="hidden min-w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTransactionIds(transactions.map((t) => t._id));
                                        } else {
                                            setSelectedTransactionIds([]);
                                        }
                                    }}
                                    checked={selectedTransactionIds.length === transactions.length}
                                    className="rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </th>
                            <th scope="col" className="px-4 py-5 font-medium">Description</th>
                            <th scope="col" className="px-3 py-5 font-medium">Amount</th>
                            <th scope="col" className="px-3 py-5 font-medium">Date</th>
                            <th scope="col" className="px-3 py-5 font-medium">Status</th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {transactions?.map((transaction) => (<tr
                            key={transaction._id}
                            className={`
                            w-full border-b py-3 text-sm last-of-type:border-none cursor-pointer relative overflow-hidden
                            ${selectedTransactionIds.includes(transaction._id) ? 'bg-blue-50' : ''}
                         `}
                            onClick={() => handleRowClick(transaction._id)}
                        >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <input
                                    type="checkbox"
                                    checked={selectedTransactionIds.includes(transaction._id)}
                                    onChange={() => handleCheckboxChange(transaction._id)}
                                    className="mr-2 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onClick={stopPropagation}
                                />
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">{transaction.description}</td>
                            <td className="whitespace-nowrap px-3 py-3">{formatTransactionCurrency(transaction.amount)}</td>
                            <td className="whitespace-nowrap px-3 py-3">{formatDateToString(transaction.date)}</td>
                            <td className="whitespace-nowrap px-3 py-3">
                                <TransactionStatus status={transaction.status}/>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                    <UpdateTransaction id={transaction._id} onClick={stopPropagation}/>
                                    <RemoveTransaction id={transaction._id} onClick={stopPropagation}/>
                                </div>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}
