import Image from "next/image"

const banners = [
  { name: 'List Your Property', subtitle: 'Add all the information related to your property', image: '/announce.svg' },
  { name: 'One of Our Agents will Contact You', subtitle: 'We will Help you Find the Best buyer', image: '/Buildings.svg' },
  { name: 'Meet with serious buyers', subtitle: 'Final Step to sell your property', image: '/community.svg' },
]

export default function Main() {

    return(
        <main>
            <div
            className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-20 bg-[url('/main-banner.png')] bg-cover bg-center bg-no-repeat"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />                
                <div className="lg:pt-30">
                    <div className="mx-auto container px-6 md:px-10">
                    <div className=" max-w-3xl pt-32 sm:pt-48 relative flex flex-col space-y-5 items-start w-full xl:p-0 lg:py-5 lg:px-1 py-5">
                            <div className="text-start">
                                <h1 className="text-5xl font-semibold tracking-tight text-white text-gray-900 sm:text-7xl ">
                                Maximize Your Property's  Potential
                                </h1>
                                <p className="mt-8 text-xl font-medium text-pretty text-white ">
                                Sell or Lease Your Property Faster Than the Market Average
                                </p>
                                <p className="mt-8 text-sm/7 font-light tracking-wide text-pretty text-white ">Partner with <span className="font-bold">Property Shop Investment (PSI)</span> and benefit from our proven expertise in maximizing property value and accelerating transactions.<br/>Our professional team ensures your property receives premium exposure, verified listing placement, and full marketing support to help you achieve faster, more profitable results. </p>
                            </div>
                        </div>
                        <div className="mt-5 grid md:grid-cols-3 items-stretch justify-center gap-5">
                            {banners.map((item,index) => (
                                <div key={index} className="relative flex flex-col space-y-5 items-start w-full p-5 border border-gray-600 backdrop-blur-xs bg-black/40 cursor-pointer rounded-xl shadow-md h-full">
                                    <div className="w-fit relative border border-gray-600 rounded-full p-3">
                                        <Image src={item.image} alt="psi property" title="psi property" width="300" height="300" className="w-full object-fit rounded-xl" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <h3 className="font-semibold capitalize text-xl">{item.name}</h3>
                                        <p className="text-normal capitalize">{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}