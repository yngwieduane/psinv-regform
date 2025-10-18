'use client';
import { useState } from 'react';
import PropertyForm from './PropertyForm';

export default function ListYourPropertySection() {
  const HERO_FORM_ID = 'hero-list-property-form';
  const [isSending, setIsSending] = useState(false);

  // Simple inline spinner (Tailwind-based)
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
      <section id="list-your-property" className="scroll-mt-28">
    <div className="mx-auto container px-6 md:px-10 my-10">
      <p className="text-lg font-semibold text-[#E35F27] mb-5">Ready to list?</p>
      <h2 className="text-xl md:text-[40px] font-bold text-[#272963] mb-9 leading-tight capitalize max-w-[1125px]">
        Share your property details and let our experts handle the rest — from
        exposure to closing the deal.
      </h2>
      <div className="md:flex mx-auto gap-8 items-center items-stretch">
        <div
          className="md:w-1/3 bg-cover bg-center bg-no-repeat min-h-full rounded-[8px]"
          style={{ backgroundImage: 'url(/list-property.webp)' }}
        ></div>
        <div className="md:w-2/3 text-[#fff] bg-[#17173B] p-5 rounded-lg space-y-5">
          <div className="relative rounded-xl text-white py-4 px-2 md:p-8 shadow-lg flex flex-col">
            <div className="lg:flex items-center justify-between gap-4 mb-6">
              <h3 className="text-[26px] sm:text-[32px] md:text-[45px] xl:text-[60px] font-bold leading-none tracking-[-0.03em] whitespace-nowrap">
                List Your Property
              </h3>

              {/* Send button with spinner */}
              <button
                type="submit"
                form={HERO_FORM_ID}
                disabled={isSending}
                className={`rounded-full bg-[#E35F27] px-6 py-2.5 text-[16px] font-semibold text-white lg:mt-0 mt-5 ${
                  isSending ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
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

            <div className="md:mt-6 flex-1 overflow-visible md:overflow-auto">
              {/* hook loading state to form */}
              <PropertyForm
                formId={HERO_FORM_ID}
                variant="dark"
                onLoadingChange={setIsSending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
