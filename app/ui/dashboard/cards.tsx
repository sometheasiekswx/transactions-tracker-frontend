import {BanknotesIcon, ClockIcon, InboxIcon, UserGroupIcon,} from '@heroicons/react/24/outline';
import {lusitana} from '@/app/ui/fonts';
import {fetchAllTransactionsStatusCount} from "@/app/api/transactions";

const iconMap = {
    collected: BanknotesIcon, customers: UserGroupIcon, pending: ClockIcon, invoices: InboxIcon,
};

export default async function CardWrapper() {
    const {
        totalTransactions,
        totalPaidTransactions,
        totalPendingTransactions,
        totalUnpaidTransactions
    } = await fetchAllTransactionsStatusCount();
    return (<>
        <Card title="Total Transactions" value={totalTransactions} type="invoices"/>
        <Card title="Paid" value={totalPaidTransactions} type="collected"/>
        <Card title="Pending" value={totalPendingTransactions} type="pending"/>
        <Card title="Unpaid" value={totalUnpaidTransactions} type="customers"/>
    </>);
}

export function Card({title, value, type,}: {
    title: string; value: number | string; type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
            {Icon ? <Icon className="h-5 w-5 text-gray-700"/> : null}
            <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
            className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
            {value}
        </p>
    </div>);
}
