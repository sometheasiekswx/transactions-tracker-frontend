import axiosTransactionsTracker from "@/app/lib/axios/axiosTransactionsTracker";

export async function fetchAllTransactions(queryParams: string) {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.get(`/transactions/all${queryParams}`)

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchAllTransactions completed in ${duration.toFixed(2)} ms`);

        return response.data;
    } catch (error) {
        console.error('Failed to fetchAllTransactions:', error);
        return [];
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
        console.error('Failed to fetchTransaction:', error);
        return [];
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
        console.error('Failed to addTransaction:', error);
        return {message: 'Failed to addTransaction:' + error}
    }
}


export async function updateTransaction(id: string, formData: FormData) {
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
        console.error('Failed to updateTransaction:', error);
        return {message: 'Failed to updateTransaction:' + error}
    }
}

export async function updateTransactionsAsPaid(ids: string[]) {
    try {
        const startTime = performance.now();

        const transactions = ids.map((id) => ({
            _id: id, status: "Paid"
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
        console.error('Failed to updateTransaction:', error);
        return {message: 'Failed to updateTransaction:' + error}
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
        console.error('Failed to deleteTransaction:', error);
        return {message: 'Failed to deleteTransaction:' + error}
    }
}