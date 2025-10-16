"use client"

const Testimonial = () => {

    return(
        <>

        <div className="w-full py-10">
            <div className="container px-10 mx-auto items-center mb-7">
                <div className="w-full mb-7">
                    <h5 className="text-sm text-[#E35F27] font-semibold mb-3">Testimonials</h5>
                    <h2 className="md:text-4xl text-2xl text-[#272963] font-medium leading-normal mb-3">Client Success Stories</h2>                    
                </div> 
                <div className="w-full">
                    <div className="bg-[#17173B] text-[#fff] text-center justify-center py-10 lg:px-25 md:px-20 px-5 rounded-[8px]">
                        <p className="md:text-3xl text-xl text-center mb-5">“My apartment in Dubai Marina was rented within 10 days of listing with PSI. The process was seamless, 
                            transparent, and handled with true professionalism."</p>
                        <img src="/avatar.png" alt="avatar" title="avatar" className="mx-auto mb-4" />
                        <p className="text-sm font-semibold mb-1">Mr. Ahmed</p>
                        <p className="text-sm">Property Owner</p>
                    </div>  
                </div>            
            </div>
        </div>            
        </>
    )

}

export default Testimonial