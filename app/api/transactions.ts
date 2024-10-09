import axiosTransactionsTracker from "@/app/lib/axios/axiosTransactionsTracker";

export async function fetchAllTransactions(queryParams: string) {
    try {
        const startTime = performance.now();

        const response = await axiosTransactionsTracker.get(`/transactions/all${queryParams}`)

        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`fetchLatestTransactions completed in ${duration.toFixed(2)} milliseconds`);

        return response.data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest transactions.');
    }
}