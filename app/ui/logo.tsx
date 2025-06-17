import { BanknotesIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BanknotesIcon className="h-10 w-10 md:h-12 md:w-12 mr-4" />
      <p className="text-[36px] md:text-[44px]">Transaction Tracker</p>
    </div>
  );
}
