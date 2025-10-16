import Image from "next/image";
import Header from "./_components/header";
import Main from "./_components/main";
import WhySection from "./_components/whysection";
import Performance from "./_components/performance";
import Testimonials from "./_components/testimonials";

export default function Home() {
return (
    <>
        <Header/>
        <Main/>

        <WhySection />
        <Performance />
        <Testimonials/>
    </>
);
}
