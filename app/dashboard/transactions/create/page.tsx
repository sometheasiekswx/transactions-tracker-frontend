import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Transactions', href: '/dashboard/transactions' },
                    {
                        label: 'Create Transaction',
                        href: '/dashboard/transactions/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}