import Image from "next/image";
import Header from "./_components/header";
import Main from "./_components/main";
import RealEstateMarket from "./_components/RealEstateMarket";
import AbuDhabiPropertySale from "./_components/AbuDhabiPropertySale";
import PerformanceSection from "./_components/PerformanceSection";
import Why from "./_components/Why";
import Testimonial from "./_components/Testimonial";
import ListYourPropertySection from "./_components/ListYourPropertySection";
import FooterListSection from "./_components/FooterListSection";

export default function Home() {
return (
    <>
        <Header/>
        <Main/>
       <ListYourPropertySection />
        <RealEstateMarket/>
    
        <AbuDhabiPropertySale/>
        <Why />
        <PerformanceSection />
        <Testimonial />
        <FooterListSection/>
    </>
);
}