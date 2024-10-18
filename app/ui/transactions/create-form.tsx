import Link from 'next/link';
import {
    CalendarIcon,
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    NoSymbolIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {createTransaction} from '@/app/lib/actions';


export default function CreateForm() {
    return (<form action={createTransaction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Date Picker */}
            <div className="mb-4">
                <label htmlFor="date" className="mb-2 block text-sm font-medium">
                    Select a date
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-2 placeholder-gray-500 transition duration-150 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                    />
                    <CalendarIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>
            </div>

            {/* transaction description */}
            <div className="mb-4">
                <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                    Enter a description
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            required={true}
                            placeholder="Enter a description"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <DocumentTextIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
            </div>

            {/* transaction Amount */}
            <div className="mb-4">
                <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                    Choose an amount
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            required={true}
                            placeholder="Enter AUD amount"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
            </div>

            {/* transaction Status */}
            <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                    Set status
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="pending"
                                name="status"
                                type="radio"
                                value="Pending"
                                checked
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="pending"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-300 text-black px-3 py-1.5 text-xs font-medium"
                            >
                                Pending <ClockIcon className="h-4 w-4"/>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="paid"
                                name="status"
                                type="radio"
                                value="Paid"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="paid"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Paid <CheckIcon className="h-4 w-4"/>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="unpaid"
                                name="status"
                                type="radio"
                                value="Unpaid"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="unpaid"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                                Unpaid <NoSymbolIcon className="h-4 w-4"/>
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
                href="/dashboard/transactions"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancel
            </Link>
            <Button type="submit">Create transaction</Button>
        </div>
    </form>);
}
