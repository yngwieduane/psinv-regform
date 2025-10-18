'use client';

import Image from 'next/image';
import { useState } from 'react';
import PropertyForm from '@/app/_components/PropertyForm';

export default function FooterListSection() {
     const FOOTER_FORM_ID = 'footer-list-property-form';
 const [isSending, setIsSending] = useState(false);

  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
    <section id="register" className="relative w-full min-h-screen text-white overflow-hidden flex items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/footer-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent -z-10" />
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
            <div className="mb-6 md:flex items-center justify-between gap-4">
              <h3 className="text-[32px] md:text-[40px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">
                List Your Property
              </h3>
   <button
            type="submit"
            form={FOOTER_FORM_ID}
            disabled={isSending}
            className={`shrink-0 rounded-full bg-[#E35F27] px-6 py-2.5 text-white font-semibold md:mt-0 mt-5 ${
              isSending ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Sending…
              </span>
            ) : (
              'Send'
            )}
          </button>

            </div>
            <PropertyForm
          formId={FOOTER_FORM_ID}
          variant="footer"
          onLoadingChange={setIsSending}
        />
          </div>
        </div>
      </div>
      
    </section>
      <div className="w-full bg-[#272963] text-[#fff] text-center py-5">
        <p className='md:text-[14px] text-[11px]'>© 2025 Property Shop Investment LLC. | All Rights Reserved.</p>
      </div>
      </>
  );
}
