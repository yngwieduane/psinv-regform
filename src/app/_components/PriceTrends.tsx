'use client';

import { useEffect, useRef, useState } from "react";
import { LineChart, Line, Legend, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, ReferenceLine } from "recharts";

export type SaleOrRent = {
    date: string;
    place: string;
    [key: string]: string | number | undefined;
}

interface saleData extends SaleOrRent {    
    region: string,
    apartmentSale?: number;
    villaSale?:  number;
}

interface rentData extends SaleOrRent {
    region: string,
    apartmentRent?: number;
    villaRent?: number;
}

interface MergedRecord {
  date: string;
  place: string;
  apartmentSale?: number;
  villaSale?: number;
  apartmentRent?: number;
  villaRent?: number;
  type?: string;
}

// Merge function
export function mergeSaleRentData(dataSale: SaleOrRent[], dataRent: SaleOrRent[]): MergedRecord[] {
    const merged: MergedRecord[] = [];

    dataSale.forEach((sale) => {
        const sameDatePlaceRent = dataRent.find(
            (r) => 
                r.date === sale.date &&
                r.place?.toLowerCase().trim() === sale.place?.toLowerCase().trim()
        );
        const record: MergedRecord = {
            date: sale.date,
            place: sale.place
        };

        if((sale as any).apartmentSale) record.apartmentSale = (sale as any).apartmentSale as number;
        if((sale as any).villaSale) record.villaSale = (sale as any).villaSale as number;
        if((sameDatePlaceRent as any)?.apartmentRent) record.apartmentRent = (sameDatePlaceRent as any).apartmentRent as number;
        if((sameDatePlaceRent as any)?.villaRent) record.villaRent = (sameDatePlaceRent as any).villaRent as number;

        if (record.apartmentSale || record.apartmentRent) record.type = "apartment";
        else if (record.villaSale || record.villaRent) record.type = "villa";

        merged.push(record);

    });
    return merged;
    console.log(merged, "SaleREnt");
}    

const PriceTrends = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    const[region, setRegion] = useState('Abu Dhabi');

    const[district, setDistrict] = useState('Saadiyat Island');
    const[propType, setPropType] = useState('villa');
    //const[beds, setBeds] = useState('1 bed'); 

    const[dataSaleSet, setDataSaleSet] = useState<saleData[]>([]);   
    const[dataRentSet, setDataRentSet] = useState<rentData[]>([]); 
    //const [dataSaleAndRentSet, setDataSaleAndRentSet] = useState<MergedRecord[]>([]); 
    const [mergedData, setMergedData] = useState<MergedRecord[]>([]);
    
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

        // fetch('/data/saleAndRent.json')
        // .then(res => res.json())        
        // .then(data => setDataSaleAndRentSet(data))
        // .catch(err => console.error('Error loading saleAndRentData.json:', err));


    },[]);

    useEffect(()=> {
        if(dataSaleSet.length && dataRentSet.length) {
            const merged = mergeSaleRentData(dataSaleSet, dataRentSet);
            setMergedData(merged);
        }
    },[dataSaleSet,dataRentSet]);

    const salePlaceOptions = Array.from(
        new Set(dataSaleSet.map(item => item.place))
    );
    const rentPlaceOptions = Array.from(
        new Set(dataRentSet.map(item => item.place))
    );


    const saleData = dataSaleSet.filter(item => item?.place?.toLowerCase() === selectedSaleDistrict.toLowerCase());
    const rentData = dataRentSet.filter(item => item?.place.toLowerCase() === selectedRentDistrict.toLowerCase());

    // const filteredMergedData = mergedData.filter(
    //     (i) => i.place?.toLowerCase() === district.toLowerCase() &&
    //             i.type?.toLowerCase() === propType.toLowerCase()
    // );

    // const saleandRentData = dataSaleAndRentSet.filter(item => 
    //     item?.district?.toLowerCase() === district.toLowerCase() && 
    //     item?.type?.toLowerCase() === propType.toLowerCase() && 
    //     item?.beds?.toLowerCase() === beds.toLowerCase() 
    // );   

    const availableDist = Array.from(
        new Set(mergedData.map(item => item.place))
    );


    const availableTypes = Array.from(
        new Set(
            mergedData
                .filter(item => item.place?.toLowerCase() === district.toLowerCase())
                .map(item => item.type)
                .filter(Boolean) as string[]
        )
    );


    useEffect(() => {
        if (availableTypes.length > 0) {
            setPropType(prev => (prev && availableTypes.includes(prev) ? prev : availableTypes[0]!));
        } else {
            setPropType(""); // fallback if no types exist
        }
    }, [district, mergedData]);


// Filter merged data based on district AND selected propType
const filteredMergedData = mergedData.filter(
  item =>
    item.place?.toLowerCase() === district.toLowerCase()
);

    return(
        <>
        <section id="price-trends" ref={containerRef}>
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
                                    className="capitalize border border-[#D0D5DD] shadow-none rounded-lg p-2 text-[#272963] text-xs">
                                        {salePlaceOptions.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}                                    
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
                                    <CartesianGrid horizontal={true} vertical={false} stroke="#E5E7EB" strokeDasharray="0" />
                                        <XAxis dataKey="date" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} 
                                        tickLine={false} interval="preserveStartEnd" />
                                        <YAxis axisLine={false} tick={false}  width={0} tickCount={6} />
                                        <Tooltip />
                                        
                                        {/* Gradient fills */}
                                        <defs>
                                            <linearGradient id="salePriceGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2E3A8C" stopOpacity={0.12} />
                                                <stop offset="100%" stopColor="#2E3A8C" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="annualRentGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#E35F27" stopOpacity={0.1} />
                                                <stop offset="100%" stopColor="#E35F27" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area yAxisId="left" type="monotone" dataKey="saleprice"
                                        stroke="none" fill="url(#salePriceGradient)"
                                        />
                                        <Area yAxisId="right" type="monotone" dataKey="annualrent"
                                        stroke="none" fill="url(#annualRentGradient)"
                                        />
                                        <Line type="monotone" dataKey="apartmentSale" stroke="#2E3A8C"
                                        strokeWidth={3} dot={false} activeDot={{ r: 5 }} name="Apartment"
                                        />
                                        <Line type="monotone" dataKey="villaSale" stroke="#E35F27"
                                        strokeWidth={3} dot={false} activeDot={{ r: 5 }} name="Villa"
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
                                </select>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="text-[#272963] text-xs">District:</label>
                                <select value={selectedRentDistrict} onChange={(e) => setSelectedRentDistrict(e.target.value)}
                                    className="capitalize border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                    {rentPlaceOptions.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
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
                                    <CartesianGrid horizontal={true}  vertical={false} stroke="#E5E7EB" strokeDasharray="0" />
                                        <XAxis
                                        dataKey="date"
                                        tick={{ fill: "#6B7280", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false} interval="preserveStartEnd"
                                        />
                                        <YAxis axisLine={false} tick={false}  width={0} tickCount={6} />
                                        <Tooltip />  
                                        {/* Gradient fills */}
                                        <defs>
                                            <linearGradient id="salePriceGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2E3A8C" stopOpacity={0.12} />
                                                <stop offset="100%" stopColor="#2E3A8C" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="annualRentGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#E35F27" stopOpacity={0.1} />
                                                <stop offset="100%" stopColor="#E35F27" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area  yAxisId="left" type="monotone" dataKey="saleprice" stroke="none"
                                        fill="url(#salePriceGradient)"
                                        />
                                        <Area yAxisId="right" type="monotone" dataKey="annualrent" stroke="none"
                                        fill="url(#annualRentGradient)"
                                        />                                      
                                        <Line type="monotone"
                                        dataKey="apartmentRent"
                                        stroke="#2E3A8C"
                                        strokeWidth={3} dot={false} activeDot={{ r: 5 }}
                                        name="Apartment"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="villaRent"
                                            stroke="#E35F27"
                                            strokeWidth={3} dot={false} activeDot={{ r: 5 }}
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
                            </select>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="text-[#272963] text-xs">District:</label>
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="capitalize border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs"
                            >
                                {availableDist.length > 0 ? (
                                availableDist.map(d => <option key={d} value={d}> {d} </option>)
                                ) : (
                                <option value="">No places available</option>
                                )}
                            </select>
                        </div> 
                        <div className="flex gap-2 items-center">
                            <label className="text-[#272963] text-xs">Property Type:</label>
                            <select
                                value={propType}
                                onChange={(e) => setPropType(e.target.value)}
                                className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs"
                            >
                                <option value="apartment">Apartment</option>
                                <option value="villa">Villa</option>                               
                            </select>
                        </div>
                        {/* <div className="flex gap-2 items-center relative">
                            <label className="text-[#272963] text-xs">Layout:</label>
                            <select value={beds} onChange={(e) => setBeds(e.target.value)}
                            className="border border-[#D0D5DD] rounded-lg p-2 text-[#272963] text-xs">
                                {availableBeds.length > 0 ? (
                                    availableBeds.map(b=> <option key={b} value={b}> {b} </option>)
                                ):(
                                    <option value="">No layouts available</option>
                                )}                                
                            </select>
                        </div>   */}
                        <div className="flex gap-3">
                            <div className="flex gap-2 items-center text-xs">
                                <span className="w-[8px] h-[8px] bg-[#272963] rounded-full"></span>Sale Price(M AED)
                            </div>
                            <div className="flex gap-2 items-center text-xs">
                                <span className="w-[8px] h-[8px] bg-[#E35F27] rounded-full"></span>Annual Rent(M AED)
                            </div>
                        </div>                          
                    </div>   
                    <div className="w-full h-[300px] relative">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart className='h-full'  data={filteredMergedData}  >
                                <CartesianGrid horizontal={true} vertical={false} stroke="#E5E7EB" strokeDasharray="0"  />
                                    <XAxis
                                    dataKey="date"
                                    tick={{ fill: "#6B7280", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false} interval="preserveStartEnd"
                                    />
                                    <YAxis yAxisId="left" axisLine={false} tick={false}  width={0} tickCount={6} />
                                    <YAxis yAxisId="right" axisLine={false} tick={false}  width={0} tickCount={6} />
                                    <Tooltip  />   
                                    {/* Gradient fills */}
                                    <defs>
                                        <linearGradient id="salePriceGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2E3A8C" stopOpacity={0.12} />
                                            <stop offset="100%" stopColor="#2E3A8C" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="annualRentGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#E35F27" stopOpacity={0.1} />
                                            <stop offset="100%" stopColor="#E35F27" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey={`${propType}Sale`}
                                    stroke="none"
                                    fill="url(#salePriceGradient)"
                                    />
                                    <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey={`${propType}Rent`}
                                    stroke="none"
                                    fill="url(#annualRentGradient)"
                                    />
                                    <Line
                                    type="monotone"
                                    yAxisId="left"
                                    dataKey={`${propType}Sale`}
                                    stroke="#2E3A8C"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 5 }}
                                    name="Sale Price"
                                    />
                                    <Line
                                    type="monotone"
                                    yAxisId="right"
                                    dataKey={`${propType}Rent`}
                                    stroke="#E35F27"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 5 }}
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