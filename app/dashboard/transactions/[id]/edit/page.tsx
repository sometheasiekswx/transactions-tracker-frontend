import EditForm from '@/app/ui/transactions/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchTransaction} from "@/app/api/transactions";
import {notFound} from 'next/navigation';

export default async function Page({params}: { params: { id: string } }) {
    const id = params.id;
    const {transaction} = await fetchTransaction(id);
    if (!transaction) {
        notFound();
    }
    return (<main>
        <Breadcrumbs
            breadcrumbs={[{label: 'Transactions', href: '/dashboard/transactions'}, {
                label: 'Edit Transaction', href: `/dashboard/transactions/${id}/edit`, active: true,
            },]}
        />
        <EditForm transaction={transaction}/>
    </main>);
}