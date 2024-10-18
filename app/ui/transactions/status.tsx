"use client"; // Ensure this is a client-side component in Next.js

import React, {useEffect, useState} from 'react';
import {CheckIcon, ClockIcon, NoSymbolIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {editTransactionStatus} from "@/app/lib/actions"; // Import your backend function

const statusOptions = ['Pending', 'Paid'];

export default function TransactionStatus({status, id}: { status: string, id: string }) {
    const [currentStatus, setCurrentStatus] = useState(status); // Initialize with the current status from props
    const [loading, setLoading] = useState(false); // Add a loading state for feedback
    const [error, setError] = useState<string | null>(null); // Error handling

    // Function to handle status change on button click
    const handleStatusChange = async (event: React.MouseEvent) => {
        event.stopPropagation();

        const currentIndex = statusOptions.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusOptions.length; // Cycle to next status
        const newStatus = statusOptions[nextIndex];

        setCurrentStatus(newStatus); // Optimistically update the frontend
        setLoading(true);
        setError(null);

        try {
            // Update the status on the backend
            await editTransactionStatus(id, newStatus);
            // console.log(`Transaction ${id} status updated to ${newStatus}`);
        } catch (error) {
            // console.error('Failed to update status:', error);
            setError('Failed to update status. Please try again.' + error); // Show error if update fails
            setCurrentStatus(status); // Revert to previous status if the update fails
        } finally {
            setLoading(false); // End the loading state
        }
    };

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    return (<div>
        <button
            onClick={handleStatusChange}
            disabled={loading} // Disable the button while loading
            className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs transition-colors duration-200', {
                'bg-gray-100 text-gray-500': currentStatus === 'Unpaid',
                'bg-yellow-300 text-black': currentStatus === 'Pending',
                'bg-green-500 text-white': currentStatus === 'Paid',
            })}
        >
            {currentStatus === 'Pending' && (<>
                Pending
                <ClockIcon className="ml-1 w-4 text-black"/>
            </>)}
            {currentStatus === 'Unpaid' && (<>
                Unpaid
                <NoSymbolIcon className="ml-1 w-4 text-gray-500"/>
            </>)}
            {currentStatus === 'Paid' && (<>
                Paid
                <CheckIcon className="ml-1 w-4 text-white"/>
            </>)}
        </button>

        {/* Display loading spinner or message */}
        {/*{loading && <p className="text-gray-500 text-xs mt-1">Updating status...</p>}*/}

        {/* Display error message if something goes wrong */}
        {error && <p className="text-red-500 text-xs mt-1">ss{error}</p>}
    </div>);
}

