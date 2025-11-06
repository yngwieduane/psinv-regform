import Image from "next/image"
import { FaArrowRight, FaFontAwesome } from "react-icons/fa6"

export default function Main() {

    return(
        <main>
            <div
            className="h-[500px] md:h-[800px] relative isolate overflow-hidden bg-[url('/list-banner.webp')] bg-cover bg-center bg-no-repeat"
            >
                <div className="h-[500px] md:h-[800px] absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />                
                <div className="h-[500px] md:h-[800px] flex items-center">
                    <div className="mx-auto container px-6 md:px-10 ">
                        <div className="pt-32 sm:pt-48 relative flex flex-col space-y-5 items-start w-full xl:p-0 lg:py-5 lg:px-1 py-5">
                            <div className="text-start md:mt-30">
                                <h1 className="text-4xl font-semibold tracking-tight text-white text-gray-900 sm:text-6xl ">
                                Maximize Your Property's  Potential
                                </h1>
                                <p className="mt-8 text-xl md:text-2xl font-medium text-pretty text-white ">
                                Sell or Lease Your Property Faster Than the Market Average
                                </p>
                                <div className="flex flex-1 justify-start mt-5">
                                    <a href="#see-more" className="flex gap-2 items-center text-sm/6 font-semibold text-white bg-[#E46027] py-2 px-5 rounded-full">
                                    See more <FaArrowRight />
                                    </a>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </main>
    )

}