
const facts = [
  { name: 'Al Reem Island', sold: '787', price: '2,702,982' },
  { name: 'Raha Island', sold: '368', price: '4,342,243' },
  { name: 'Yas Island', sold: '362', price: '2,470,086' },
  { name: 'Zayed City', sold: '143', price: '1,707902' },
  { name: 'Khalifa City', sold: '128', price: '1,656,863' },
  { name: 'Al Saadiyat Island', sold: '107', price: '7,752,195' },
  { name: 'Al Bahyah', sold: '93', price: '2,399,932' },
  { name: 'Al Reef', sold: '83', price: '1,724,197' },
  { name: 'Al Mariyah Island', sold: '82', price: '941,886' },
  { name: 'Al Faqa', sold: '63', price: '971,197' }
]

export default function AbuDhabiPropertySale() {

    return(
        <section id="sales">
        <div className="relative min-h-screen flex justify-between items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-0" />
            <video className="absolute inset-0 w-full h-full object-cover object-center -z-10" src="/psi-ferarri.mp4" autoPlay loop playsInline muted></video>
            <div className="absolute w-full z-10">
                <div className="container mx-auto md:py-50 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
                        <div className="gap-2 flex flex-wrap mx-10 lg:mx-15">
                            <h2 className="text-2xl md:text-7xl text-white font-semibold ">Abu Dhabi Property Sales - </h2>
                            <h2 className="text-2xl md:text-7xl text-white font-light">September 2025 Overview</h2>
                            <div className="flex flex-wrap justify-start md:gap-3 divide-x divide-[#ffffff50] mt-1 md:mt-10 w-full">
                                <div className="pl-0 pr-7 py-4 text-lg text-start font-light">Total Market: <span className="font-bold">2,216 units sold</span></div>
                                <div className="md:p-4 pl-0 pb-4 text-lg font-light">Average Price: <span className="font-bold">AED 2.89M</span></div>
                            </div>
                        </div>
                        <div>
                            <div className="flow-root mx-15">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-3 lg:px-8">
                                        <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg ">
                                        <table className="relative min-w-full divide-y divide-gray-300 backdrop-blur-xs">
                                            <thead className="bg-white/60 backdrop-blur-xs">
                                            <tr>
                                                <th
                                                scope="col"
                                                className="py-3.5 pr-3 pl-4 text-left text-sm font-normal text-white sm:pl-6"
                                                >
                                                Location
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-center text-sm font-normal text-white"
                                                >
                                                Sold
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-center text-sm font-normal text-white"
                                                >
                                                Avg. Price (AED)
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
                                                <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-white">
                                                    {fact.price}
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