// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Revenue = {
    month: string; revenue: number;
};

export type Customers = {
    id: string; name: string; image_url: string; email: string; amount: string;
};

export type Status = 'Paid' | 'Unpaid' | 'Pending';

export type Transaction = {
    _id: string; // Will be created on the database
    userId: string; date: Date; description: string; amount: number; createdAt?: Date; // Optional because Mongoose handles this automatically
    updatedAt?: Date; // Optional because Mongoose handles this automatically
    status: Status;
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<Customers, 'amount'> & {
    amount: number;
};
export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
};

export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
};
