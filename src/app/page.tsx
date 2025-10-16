import Image from "next/image";
import Header from "./_components/header";
import Main from "./_components/main";
import RealEstateMarket from "./_components/RealEstateMarket";
import AbuDhabiPropertySale from "./_components/AbuDhabiPropertySale";

export default function Home() {
return (
    <>
        <Header/>
        <Main/>
        <RealEstateMarket/>
        <AbuDhabiPropertySale/>
    </>
);
}
