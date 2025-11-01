
export default function LoyaltyProgram() {

    return(
        <>
        <div className="spacer md:h-[60px] h-[40px]"></div>
        <section id="loyalty-program">
            <div className="mx-auto container px-6 md:px-10">
                <div className="w-full mx-auto md:flex md:px-10 py-10 px-5 bg-cover bg-bottom rounded-lg items-center justify-between"  style={{backgroundImage:"url('/loyalty-program.webp')"}}>
                    <div className="md:w-[60%]">
                        <h2 className="md:text-[40px] text-[30px] text-[#fff] font-semibold leading-normal">PSI Loyalty Program</h2>
                        <h3 className="brittanysignature md:text-[30px] text-[18px] text-[#E35F27] mb-5">Beyond Real Estate  Beyond Limits</h3>
                        <img src="/loyalty.gif" className="md:hidden block my-5" ></img>
                        <p className="text-[#fff]">The PSI Loyalty Program offers exclusive discounts from trusted service providers to PSI clients. From furniture and landscaping to home services, moving services, tourism, hospitality, interior design and more, we’ve partnered with top tiers vendors to make your move-in experience smoother and more affordable. It’s our way of adding value beyond the sale and staying connected with you.</p>
                        <div className="justify-start mt-5 btnOuter relative w-[196px] h-[60px]">                            
                            <a href="https://loyalty-program.psinv.net/" target="_blank" className="flex animatePing justify-content-start gap-5 px-7 w-[190px] h-[48px] items-center text-sm/6 
                            font-semibold text-white bg-[#E46027] py-2 px-5 rounded-lg btnAnimate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <path d="M9.16834 17.5016C13.7707 17.5016 17.5017 13.7707 17.5017 9.16829C17.5017 4.56592 13.7707 0.834961 9.16834 0.834961C4.56597 0.834961 0.835007 4.56592 0.835007 9.16829C0.835007 13.7707 4.56597 17.5016 9.16834 17.5016Z" stroke="#FBFBFB" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Visit Now                                
                            </a>
                            <div className="btnAnimateBorder"></div>
                        </div>
                    </div>
                    <div className="md:w-[40%] md:block hidden">
                        <img src="/loyalty.gif" ></img>
                    </div>
                </div> 
            </div>
        </section>
        </>
    )

}