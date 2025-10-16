"use client"

const WhySection = () => {

    return(
        <>

        <div className="w-full py-10">
            <div className="max-w-screen-xl md:flex mx-auto px-4 items-center mb-7">
                <div className="md:w-[75%]">
                    <h5 className="text-sm text-[#E35F27] font-semibold mb-3">Trusted Real Estate Experts</h5>
                    <h2 className="text-4xl text-[#272963] font-medium leading-normal mb-3">Why Partner with Property Shop Investment?</h2>                    
                </div> 
                <div className="md:w-[25%]">
                    <button className="bg-[#E46027] text-[#fff] w-full py-5 px-5 rounded-[100px]">Unlock Your Property Potential</button>   
                </div>            
            </div>
            <div className="max-w-screen-xl md:flex mx-auto px-4 gap-5 items-center md:space-y-0 space-y-5 items-stretch">                
                <div className="md:w-1/3 text-[#fff] bg-[#17173B] p-5 rounded-lg space-y-5 flex-1">
                    <img src="/icons/market-icon.svg" alt="Market Exposure" title="Market Exposure" />
                    <h5 className="text-xl mb-7 font-semibold">Strategic Market Exposure</h5>
                    <p className="text-md leading-normal">We make sure your property gets noticed. From top real estate portals to 
                        targeted digital campaigns and PSI's exclusive network of qualified investors and tenants, your property is positioned 
                        where serious buyers are actively searching. We go beyond traditional listings to help you reach the right audience.</p>                    
                </div> 
                <div className="md:w-1/3 text-[#fff] bg-[#17173B] p-5 rounded-lg space-y-5 flex-1">
                    <img src="/icons/package.svg" alt="Marketing Package" title="Marketing Package" />
                    <h5 className="text-xl mb-7 font-semibold">Comprehensive Marketing Package</h5>
                    <p className="text-md leading-normal">At PSI, we provide a full suite of professional marketing services at no extra cost. 
                        This includes high-quality photography, promotional videos, and immersive 360° virtual tours — all designed to make your property 
                        stand out and attract faster inquiries.</p>                    
                </div> 
                <div className="md:w-1/3 text-[#fff] bg-[#17173B] p-5 rounded-lg space-y-5 flex-1">
                    <img src="/icons/data.svg" alt="Data Transparency" title="Data Transparency" />
                    <h5 className="text-xl mb-7 font-semibold">Data Transparency and Dedicated Support</h5>
                    <p className="text-md leading-normal">Every property owner gets a dedicated account manager backed by PSI's advanced CRM system. 
                        You’ll receive real-time analytics, clear communication, and monthly progress updates — so you're always in the loop.</p>                    
                </div>                           
            </div>
        </div>
        </>
    )

}

export default WhySection