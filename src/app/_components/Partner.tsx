import Image from "next/image"

const banners = [
  { name: 'List Your Property', subtitle: 'Add all the information related to your property', image: '/announce.svg' },
  { name: 'One of Our Agents will Contact You', subtitle: 'We will Help you Find the Best buyer', image: '/Buildings.svg' },
  { name: 'Meet with serious buyers', subtitle: 'Final Step to sell your property', image: '/community.svg' },
]

export default function Partner() {

    return(
            <div
            className="py-25 w-full bg-[#17173B]" id="see-more"
            >                               
                <div className="">
                    <div className="mx-auto container px-6 md:px-10">  
                        <h2 className="text-2xl md:text-3xl mb-7">Partner with <strong>Property Shop Investment (PSI)</strong></h2> 
                        <p className="leading-loose text-md md:text-lg">and benefit from our proven expertise in maximizing property value and accelerating transactions. Our professional team ensures your property receives premium exposure, verified listing placement, and full marketing support to help you achieve faster, more profitable results.</p>                 
                        <div className="mt-7 grid md:grid-cols-3 items-stretch justify-center gap-5">
                            {banners.map((item,index) => (
                                <div key={index} className="relative flex flex-col space-y-5 items-start w-full px-5 py-7 border border-[#FFFFFF1A] backdrop-blur-xs bg-[#252547] cursor-pointer rounded-xl shadow-md h-full">
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
    )

}