import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Logo from "@/app/ui/logo";
import Image from "next/image";
import Footer from "./ui/footer";

export default function Page({
  searchParams,
}: {
  searchParams?: { auth?: string };
}) {
  const auth = searchParams?.auth === "1";
  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          <Logo />
        </div>

        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p
              className={`${lusitana.className} text-xl text-gray-800 lg:text-2xl md:leading-normal`}
            >
              <strong>Take control of your money.</strong> A simple, secure, way
              to track your income and expenses in one place.
            </p>
            <div className="flex gap-4 md:max-xl:flex-col">
              <Link
                href="/login"
                className="flex items-center self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                <span>Login</span>
                <ArrowRightIcon className="ml-2 w-5 md:w-6" />
              </Link>
              {auth && (
                <Link
                  href="/dashboard"
                  className="flex items-center self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                >
                  <span>Dashboard</span>
                  <ArrowRightIcon className="ml-2 w-5 md:w-6" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
              src={"/hero-desktop.png"}
              width={1000}
              height={760}
              className={"hidden md:block"}
              alt={
                "Screenshots of the dashboard project showing desktop version "
              }
            />
            <Image
              src={"/hero-mobile.png"}
              width={560}
              height={620}
              className={"md:hidden"}
              alt={
                "Screenshots of the dashboard project showing mobile version"
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
