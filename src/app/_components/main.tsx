

export default function Main() {

    return(
        <main>
            <div className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-20">
                <div className="left-0 top-0 absolute bg-gradient-to-l from-black/0 to-black" />
                <img
                    alt=""
                    src="/main-banner.png"
                    className="absolute inset-0 -z-10 size-full object-cover not-dark:hidden"
                />
                <img
                    alt=""
                    src="/main-banner.png"
                    className="absolute inset-0 -z-10 size-full object-cover opacity-10 dark:hidden"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                    style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>
                <div className="mx-auto px-6 lg:px-8">
                    <div className=" max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-start">
                            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
                            Maximize Your Property's  Potential
                            </h1>
                            <p className="mt-8 text-xl font-medium text-pretty text-white ">
                            Sell or Lease Your Property Faster Than the Market Average
                            </p>
                            <p>Partner with Property Shop Investment (PSI) and benefit from our proven expertise in maximizing property value and accelerating transactions.  Our professional team ensures your property receives premium exposure, verified listing placement, and full marketing support to help you achieve faster, more profitable results. </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                    style={{
                        clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </main>
    )

}