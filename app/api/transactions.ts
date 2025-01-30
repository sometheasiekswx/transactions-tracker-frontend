import axiosTransactionsTracker from "@/app/lib/axios/axiosTransactionsTracker";
import {Status} from "@/app/lib/definitions";

export async function fetchAllTransactions(queryParams: string) {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.get(`/transactions/all${queryParams}`)

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchAllTransactions completed in ${duration.toFixed(2)} ms`);

        return response.data;
    } catch (error) {
        const message = 'Failed to fetchAllTransactions\n' + error;
        console.error(message);
        throw new Error(message);
    }
}

export async function fetchTransaction(id: string) {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.get(`/transaction/${id}`)

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchTransaction completed in ${duration.toFixed(2)} ms`);

        return response.data;
    } catch (error) {
        const message = 'Failed to fetchTransaction\n' + error;
        console.error(message);
        throw new Error(message);
    }
}

export async function addTransaction(description: string, amount: number, status: string, date: Date) {
    try {
        const startTime = performance.now();

        let data = JSON.stringify({
            "date": date, "description": description, "amount": amount, "status": status,
        });

        const response = await axiosTransactionsTracker.post(`/transaction`, data, {
            headers: {'Content-Type': 'application/json'}
        })

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`addTransaction completed in ${duration.toFixed(2)} ms`);

        return response;
    } catch (error) {
        const message = 'Failed to addTransaction\n' + error;
        console.error(message);
        throw new Error(message);
    }
}


export async function updateTransaction(id: string, formData: {
    description?: string, amount?: number, status?: string, date?: Date,
}) {
    try {
        const startTime = performance.now();

        let data = JSON.stringify(formData);

        const response = await axiosTransactionsTracker.put(`/transaction/${id}`, data, {
            headers: {'Content-Type': 'application/json'}
        })

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`updateTransaction completed in ${duration.toFixed(2)} ms`);

        return response;
    } catch (error) {
        const message = 'Failed to updateTransaction\n' + error;
        console.error(message);
        throw new Error(message);
    }
}

export async function updateTransactionsStatus(ids: string[], status: Status) {
    try {
        const startTime = performance.now();

        const transactions = ids.map((id) => ({
            _id: id, status: status
        }));

        let data = JSON.stringify(transactions);

        const response = await axiosTransactionsTracker.put(`/transactions`, data, {
            headers: {'Content-Type': 'application/json'}
        })

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`updateTransactionsAsPaid completed in ${duration.toFixed(2)} ms`);

        return response;
    } catch (error) {
        const message = 'Failed to updateTransactionsAsPaid\n' + error;
        console.error(message);
        throw new Error(message);
    }
}

export async function deleteTransaction(id: string) {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.delete(`/transaction/${id}`)

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`deleteTransaction completed in ${duration.toFixed(2)} ms`);

        return response;
    } catch (error) {
        const message = 'Failed to deleteTransaction\n' + error;
        console.error(message);
        throw new Error(message);
    }
}