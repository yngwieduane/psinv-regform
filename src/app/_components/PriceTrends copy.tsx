'use client';

import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import { LineChart, Line, Legend, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface saleData {
    year: string;
    place: string;
    apartmentSale: number;
    villaSale:  number;
}

interface rentData {
    year: string;
    place: string;
    apartmentRent: number;
    villaRent: number;
}

const PriceTrends = () => {

    const[region, setRegion] = useState('Abu Dhabi');
    const[district, setDistrict] = useState('Yas Island');

    const dataSaleSet: saleData[] = [
    { year: '2019', place: 'Yas Island', apartmentSale: 96.78, villaSale: 100.53 },
    { year: '2020', place: 'Yas Island', apartmentSale: 102.78, villaSale: 111.71 },
    { year: '2021', place: 'Yas Island', apartmentSale: 96.78, villaSale: 97.71 },

    { year: '2019', place: 'Saadiyat Island', apartmentSale: 45, villaSale: 50.53 },
    { year: '2020', place: 'Saadiyat Island', apartmentSale: 67, villaSale: 111 },
    { year: '2021', place: 'Saadiyat Island', apartmentSale: 86, villaSale: 68 }
    ];

    const dataRentSet: rentData[] = [
    { year: '2019', place: 'Yas Island', apartmentRent: 96.78, villaRent: 100.53 },
    { year: '2020', place: 'Yas Island', apartmentRent: 102.78, villaRent: 111.71 },
    { year: '2021', place: 'Yas Island', apartmentRent: 96.78, villaRent: 97.71 },

    { year: '2019', place: 'Saadiyat Island', apartmentRent: 86.78, villaRent: 90.53 },
    { year: '2020', place: 'Saadiyat Island', apartmentRent: 102.78, villaRent: 111.71 },
    { year: '2021', place: 'Saadiyat Island', apartmentRent: 96.78, villaRent: 97.71 }
    ];

    const [selectedSaleDistrict, setSelectedSaleDistrict] = useState('Yas Island');
    const [selectedRentDistrict, setSelectedRentDistrict] = useState('Yas Island');

    
        const saleData = dataSaleSet.filter(item => item.place === selectedSaleDistrict);
        const rentData = dataRentSet.filter(item => item.place === selectedRentDistrict);
        // setFilteredSale(saleDataSe.filter(item => item.place === district));
        // setFilteredRent(dataRent.filter(item => item.place === district));
      

    

    return(
        <>
        <section id="price-trends">
            <div className="mx-auto container px-6 md:px-10 my-10">
                <p className="text-lg font-semibold text-[#E35F27] mb-5">A Quick Glimpse</p>
                <h2 className="text-xl md:text-[40px] font-bold text-[#272963] mb-9 leading-tight capitalize max-w-[1125px]">
                    Price Trends
                </h2>
                <div className="flex gap-7 text-[#272963]">
                    {/* Sale Price Chart */}
                    <div className="md:w-1/2 p-6 rounded-lg border border-[#EAECF0] shadow-sm mb-6">
                        <h4 className="text-lg font-semibold mb-3">Sale Price Indices by Area</h4>
                        <div className="flex gap-3 mb-4 text-[#000]">
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-sm">Region:</label>
                                <select value={region} onChange={(e) => setRegion(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-sm" >
                                    <option>Abu Dhabi</option>
                                    <option>Select All</option>
                                </select>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-sm">District:</label>
                                <select value={selectedSaleDistrict} onChange={(e) => setSelectedSaleDistrict(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-sm">
                                    <option>Yas Island</option>
                                    <option>Saadiyat Island</option>
                                </select>
                            </div>  
                            <div className="flex gap-3">
                                <span className="w-[10px] h-[10px] bg-[#272963]"></span>
                                <span className="w-[10px] h-[10px] bg-[#272963]"></span>
                            </div>                          
                        </div>   
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <LineChart className="h-full"  data={saleData}  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone"
                                        dataKey="apartmentSale"
                                        stroke="#2E3A8C"
                                            strokeWidth={3}
                                            name="Apartment"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="villaSale"
                                            stroke="#E35F27"
                                            strokeWidth={3}
                                            name="Villa"
                                        />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Rent Price Chart */}
                    <div className="md:w-1/2 p-6 rounded-lg border border-[#EAECF0] shadow-sm mb-6">
                        <h4 className="text-lg font-semibold mb-3">Rent Price Indices by Area</h4>
                        <div className="flex gap-3 mb-4 text-[#000]">
                            <div className="flex gap-2 items-center justify-between">
                                <label className="text-[#272963] text-sm">Region:</label>
                                <select value={region} onChange={(e) => setRegion(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-sm" >
                                    <option>Abu Dhabi</option>
                                    <option>Select All</option>
                                </select>                                
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-sm">District:</label>
                                <select value={selectedRentDistrict} onChange={(e) => setSelectedRentDistrict(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-sm">
                                    <option>Yas Island</option>
                                    <option>Saadiyat Island</option>
                                </select>
                            </div>                            
                        </div>    
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <LineChart className="h-full"  data={rentData}  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone"
                                        dataKey="apartmentRent"
                                        stroke="#2E3A8C"
                                            strokeWidth={3}
                                            name="Apartment"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="villaRent"
                                            stroke="#E35F27"
                                            strokeWidth={3}
                                            name="Villa"
                                        />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default PriceTrends