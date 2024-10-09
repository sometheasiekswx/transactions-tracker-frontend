import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/transactions/table';
import {CreateInvoice} from '@/app/ui/invoices/buttons';
import {lusitana} from '@/app/ui/fonts';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {Suspense} from 'react';
import {fetchAllTransactions} from "@/app/api/transactions";

export default async function Page({searchParams,}: {
    searchParams?: { query?: string; page?: string; limit?: string; };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    const {
        totalTransactions, totalPages, transactions
    } = await fetchAllTransactions(`?page=${currentPage}&limit=${limit}&query=${query}`);

    return (<div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Transactions</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search transactions..."/>
            <CreateInvoice/>
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
            <Table transactions={transactions}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages}/>
        </div>
    </div>);
}