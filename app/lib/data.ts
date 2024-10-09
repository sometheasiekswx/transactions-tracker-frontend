import {sql} from '@vercel/postgres';
import {CustomerField, CustomersTableType, InvoiceForm, LatestInvoice, Revenue,} from './definitions';
import {formatCurrency} from './utils';
import {customers, invoices, revenue} from "@/app/lib/placeholder-data";
import axiosTransactionsTracker from "@/app/lib/axiosTransactionsTracker";

export async function fetchRevenue() {
    try {
        const startTime = performance.now();

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // const data = await sql<Revenue>`SELECT * FROM revenue`;
        const data: Revenue[] = revenue;

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchRevenue completed in ${duration.toFixed(2)} milliseconds`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestTransactions() {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.get('/transactions/all?page=1&limit=5')

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchLatestTransactions completed in ${duration.toFixed(2)} milliseconds`);


        return response.data.transactions;
    } catch (error) {
        if (error.status == 404) return [];

        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest transactions.');
    }
}

export async function fetchLatestInvoices() {
    try {
        //   const data = await sql<LatestInvoiceRaw>`
        // SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        // FROM invoices
        // JOIN customers ON invoices.customer_id = customers.id
        // ORDER BY invoices.date DESC
        // LIMIT 5`;
        //
        //   const latestInvoices = data.rows.map((invoice) => ({
        //       ...invoice,
        //       amount: formatCurrency(invoice.amount),
        //   }));

        const startTime = performance.now();

        // await new Promise((resolve) => setTimeout(resolve, 3000));

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
        console.log(`fetchLatestInvoices completed in ${duration.toFixed(2)} milliseconds`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchCardData() {
    try {
        // // You can probably combine these into a single SQL query
        // // However, we are intentionally splitting them to demonstrate
        // // how to initialize multiple queries in parallel with JS.
        // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        // const invoiceStatusPromise = sql`SELECT
        //  SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        //  SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        //  FROM invoices`;
        //
        // const data = await Promise.all([
        //     invoiceCountPromise,
        //     customerCountPromise,
        //     invoiceStatusPromise,
        // ]);
        //
        // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
        // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
        // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
        //
        // return {
        //     numberOfCustomers,
        //     numberOfInvoices,
        //     totalPaidInvoices,
        //     totalPendingInvoices,
        // };

        const startTime = performance.now();

        // await new Promise((resolve) => setTimeout(resolve, 250));

        const numberOfInvoices = invoices.length;
        const numberOfCustomers = customers.length;
        const totalPaidInvoices = invoices.filter(invoice => invoice.status == "paid").length;
        const totalPendingInvoices = invoices.filter(invoice => invoice.status == "pending").length;

        const data = await Promise.all([numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices,])

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`fetchCardData completed in ${duration.toFixed(2)} milliseconds`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(query: string, currentPage: number,) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // try {
    //     const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;
    //
    //     return invoices.rows;

    // Normalize query for case-insensitive matching
    const normalizedQuery = query.toLowerCase();
    console.log(normalizedQuery);

    try {
        // Filter the invoices based on the query
        const filteredInvoices = invoices
            .map(invoice => {
                // Find the associated customer for each invoice
                const customer = customers.find(cust => cust.id === invoice.customer_id);

                return {
                    ...invoice,
                    name: customer?.name || '',
                    email: customer?.email || '',
                    image_url: customer?.image_url || '',
                };
            })
            .filter(({amount, date, status, name, email}) => // Search for the query in the invoice data
                name.toLowerCase().includes(normalizedQuery) || email.toLowerCase().includes(normalizedQuery) || amount.toString().includes(normalizedQuery) || date.includes(normalizedQuery) || status.toLowerCase().includes(normalizedQuery))
            .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();

                return dateB - dateA; // Sort by descending date
            }); // Sort by date in descending order

        // Paginate the results
        const paginatedInvoices = filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);

        // console.log(paginatedInvoices);

        return paginatedInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        //       const count = await sql`SELECT COUNT(*)
        //   FROM invoices
        //   JOIN customers ON invoices.customer_id = customers.id
        //   WHERE
        //     customers.name ILIKE ${`%${query}%`} OR
        //     customers.email ILIKE ${`%${query}%`} OR
        //     invoices.amount::text ILIKE ${`%${query}%`} OR
        //     invoices.date::text ILIKE ${`%${query}%`} OR
        //     invoices.status ILIKE ${`%${query}%`}
        // `;
        //
        //       const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        const normalizedQuery = query.toLowerCase();
        const filteredInvoices = invoices
            .map(invoice => {
                // Find the customer associated with the invoice
                const customer = customers.find(cust => cust.id === invoice.customer_id);

                return {
                    ...invoice, customer_name: customer?.name || '', customer_email: customer?.email || '',
                };
            })
            .filter(({
                         amount, date, status, customer_name, customer_email
                     }) => customer_name.toLowerCase().includes(normalizedQuery) || customer_email.toLowerCase().includes(normalizedQuery) || amount.toString().includes(normalizedQuery) || date.includes(normalizedQuery) || status.toLowerCase().includes(normalizedQuery));

        // Calculate the total number of pages
        const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchInvoiceById(id: string) {
    try {
        const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

        const invoice = data.rows.map((invoice) => ({
            ...invoice, // Convert amount from cents to dollars
            amount: invoice.amount / 100,
        }));

        return invoice[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

        const customers = data.rows;
        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

        const customers = data.rows.map((customer) => ({
            ...customer,
            total_pending: formatCurrency(customer.total_pending),
            total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}

