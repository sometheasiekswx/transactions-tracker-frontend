import {CheckIcon, ClockIcon, NoSymbolIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({status}: { status: string }) {
    return (<span
        className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs', {
            'bg-gray-100 text-gray-500': status === 'Unpaid',
            'bg-yellow-300 text-black': status === 'Pending',
            'bg-green-500 text-white': status === 'Paid',
        },)}
    >
      {status === 'Pending' ? (<>
          Pending
          <ClockIcon className="ml-1 w-4 text-black"/>
      </>) : null}
        {status === 'Unpaid' ? (<>
            Unpaid
            <NoSymbolIcon className="ml-1 w-4 text-gray-500"/>
        </>) : null}
        {status === 'Paid' ? (<>
            Paid
            <CheckIcon className="m l-1 w-4 text-white"/>
        </>) : null}
    </span>);
}
