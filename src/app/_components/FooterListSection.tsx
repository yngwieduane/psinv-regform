'use client';

import Image from 'next/image';
import PropertyForm from '@/app/_components/PropertyForm';

export default function FooterListSection() {
     const FOOTER_FORM_ID = 'footer-list-property-form';

  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden flex items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/footer-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent -z-10" />
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_640px] gap-8 items-center">
          <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
              <span className="font-bold">List Your Property</span>
              <br />
              <span className="font-light">With Confidence</span>
            </h2>
            <p className="mt-6 max-w-lg text-white/80 mx-auto md:mx-0">
              Let our team help you achieve faster results and stronger returns.
              Submit your details today for a free valuation and consultation
              with one of our real estate specialists.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-[16px] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-[32px] md:text-[40px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">
                List Your Property
              </h3>
    <button
      type="submit"
      form={FOOTER_FORM_ID}
      className="shrink-0 rounded-full bg-[#E35F27] px-6 py-2.5 text-white font-semibold"
    >
                Send
              </button>
            </div>
           <PropertyForm formId={FOOTER_FORM_ID} variant="footer" />
          </div>
        </div>
      </div>
    </section>
  );
}
