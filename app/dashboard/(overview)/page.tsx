import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestCustomers from '@/app/ui/dashboard/latest-customers';
import {lusitana} from '@/app/ui/fonts';
import {
    CardsSkeleton, LatestInvoicesSkeleton, LatestTransactionsSkeleton, RevenueChartSkeleton
} from "@/app/ui/skeletons";
import {Suspense} from "react";
import LatestTransactions from "@/app/ui/dashboard/latest-transactions";

export default async function Page() {
    return (<main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
        </h1>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<CardsSkeleton/>}>
                <CardWrapper/>
            </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6">
            <Suspense fallback={<LatestTransactionsSkeleton/>}>
                <LatestTransactions/>
            </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <Suspense fallback={<RevenueChartSkeleton/>}>
                <RevenueChart/>
            </Suspense>
            <Suspense fallback={<LatestInvoicesSkeleton/>}>
                <LatestCustomers/>
            </Suspense>
        </div>
    </main>);
}