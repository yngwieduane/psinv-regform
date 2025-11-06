
export default function LoyaltyProgram() {

    return(
        <>
        <div className="spacer md:h-[30px] h-[20px]"></div>
        <section id="loyalty-program">
            <div className="mx-auto container px-6 md:px-10">
                <div className="w-full mx-auto md:flex md:px-10 py-10 px-5 bg-cover bg-bottom rounded-lg items-center justify-between"  style={{backgroundImage:"url('/loyalty-program.webp')"}}>
                    <div className="md:w-[50%]">
                        <h2 className="md:text-[40px] text-[30px] text-[#fff] font-semibold leading-normal">PSI Loyalty Program</h2>
                        <h3 className="brittanysignature md:text-[30px] text-[18px] text-[#E35F27] mb-5">Beyond Real Estate  Beyond Limits</h3>
                        <img src="/loyalty.gif" className="md:hidden block my-5" ></img>
                        <p className="text-[#fff] text-[14px]">The PSI Loyalty Program offers exclusive discounts from trusted service providers to PSI clients. From furniture and landscaping to home services, moving services, tourism, hospitality, interior design and more, we’ve partnered with top tiers vendors to make your move-in experience smoother and more affordable. It’s our way of adding value beyond the sale and staying connected with you.</p>
                        <div className="flex flex-1 justify-start mt-7">
                            <a href="https://loyalty-program.psinv.net/" target="_blank" className="text-sm/6 font-semibold text-white bg-[#E46027] py-2 px-7 rounded-full">
                            Visit Now
                            </a>
                        </div>
                    </div>
                    <div className="md:w-[45%] md:block hidden">
                        <img src="/loyalty.gif" ></img>
                    </div>
                </div> 
            </div>
        </section>
        </>
    )

}