import {DeleteInvoice, UpdateInvoice} from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/transactions/status';
import {formatDateToString, formatDateToStringShort, formatTransactionCurrency} from '@/app/lib/utils';
import {Transaction} from "@/app/lib/definitions";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export default async function InvoicesTable({transactions,}: { transactions: Transaction[]; }) {
    return (<div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                    {transactions?.map((transaction) => (<div
                        key={transaction._id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <div className="mb-2 flex items-center">
                                    <p>{transaction.description}</p>
                                </div>
                            </div>
                            <InvoiceStatus status={transaction.status}/>
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                            <div>
                                <p className="text-xl font-medium">
                                    {formatTransactionCurrency(transaction.amount)}
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                    <p>{formatDateToString(transaction.date)}</p>
                                    <ArrowPathIcon className="h-3 w-3 text-gray-500"/>
                                    <p className='text-xs text-gray-500'>
                                        Updated {formatDateToStringShort(transaction.date)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <UpdateInvoice id={transaction._id}/>
                                <DeleteInvoice id={transaction._id}/>
                            </div>
                        </div>
                    </div>))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                    <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Description
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                            Amount
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                            Date
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                            Status
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {transactions?.map((transaction) => (<tr
                        key={transaction._id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                <p>{transaction.description}</p>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {formatTransactionCurrency(transaction.amount)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {formatDateToString(transaction.date)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <InvoiceStatus status={transaction.status}/>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                                <UpdateInvoice id={transaction._id}/>
                                <DeleteInvoice id={transaction._id}/>
                            </div>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}
