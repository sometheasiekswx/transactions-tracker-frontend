import Link from "next/link";

export default function Footer() {
  const products = [
    { link: "/", name: "Home" },
    { link: "/dashboard", name: "Dashboard" },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-100 pt-8 lg:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Product</p>

              <ul className="mt-6 space-y-4 text-sm">
                {products.map(({ link, name }, number) => (
                  <li>
                    <Link
                      key={number.toString() + name}
                      href={link}
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; 2025. Somethea Siek. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
