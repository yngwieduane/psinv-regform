
import Image from "next/image"
import { FaPlay } from "react-icons/fa"

export default function RealEstateMarket() {

    return(
        <div className="mx-auto container px-10 my-5 pb-5">
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#272963] my-10">Abu Dhabi Real Estate Market 2025</h2>
            <p className="text-normal text-lg font-semibold text-[#E35F27]">Government-Backed Verification For Real Estate Listings</p>
            <h3 className="text-2xl md:text-5xl font-semibold text-[#272963] my-5">Madhmoun (مضمون)</h3>
            <div className="md:flex gap-6 items-stretch w-full justify-between">
                <div className="md:w-2/3 w-full flex flex-col">
                    <div className="relative  justify-between items-center overflow-hidden rounded-xl">
                        <video className="size-fit object-cover object-center rounded-xl" src="/realestatemarket.mp4" autoPlay loop playsInline muted></video>
                        <div className="absolute z-10 bottom-10 left-10 bg-white p-4 rounded-full">
                            <FaPlay className="size-6 text-[#272963] p-1"/>
                        </div>
                    </div>
                    <div className="grid gap-5 my-5">
                        <p className="text-[#333333] opacity-80 font-semibold text-xl">Madhmoun (مضمون), meaning &quot;verified&quot; in Arabic, is Abu Dhabi&apos;s official digital Multiple Listing Service (MLS), launched by the Abu Dhabi Real Estate Centre (ADREC).</p>
                        <p className="text-[#333333] opacity-80 font-light">This government-regulated system ensures that all property listings are verified, legitimate, and transparent — eliminating duplication, misinformation, and unverified data across the market. As the Gulf region&apos;s first government MLS, Madhmoun enhances market transparency, protects property owners from misleading information, and strengthens trust between investors, landlords, and licensed brokers.</p>
                        <p className="text-[#333333] opacity-80 font-light">At <span className="font-bold">Property Shop Investment</span>, we fully integrate with the Madhmoun platform to ensure your property benefits from this verified and transparent ecosystem — giving you a clear competitive edge in today&apos;s evolving market. </p>
                    </div>
                </div>
                <div className="md:w-1/3 w-full min-h-full">
                    <img src="/realestate-image.png" alt="Real Estate Image" className="w-full h-full object-cover rounded-xl"/>
                </div>
            </div>
        </div>
    )

}