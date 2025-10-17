'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import {
  User,
  Mail,
  MapPin,
  ChevronDown,
  CircleDollarSign,
  UploadCloud,
} from 'lucide-react';
import 'react-phone-number-input/style.css';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  price: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof schema>;

type PropertyFormProps = {
  formId?: string;
  variant?: 'dark' | 'light';
  submitLabel?: string;
  onSubmit?: (data: PropertyFormValues) => Promise<void> | void;
  className?: string;
};

export default function PropertyForm({
  formId = 'list-property-form',
  variant = 'dark',
  submitLabel = 'Submit',
  onSubmit,
  className = '',
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(schema),
  });

  const [status, setStatus] = useState<'success' | 'error' | null>(null);
    // Track uploaded files
  const [files, setFiles] = useState<File[]>([]);

  // When user selects files
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };


  const submit = async (values: PropertyFormValues) => {
    try {
      setStatus(null);
      if (files.length) {
        const fd = new FormData();
        files.forEach((f) => fd.append('files', f));

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: fd,
        });

        const json = await res.json();
        if (!json.ok) throw new Error('upload failed');
        console.log('Uploaded files at:', json.files);
      }
      await onSubmit?.(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };


  const baseInput =
  'w-full rounded-md px-3 py-2 outline-none transition ring-1 text-sm';

const style =
  variant === 'dark'
    ? {
        label: 'text-white/90 mb-1 font-[Poppins] text-[14px]',
        input:
          baseInput +
          ' bg-white/10 text-white placeholder-white/50 ring-white/10 focus:ring-white/20 focus:ring-offset-0 focus:outline-none',
        subtle: 'text-white/60',
      }
    : {
        label: 'text-[#272963]',
        input:
          baseInput +
          ' bg-white text-[#1f2937] placeholder-gray-400 ring-gray-300 focus:ring-gray-400 focus:ring-offset-0 focus:outline-none',
        subtle: 'text-gray-600',
      };


  return (
    <form
      id={formId}
      onSubmit={handleSubmit(submit)}
      className={`mt-6 space-y-5 ${className}`}
    >
      {status === 'success' && (
        <p className="mb-2 rounded bg-green-600/80 px-3 py-2 text-sm text-white">
          Submitted successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="mb-2 rounded bg-red-600/80 px-3 py-2 text-sm text-white">
          Submission failed. Please try again.
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>
            First Name <span className="text-[#D92D20]">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 opacity-60" />
            <input
              {...register('firstName')}
              placeholder="First name"
              className={`${style.input} pl-9`}
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>
            Last Name <span className="text-[#D92D20]">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 opacity-60" />
            <input
              {...register('lastName')}
              placeholder="Last name"
              className={`${style.input} pl-9`}
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>
            Phone Number <span className="text-[#D92D20]">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="AE"
                placeholder="+971 50 000 0000"
                className={`${style.input} !pl-3`}
              />
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>Email <span className="text-[#D92D20]">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 opacity-60" />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`${style.input} pl-9`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className={`mb-1 block text-xs ${style.label}`}>
          Property Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 opacity-60" />
          <input
            {...register('location')}
            placeholder="Location"
            className={`${style.input} pl-9`}
          />
        </div>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className={`mb-1 block text-xs ${style.label}`}>Property Type</label>
    <div className="relative">
      <select
        {...register('propertyType')}
        defaultValue=""
        className="w-full h-12 rounded-md bg-white/10 text-white placeholder-white/50
                   ring-1 ring-white/10 focus:ring-white/25 outline-none pr-9 pl-4
                   appearance-none"
      >
        <option value="" disabled>Select a property type</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>Townhouse</option>
        <option>Plot</option>
        <option>Office</option>
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
  <div>
    <label className={`mb-1 block text-xs ${style.label}`}>Desired Selling Price</label>
    <div className="relative">
      <img
        src="icons/coins.svg"
        alt=""
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-70"
      />
      <input
        {...register('price')}
        type="number"
        inputMode="numeric"
        placeholder="1"
        min={1}
        className="w-full h-12 rounded-md bg-white/10 text-white placeholder-white/50
                   ring-1 ring-white/10 focus:ring-white/25 outline-none pl-10 pr-14"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold">
        AED
      </span>
    </div>
  </div>
</div>

<div>
  <label className={`mb-1 block text-xs ${style.label}`}>Upload Documents</label>

  <label
    htmlFor="files"
    className={`block rounded-md border border-dashed ${
      variant === 'dark' ? 'border-[#3F3F77] bg-[#17173B]' : 'border-gray-300 bg-white'
    } px-4 py-8 text-center transition min-h-[160px] cursor-pointer`}
  >
    <div className="flex justify-center mb-3">
      <div className="p-3 bg-[#B9BAFC]/20 rounded-lg">
        <UploadCloud className="h-5 w-5 text-[#B9BAFC]" />
      </div>
    </div>
    <p className="text-sm leading-5">
      <span className="font-semibold text-[#B9BAFC] underline-offset-2">Click to upload</span>{' '}
      <span className={variant === 'dark' ? 'text-white/70' : 'text-gray-600'}>or drag and drop</span>
    </p>
    <p className={`mt-1 text-xs ${variant === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
      SVG, PNG, JPG or GIF (max. 800 × 400 px)
    </p>
  </label>

  <input id="files" type="file" name="files" multiple className="sr-only" />
</div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="hidden"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
}
