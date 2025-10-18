"use client"

import { url } from "inspector"
import { ArrowIconGreen, ArrowIconRed } from "./arrowIcon"

const PerformanceSection = () => {

    return(
        <>

        <div className="w-full text-[#fff] relative min-h-screen flex justify-between items-center overflow-hidden">                         
           <video
          className="absolute inset-0 w-full h-full object-cover object-center -z-10"
          src="/video-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/30 to-transparent z-0"></div>  
            <div className="absolute w-full z-10">       
                <div className="container lg:flex justify-between mx-auto px-10 items-center mb-7 md:py-60 py-30">
                    <div className="md:w-[37%]">
                        <h2 className="md:text-7xl text-4xl font-medium leading-none mb-7"><strong>Performance</strong><br/>
                            <span className="font-light">Snapshot</span></h2>                                                   
                        <p className="md:mb-0 mb-5 opacity-[0.8]">Our recent results highlight strong market performance and operational efficiency</p>  
                    </div>
                    <div className="xl:w-[27%] lg:w-[37%] w-full max-w-[400px] lg-mt-0 mt-5">
                        <div className="blurBox mb-10 relative py-10 px-5 bg-[#ffffff1a] rounded-[8px] border border-1 border-[#ffffff1a] backdrop-blur-[8px] space-y-5">
                            <h3 className="text-md mb-5">Properties Leased or Sold Last Quarter</h3>
                            <div className="md:flex gap-5 w-full justify-between">  
                                <div>
                                    <p className="text-[37px] mb-5">448</p>
                                    <span className="flex"><ArrowIconRed /><span className="text-[red] text-[14px]">&nbsp;10% </span>&nbsp;vs last month</span>
                                </div> 
                                <img src="/performance-down.svg" alt="performance" title="performance" className="absolute bottom-10 right-3" />                                
                            </div>
                        </div>
                        <div className="blurBox relative py-10 px-5 bg-[#ffffff1a] rounded-[8px] border border-1 border-[#ffffff1a] backdrop-blur-[8px] space-y-5">
                            <h3 className="text-md mb-5">Than the Market Average</h3>
                            <div className="md:flex gap-5 w-full justify-between">  
                                <div>
                                    <p className="text-[37px] mb-5">25% Faster</p>
                                    <span className="flex"><ArrowIconGreen /><span className="text-[green] text-[14px]">&nbsp;20% </span>&nbsp;vs last month</span>
                                </div> 
                                <img src="/performance-up.svg" alt="performance" title="performance" className="absolute bottom-10 right-3" />                                
                            </div>
                        </div>
                    </div>            
                </div> 
            </div> 
        </div>
        </>
    )

}

export default PerformanceSection