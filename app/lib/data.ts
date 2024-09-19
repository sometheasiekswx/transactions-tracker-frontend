import {sql} from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    LatestInvoice,
    LatestInvoiceRaw,
    Revenue,
} from './definitions';
import {formatCurrency} from './utils';

export async function fetchRevenue() {
    try {
        const startTime = performance.now();

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const data: Revenue[] = [
            {month: "Jan", revenue: 2343},
            {month: "Feb", revenue: 2879},
            {month: "Mar", revenue: 786},
            {month: "Apr", revenue: 376},
            {month: "May", revenue: 6323},
            {month: "Jun", revenue: 945},
            {month: "Jul", revenue: 2341},
            {month: "Aug", revenue: 4564},
            {month: "Sep", revenue: 2424},
            {month: "Oct", revenue: 3463},
            {month: "Nov", revenue: 4335},
            {month: "Dec", revenue: 433},
        ]

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`fetchCardData completed in ${duration.toFixed(2)} milliseconds`);

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices() {
    try {
        const startTime = performance.now();

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data: LatestInvoice[] = [
            {
                id: "1",
                name: "Nene Chicken",
                image_url: "https://picsum.photos/500/500",
                email: "sometheasiekswx@gmail.com",
                amount: "123123",
            },
            {
                id: "2",
                name: "KFC",
                image_url: "https://picsum.photos/500/500",
                email: "sometheasiekswx@gmail.com",
                amount: "2344",
            },
            {
                id: "3",
                name: "IKEA",
                image_url: "https://picsum.photos/500/500",
                email: "sometheasiekswx@gmail.com",
                amount: "534",
            },
            {
                id: "4",
                name: "PTV MYKI",
                image_url: "https://picsum.photos/500/500",
                email: "sometheasiekswx@gmail.com",
                amount: "654",
            },
            {
                id: "5",
                name: "Kmart",
                image_url: "https://picsum.photos/500/500",
                email: "sometheasiekswx@gmail.com",
                amount: "456",
            }
        ]

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
        const startTime = performance.now();

        await new Promise((resolve) => setTimeout(resolve, 250));

        const numberOfInvoices = '15';
        const numberOfCustomers = '8';
        const totalPaidInvoices = '$1106.36';
        const totalPendingInvoices = '$1339.11';

        const data = await Promise.all([
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,
            totalPendingInvoices,
        ])

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

    try {
        const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return invoices.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
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
