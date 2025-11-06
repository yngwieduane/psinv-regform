"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Inter } from "next/font/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const slides = [
    { text: 'The PSI team are superstars when it comes to extending themselves to offer potential clients the best investments possible. Yes that’s right, the logistics department picked me up from Dubai and drove me to the site in Abu Dhabi, wait hours then drive me back to Dubai. That is superstar service at its finest. Thanks to my contact Ahmad Soultan for patiently working with me for over two years. And thanks for the driver, Adeel for his wonderful service. Thank you PSI',
      name: 'Malik Khan',
      designation: 'Property Owner',
      ago: '2 months ago',
      image: '/malik.svg',
    },
    { text: 'I had a great experience buying a property through PSI. My agent, Hesham, was outstanding; very honest, patient, and highly professional. He guided me through every step of the process with clear communication and genuine care. I truly appreciate his support and would highly recommend PSI, especially if you’re lucky enough to work with Hesham!',
      name: 'Javier Vifluela Rueda',
      designation: 'Property Owner',
      ago: '3 months ago',
      image: '/javier.svg',
    },
    { text: 'I am extremely grateful for the professional service provided by Samah Jamil Jamil. Throughout the entire property viewing process, she demonstrated exceptional expertise and dedication. Samah was very patient and attentive to my needs, showing me numerous properties until she found the perfect one for me. Her work ethic is outstanding—always hardworking and efficient while maintaining a positive attitude. She is not only highly skilled in real estate but also excels in communication and customer service. Her beauty and charm also left a lasting impression. I truly appreciate her help, and I look forward to a long-term collaboration with her. I will also gladly recommend her to anyone in need of real estate services.',
      name: 'Sully',
      designation: 'Local Guide',
      ago: '5 months ago',
      image: '/sully.svg',
    }
];


const InterNormal = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
});

const Testimonial = () => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <>
        <div className="spacer md:h-[30px] h-[20px]"></div>
        <section id="testimonials">
        <div className="w-full pt-12 pb-5">
            <div className="container px-6 md:px-10 mx-auto items-center mb-7">          
            <div className="w-full relative testimonial">
                <div className="mb-10 md:flex justify-between items-baseline">
                    <div className="md:mb-0 mb-4">
                        <h5 className="text-lg text-[#E35F27] font-semibold mb-3">
                        Testimonials
                        </h5>
                        <h2 className="md:text-[40px] text-[30px] text-[#272963] font-semibold leading-normal">
                        Client Success Stories
                        </h2>
                    </div>
                    <div className="flex gap-2 relative place-self-end">
                        <div ref={prevRef} className="cursor-pointer">
                            <img src="/icons/arrow-left.svg" alt="arrow"></img>
                        </div>
                        <div ref={nextRef} className="cursor-pointer">
                            <img src="/icons/arrow-right.svg" alt="arrow"></img>
                        </div>
                    </div>
                </div>      

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                    }}
                    autoplay={{ delay: 5000 }}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true} className="fixed"
                >
                
                    {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#17173B] p-7 rounded-2xl flex flex-col gap-4 text-white">
                            <div className="md:flex justify-between items-center mb-4">
                                <div className="flex gap-3 items-center md:mb-0 mb-4">
                                    <img src={slide.image} alt={slide.name} title={slide.name} />
                                    <div className="space-y-1">
                                        <p className="text-md font-semibold">{slide.name}</p>
                                        <p className="text-sm text-gray-300">{slide.designation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <img
                                    key={i}
                                    src="/icons/star.svg"
                                    alt="star"
                                    title="star"
                                    width={20}
                                    height={20}
                                    />
                                ))}
                                <p className="text-sm text-gray-400">{slide.ago}</p>
                                </div>
                            </div>
                            <p className={`text-lg leading-loose ${InterNormal.className}`}>{slide.text}</p>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                </div>
            </div>
        </div>
        </section>
    </>
  );
};

export default Testimonial;