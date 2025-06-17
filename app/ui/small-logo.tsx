import { BanknotesIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function SmallLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BanknotesIcon className="h-12 w-12 mr-2" />
      <p className="text-[24px]">Transaction Tracker</p>
    </div>
  );
}
