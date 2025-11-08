
const facts = [
  { name: 'Al Reem Island', sold: '20,146'},  
  { name: 'Yas Island', sold: '17,834' },
  { name: 'Al Saadiyat Island', sold: '8,881' },
  { name: 'Al Reef', sold: '6,621' },
  { name: 'Al Shamkhah', sold: '5,184' }   
];

const facts2 = [
  { name: 'Apartment', sold: '45,523'},  
  { name: 'Villa', sold: '17,576' },
  { name: 'Townhouse/ Attached Villa', sold: '12,328' }  
];

export default function AbuDhabiPropertySale() {

    return(
        <section id="sales">
        <div className="relative min-h-screen flex justify-between items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-0" />
            <video className="absolute inset-0 w-full h-full object-cover object-center -z-10" src="/psi-ferarri.mp4" autoPlay loop playsInline muted></video>
            <div className="relative z-10 container mx-auto ">
                <div className="container mx-auto md:py-50 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
                        <div className="gap-2 flex flex-wrap mx-6 lg:mx-15">
                            <h2 className="text-2xl md:text-[50px] text-white font-semibold ">Abu Dhabi<br/><span className="font-light">Property Sales</span></h2>
                            
                        </div>
                        <div>
                            <div className="flow-root mx-10 md:mx-13 lg:mx-15">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-3 md:px-0 lg:px-8">
                                      <h3 className="text-xl font-normal text-white mb-5 ">Top 5 Districts with Sold Units in 2025</h3>
                                      <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg mb-5">
                                        <table className="relative min-w-full divide-y divide-gray-300 backdrop-blur-xs">
                                            <thead className="bg-white/60 backdrop-blur-xs">                                                
                                                <tr>
                                                    <th
                                                    scope="col"
                                                    className="py-3.5 pr-3 pl-4 text-left text-sm font-normal text-white sm:pl-6"
                                                    >
                                                    District
                                                    </th>
                                                    <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-center text-sm font-normal text-white"
                                                    >
                                                    Unit sold
                                                    </th>                                                
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 divide-white/10 bg-white/50 ">
                                            {facts.map((fact) => (
                                                <tr key={fact.name}>
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-6 text-white">
                                                    {fact.name}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-white">
                                                    {fact.sold}
                                                </td>                                                
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                      </div>
                                      <h3 className="text-xl font-normal text-white mb-5 ">Breakdown by Property Type(2025)<br />
                                                    Whar buyers chose most this year</h3>
                                      <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg mb-5">
                                        <table className="relative min-w-full divide-y divide-gray-300 backdrop-blur-xs">
                                            <thead className="bg-white/60 backdrop-blur-xs">                                                
                                                <tr>
                                                    <th
                                                    scope="col"
                                                    className="py-3.5 pr-3 pl-4 text-left text-sm font-normal text-white sm:pl-6"
                                                    >
                                                    District
                                                    </th>
                                                    <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-center text-sm font-normal text-white"
                                                    >
                                                    Unit sold
                                                    </th>                                                
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 divide-white/10 bg-white/50 ">
                                            {facts2.map((fact) => (
                                                <tr key={fact.name}>
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-6 text-white">
                                                    {fact.name}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-white">
                                                    {fact.sold}
                                                </td>                                                
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )

}