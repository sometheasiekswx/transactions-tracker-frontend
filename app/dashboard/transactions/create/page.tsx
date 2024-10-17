import CreateForm from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

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
            <CreateForm />
        </main>
    );
}