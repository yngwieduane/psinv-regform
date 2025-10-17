'use client';
import Image from 'next/image';
import PropertyForm from './PropertyForm';

export default function ListYourPropertySection() {
  async function handleSubmit(values: any) {
    console.log('Section form submit:', values);
  }

  return (
    <div className="mx-auto container px-10 my-10">
      <p className="text-lg font-semibold text-[#E35F27] mb-5">Ready to list?</p>
      <h2 className="text-xl md:text-[40px] font-bold text-[#272963] mb-9 leading-tight capitalize max-w-[1125px]">Share your property details and let our experts handle the rest — from exposure to closing the deal.</h2>
      <div className="md:flex mx-auto gap-8 items-center items-stretch">
        <div className="md:w-1/3 bg-cover bg-center bg-no-repeat min-h-full rounded-[8px] " style={{ backgroundImage:'url(/list-property.webp)'}}>          
        </div>
        <div className="md:w-2/3 text-[#fff] bg-[#17173B] p-5 rounded-lg space-y-5 ">
          <div className="relative rounded-xl text-white py-4 px-2 md:p-8 shadow-lg
                  flex flex-col">
            <div className="md:flex items-center justify-between gap-4 mb-6">
              <h3 className="text-[32px] md:text-[48px] lg:text-[60px] font-bold leading-none tracking-[-0.03em] whitespace-nowrap">
                List Your Property
              </h3>
              <button
                type="submit"
                form="list-property-form"
                className="rounded-full bg-[#E35F27] px-7 py-3 text-lg font-semibold text-white hover:opacity-95 active:opacity-90 shrink-0 md:mt-0 mt-5"
              >
                Send
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-visible md:overflow-auto">
              <PropertyForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
