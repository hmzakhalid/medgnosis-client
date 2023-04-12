import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="rounded-lg bg-gray-900 shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <Image
              src="/assets/Logo.png"
              alt="MedGnosis Logo"
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-40"
            />
          </Link>
          <ul className="mb-6 flex list-none flex-wrap items-center text-sm font-medium sm:mb-0">
            <li>
              <a
                href="#"
                className="mr-4 text-violet-300 hover:underline  md:mr-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mr-4 text-violet-300 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mr-4 text-violet-300 hover:underline  md:mr-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="text-violet-300 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6  border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center">
          © 2023{" "}
          <Link href="#" className="text-violet-300 hover:underline">
            MedGnosis™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
