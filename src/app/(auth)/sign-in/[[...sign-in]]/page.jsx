import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Waste management"
            src="https://plus.unsplash.com/premium_photo-1688678097388-a0c77ea9ace1?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <FontAwesomeIcon icon={faRecycle} className="h-12 w-12" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to City 360
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Join our community in making a difference. List your waste, find recycling solutions, and contribute to a cleaner City .
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-green-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <FontAwesomeIcon icon={faRecycle} className="h-8 w-8" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to City 360
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Join our community in making a difference. List your waste, find recycling solutions, and contribute to a cleaner City.
              </p>
            </div>

            <SignIn afterSignInUrl="/" />

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By signing in, you're joining a community committed to sustainable waste management.
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
