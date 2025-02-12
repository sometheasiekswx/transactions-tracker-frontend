"use client"; // Ensure this is a client-side component in Next.js

import React from 'react';
import {CheckIcon, ClockIcon, NoSymbolIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {Status} from "@/app/lib/definitions"; // Import your backend function

export function TransactionStatus({status}: { status: Status }) {
    return (<div>
        <button
            className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs transition-colors duration-200', {
                'bg-gray-100 text-gray-500': status === 'Unpaid',
                'bg-yellow-300 text-black': status === 'Pending',
                'bg-green-500 text-white': status === 'Paid',
            })}
        >
            {status === 'Pending' && (<>
                Pending
                <ClockIcon className="ml-1 w-4 text-gray-700"/>
            </>)}
            {status === 'Unpaid' && (<>
                Unpaid
                <NoSymbolIcon className="ml-1 w-4 text-gray-500"/>
            </>)}
            {status === 'Paid' && (<>
                Paid
                <CheckIcon className="ml-1 w-4 text-white"/>
            </>)}
        </button>
    </div>);
}

export function TransactionsStatus({status, onClick}: {
    status: Status, onClick: (event: React.MouseEvent) => Promise<void>
}) {
    return (<div>
        <button
            className={clsx('flex h-8 md:h-10 items-center rounded-full px-2 md:px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ', {
                'bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:bg-gray-100': status === 'Unpaid',
                'bg-yellow-300 text-gray-700 hover:bg-yellow-400 focus-visible:outline-yellow-300': status === 'Pending',
                'bg-green-500 text-white hover:bg-green-600 focus-visible:outline-green-500': status === 'Paid',
            })}
            onClick={onClick}
        >
            {status === 'Pending' && (<div className={'inline-flex whitespace-nowrap'}>
                <span className="">Mark Pending</span>
                <ClockIcon className="ml-1 w-4 text-black"/>
            </div>)}
            {status === 'Unpaid' && (<div className={'inline-flex whitespace-nowrap'}>
                <span className="">Mark Unpaid</span>
                <NoSymbolIcon className="ml-1 w-4 text-gray-500"/>
            </div>)}
            {status === 'Paid' && (<div className={'inline-flex whitespace-nowrap'}>
                <span className="">Mark Paid</span>
                <CheckIcon className="ml-1 w-4 text-white"/>
            </div>)}
        </button>
    </div>);
}

