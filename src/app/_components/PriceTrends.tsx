'use client';

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, Legend, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface saleData {
    date: string;
    place: string;
    apartmentSale?: number;
    villaSale?:  number;
}

interface rentData {
    date: string;
    place: string;
    apartmentRent?: number;
    villaRent?: number;
}

interface saleAndRentData {
    date: string;
    region: string;
    district: string;
    type: string;
    beds: string;
    saleprice: number;
    annualrent: number;
}

const PriceTrends = () => {

    const[region, setRegion] = useState('Abu Dhabi');

    const[district, setDistrict] = useState('Saadiyat Island');
    const[propType, setPropType] = useState('apartment');
    const[beds, setBeds] = useState('1 bed'); 

    const[dataSaleSet, setDataSaleSet] = useState<saleData[]>([]);   
    const[dataRentSet, setDataRentSet] = useState<rentData[]>([]); 
    const[dataSaleAndRentSet, setDataSaleAndRentSet] = useState<saleAndRentData[]>([]);     
    
    const [selectedSaleDistrict, setSelectedSaleDistrict] = useState('yas island');
    const [selectedRentDistrict, setSelectedRentDistrict] = useState('Yas Island');

    useEffect(() => {
        fetch('/data/saleData.json')
        .then(res => res.json())        
        .then(data => setDataSaleSet(data))
        .catch(err => console.error('Error loading saleData.json:', err));

        fetch('/data/rentData.json')
        .then(res => res.json())        
        .then(data => setDataRentSet(data))
        .catch(err => console.error('Error loading rentData.json:', err));

        fetch('/data/saleAndRent.json')
        .then(res => res.json())        
        .then(data => setDataSaleAndRentSet(data))
        .catch(err => console.error('Error loading saleAndRentData.json:', err));

    },[]);

    const availableDist = Array.from(
        new Set(dataSaleAndRentSet.map(item=> item.district))
    );

    const availableTypes = Array.from(
        new Set(
            dataSaleAndRentSet
            .filter(item => item?.district?.toLowerCase() === district.toLowerCase())
            .map(item=> item.type)
        )
    );

    const availableBeds = Array.from(
        new Set(
            dataSaleAndRentSet
            .filter(item =>
                item?.district?.toLowerCase() === district.toLowerCase() &&
                item?.type?.toLowerCase() === propType.toLowerCase()
            )
            .map(item=> item.beds)
        )
    );

    useEffect(() => {
        if(!availableTypes.includes(propType)){
            setPropType(availableTypes[0] || "");
        }
    },[district, dataSaleAndRentSet]);

    useEffect(() => {
        if(!availableBeds.includes(beds)){
            setBeds(availableBeds[0] || "");
        }
    },[district, availableTypes, dataSaleAndRentSet]);

    const saleData = dataSaleSet.filter(item => item?.place?.toLowerCase() === selectedSaleDistrict.toLowerCase());
    const rentData = dataRentSet.filter(item => item?.place.toLowerCase() === selectedRentDistrict.toLowerCase());

    const saleandRentData = dataSaleAndRentSet.filter(item => 
        item?.district?.toLowerCase() === district.toLowerCase() && 
        item?.type?.toLowerCase() === propType.toLowerCase() && 
        item?.beds?.toLowerCase() === beds.toLowerCase() 
    );


    return(
        <>
        <section id="price-trends">
            <div className="mx-auto container px-6 md:px-10 my-10">
                <p className="text-lg font-semibold text-[#E35F27] mb-5">A Quick Glimpse</p>
                <h2 className="text-xl md:text-[40px] font-bold text-[#272963] mb-9 leading-tight capitalize max-w-[1125px]">
                    Price Trends
                </h2>
                <div className="lg:flex gap-7 text-[#272963]">
                    {/* Sale Price Chart */}
                    <div className="lg:w-1/2 w-full p-6 rounded-lg border border-[#EAECF0] shadow-sm mb-6">
                        <h4 className="text-lg font-semibold mb-3">Sale Price Indices by Area</h4>
                        <div className="flex gap-3 mb-5 text-[#000] md:space-y-0 space-y-4 flex-wrap justify-between">
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-xs">Region:</label>
                                <select value={region} onChange={(e) => setRegion(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs" >
                                    <option>Abu Dhabi</option>
                                    {/* <option>Select All</option> */}
                                </select>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-xs">District:</label>
                                <select value={selectedSaleDistrict} onChange={(e) => setSelectedSaleDistrict(e.target.value)}
                                    className="border border-[#D0D5DD] shadow-none rounded-lg p-2 text-[#272963] text-xs">
                                    <option>Yas Island</option>
                                    <option>Saadiyat Island</option>
                                    <option>Al Raha Beach</option>
                                    <option>Reem Island</option>
                                </select>
                            </div>  
                            <div className="flex gap-3">
                                <div className="flex gap-2 items-center text-xs">
                                    <span className="w-[8px] h-[8px] bg-[#272963] rounded-full"></span>Apartment
                                </div>
                                <div className="flex gap-2 items-center text-xs">
                                    <span className="w-[8px] h-[8px] bg-[#E35F27] rounded-full"></span>Villa
                                </div>
                            </div>                          
                        </div>   
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <LineChart className="h-full"  data={saleData}  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee00" />
                                        <XAxis dataKey="date" />
                                        <YAxis axisLine={false} tick={false}  width={0} />
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
                    <div className="lg:w-1/2 w-full p-6 rounded-lg border border-[#EAECF0] shadow-sm mb-6">
                        <h4 className="text-lg font-semibold mb-3">Rent Price Indices by Area</h4>
                        <div className="flex gap-3 mb-5 text-[#000] md:space-y-0 space-y-4 flex-wrap justify-between">
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-xs">Region:</label>
                                <select value={region} onChange={(e) => setRegion(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs" >
                                    <option>Abu Dhabi</option>
                                    {/* <option>Select All</option> */}
                                </select>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-xs">District:</label>
                                <select value={selectedRentDistrict} onChange={(e) => setSelectedRentDistrict(e.target.value)}
                                    className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                    <option>Yas Island</option>
                                    <option>Saadiyat Island</option>
                                    <option>Al Raha Beach</option>
                                    <option>Al Raha Garden</option>
                                    <option>Reem Island</option>
                                </select>
                            </div>  
                            <div className="flex gap-3">
                                <div className="flex gap-2 items-center text-xs">
                                    <span className="w-[8px] h-[8px] bg-[#272963] rounded-full"></span>Apartment
                                </div>
                                <div className="flex gap-2 items-center text-xs">
                                    <span className="w-[8px] h-[8px] bg-[#E35F27] rounded-full"></span>Villa
                                </div>
                            </div>                          
                        </div>   
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <LineChart className="h-full"  data={rentData}  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee00" />
                                        <XAxis dataKey="date" />
                                        <YAxis axisLine={false} tick={false}  width={0} />
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

                {/* Average Sale and Rent Price Chart */}
                <div className="w-full p-6 rounded-lg border border-[#EAECF0] shadow-sm mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-[#272963]">Average Sale and Rent Prices by Product and Area</h4>
                    <div className="flex gap-3 mb-5 text-[#000] md:space-y-0 space-y-4 flex-wrap justify-between">
                        <div className="flex gap-2 items-center">
                            <label className="text-[#272963] text-xs">Region:</label>
                            <select value={region} onChange={(e) => setRegion(e.target.value)}
                                className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs" >
                                <option>Abu Dhabi City</option>
                                {/* <option>Select All</option> */}
                            </select>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="text-[#272963] text-xs">District:</label>
                            <select value={district} onChange={(e) => setDistrict(e.target.value)}
                                className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                {availableDist.length > 0 ? (
                                    availableDist.map(d=> <option key={d} value={d}> {d} </option>)
                                ):(
                                    <option value="">No places available</option>
                                )}
                                {/* <option value="Yas Island">Yas Island</option>
                                <option value="Saadiyat Island">Saadiyat Island</option>                                 */}
                            </select>
                        </div> 
                        <div className="flex gap-2 items-center">
                            <label className="text-[#272963] text-xs">Property Type:</label>
                            <select value={propType} onChange={(e) => setPropType(e.target.value)}
                                className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                {availableTypes.length > 0 ? (
                                    availableTypes.map(t=> <option key={t} value={t}> {t} </option>)
                                ):(
                                    <option value="">No property types available</option>
                                )}
                                {/* <option value="villa">Villa</option>
                                <option value="apartment">Apartment</option> */}
                            </select>
                        </div>
                        <div className="flex gap-2 items-center relative">
                            <label className="text-[#272963] text-xs">Layout:</label>
                            <select value={beds} onChange={(e) => setBeds(e.target.value)}
                            className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                {availableBeds.length > 0 ? (
                                    availableBeds.map(b=> <option key={b} value={b}> {b} </option>)
                                ):(
                                    <option value="">No layouts available</option>
                                )}                                
                            </select>
                            {/* <button onClick={togglBedsDropDown}>{checkedBeds}<ChevronDownIcon size={15} /></button>
                                {bedsDropDownISOpen && (                                    
                                    <div className="z-999 !w-[130px] absolute top-10  left-10 p-5 w-full shadow-lg border-1 border-[#ddd]">
                                        {bedsItems?.map(beds => (
                                            <label key={beds.name} className="flex gap-3">
                                                {beds.label}
                                                <input type="checkbox" name={beds.name} onChange={handleChange}
                                                checked={checkedBeds[beds.name] || false} />
                                            </label>                                
                                        ))}
                                    </div>
                                ) } */}
                        </div>  
                        <div className="flex gap-3">
                            <div className="flex gap-2 items-center text-xs">
                                <span className="w-[8px] h-[8px] bg-[#272963] rounded-full"></span>Sale Price(M AED)
                            </div>
                            <div className="flex gap-2 items-center text-xs">
                                <span className="w-[8px] h-[8px] bg-[#E35F27] rounded-full"></span>Annual Rent(M AED)
                            </div>
                        </div>                          
                    </div>   
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart className="h-full"  data={saleandRentData}  >
                                <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee00" />
                                    <XAxis dataKey="date" />
                                    <YAxis yAxisId="left" axisLine={false} tick={false}  width={0} />
                                    <YAxis yAxisId="right" axisLine={false} tick={false}  width={0} />
                                    <Tooltip  />
                                    <Legend />
                                    <Line type="monotone" yAxisId="left"
                                    dataKey="saleprice"
                                    stroke="#2E3A8C"
                                        strokeWidth={3}
                                        name="Sale Price"
                                    />
                                    <Line type="monotone" yAxisId="right"
                                        dataKey="annualrent"
                                        stroke="#E35F27"
                                        strokeWidth={3}
                                        name="Annual Rent"
                                    />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default PriceTrends