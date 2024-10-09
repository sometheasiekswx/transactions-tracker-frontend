import {ArrowPathIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {lusitana} from '@/app/ui/fonts';
import {Transaction} from '@/app/lib/definitions';
import {fetchLatestTransactions} from '@/app/lib/data';
import {formatDateToString, formatTransactionCurrency} from '@/app/lib/utils';

export default async function LatestTransactions() {
    const latestTransactions: Transaction[] = await fetchLatestTransactions();

    return (<div className="flex w-full flex-col md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
            {latestTransactions?.length ? (<TransactionList transactions={latestTransactions}/>) : (<NoTransactions/>)}
        </div>
    </div>);
}

function TransactionList({transactions}: { transactions: Transaction[] }) {
    return (<div className="bg-white px-6">
        {transactions.map((transaction, i) => (<div
            key={transaction._id}
            className={clsx('grid grid-cols-5 flex flex-row items-center justify-between py-4', {'border-t': i !== 0})}
        >
            <div className="col-span-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <p className="truncate hover:text-clip text-sm font-semibold md:text-base">
                        {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                        {formatDateToString(transaction.date)}
                    </p>
                </div>
            </div>
            <p className={`${lusitana.className} text-right text-sm font-medium md:text-base ml-4`}>
                {formatTransactionCurrency(transaction.amount)}
            </p>
        </div>))}
        <UpdatedMessage/>
    </div>);
}

function NoTransactions() {
    return (<div className="flex items-center pb-2 pt-6">
        <ArrowPathIcon className="h-5 w-5 text-gray-500"/>
        <h3 className="ml-2 text-sm text-gray-500">No invoices available</h3>
    </div>);
}

function UpdatedMessage() {
    return (<div className="flex items-center pb-2 pt-6">
        <ArrowPathIcon className="h-5 w-5 text-gray-500"/>
        <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
    </div>);
}
