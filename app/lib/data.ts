import {LatestInvoice, Revenue,} from './definitions';
import {formatCurrency} from './utils';
import {customers, invoices, revenue} from "@/app/lib/placeholder-data";

export async function fetchRevenue() {
    try {
        const startTime = performance.now();

        const data: Revenue[] = revenue;

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchRevenue completed in ${duration.toFixed(2)} ms`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}


export async function fetchCustomers() {
    try {
        const startTime = performance.now();

        const data: LatestInvoice[] = [];
        for (const invoice of invoices.splice(0, 5)) {
            const customer = customers.find((cust) => cust.id === invoice.customer_id);
            data.push({
                id: customer!.id,
                name: customer!.name,
                image_url: customer!.image_url,
                email: customer!.email,
                amount: formatCurrency(invoice.amount),
            })
        }


        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchLatestInvoices completed in ${duration.toFixed(2)} ms`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}
