'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { usePathname } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';
import { User, Mail, MapPin } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(7, { message: 'Invalid phone number' }),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  price: z
    .string()
    .optional()
    .refine((v) => !v || (!Number.isNaN(Number(v)) && Number(v) > 0), {
      message: 'Price must be greater than 0',
    }),
});

type FormData = z.infer<typeof schema>;

type PropertyFormProps = {
  formId?: string;
  variant?: 'dark' | 'light' | 'footer';
  className?: string;
  onLoadingChange?: (loading: boolean) => void;
};
const UNIT_TYPE_MAP: Record<string, number> = {
  Apartment: 19,
  Villa: 20,
  Townhouse: 131090,
  Plot: 47390,
  Office: 24,
};

export default function PropertyForm({
  formId = 'list-property-form',
  variant = 'dark',
  className = '',
  onLoadingChange,
}: PropertyFormProps) {
  const isFooter = variant === 'footer';
  const isDark = variant === 'dark' || isFooter;
  const pathname = usePathname();
  const ALLOWED_MIME = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
  const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
  const MAX_W = 800;
  const MAX_H = 400;
  const locale = (pathname?.split('/')?.[1] || 'en') as string;
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState<null | 'Success' | 'Error'>(null);
  const [files, setFiles] = useState<File[]>([]);
const [fileErrors, setFileErrors] = useState<string[]>([]);


  const setLoading = (v: boolean) => {
    setIsLoading(v);
    onLoadingChange?.(v);
  };

  const filesInputId = `${formId}-files`;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      propertyType: '',
      price: '',
    },
  });

function checkImageDimensions(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const ok = img.width <= MAX_W && img.height <= MAX_H;
        URL.revokeObjectURL(url);
        ok
          ? resolve()
          : reject(`“${file.name}” is ${img.width}×${img.height}. Max ${MAX_W}×${MAX_H}px.`);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(`Could not read “${file.name}”.`);
      };
      img.src = url;
    });
  }

  async function validateOne(file: File): Promise<string | null> {
    if (!ALLOWED_MIME.includes(file.type))
      return `“${file.name}” must be SVG, PNG, JPG or GIF.`;

    if (file.size > MAX_BYTES)
      return `“${file.name}” is too large (${Math.ceil(file.size / 1024)} KB). Max 2048 KB.`;

    if (file.type !== 'image/svg+xml') {
      try {
        await checkImageDimensions(file);
      } catch (e) {
        return String(e);
      }
    }
    return null;
  }
 const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const errs: string[] = [];
    const accepted: File[] = [];

    for (const f of picked) {
      const err = await validateOne(f);
      if (err) errs.push(err);
      else accepted.push(f);
    }

    setFileErrors(errs);
    setFiles(accepted);
  };
const baseInput =
    'w-full rounded-md px-3 py-2 outline-none transition ring-1 text-sm';

  const style = isDark
    ? {
        label: 'text-white/90 mb-1 font-[Poppins] text-[14px]',
        input:
          baseInput +
          ' bg-white/10 text-white placeholder-white/50 ring-white/10 focus:ring-white/20',
        select:
          'w-full h-12 rounded-md bg-white/10 text-white ring-1 ring-white/10 focus:ring-white/25 outline-none pr-9 pl-4 appearance-none',
      }
    : {
        label: 'text-[#272963]',
        input:
          baseInput +
          ' bg-white text-[#1f2937] placeholder-gray-400 ring-gray-300 focus:ring-gray-400',
        select:
          'w-full h-12 rounded-md bg-white text-[#1f2937] ring-1 ring-gray-300 focus:ring-gray-400 outline-none pr-9 pl-4 appearance-none',
      };
  const onSubmit = async (data: FormData) => {
    if (isLoading) return;
    if (fileErrors.length) {
    document.getElementById(filesInputId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
    setLoading(true);
    sendGTMEvent({ event: 'SellPropertyInquiry', value: '1' });
    setPostId(null);

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source') || '';
    const currentUrl = window.location.href;
    const selectedType = (data.propertyType || '').trim();
    const unitType = UNIT_TYPE_MAP[selectedType] ?? 19;

    let mediaType = '129475';
    let mediaName = '165233';
    let methodOfContact = '115747';
    let propertyCampaignId = '';

    switch (source) {
      case 'newsletter':
        mediaType = '166277';
        mediaName = '166071';
        methodOfContact = 'MethodOfContactVal';
        break;
      case 'sms':
        mediaType = '129474';
        mediaName = '165366';
        methodOfContact = 'MethodOfContactVal';
        break;
      case 'Google':
      case 'google':
        mediaType = '165269';
        mediaName = '128455';
        methodOfContact = 'MethodOfContactVal';
        break;
      default:
        break;
    }
    type UploadedFile = { name: string; path: string; fullPath: string };
    let uploaded: UploadedFile[] = [];
    let uploadedFileNames: string[] = [];

    try {
      if (files.length) {
        const fd = new FormData();
        files.forEach((f) => fd.append('files', f));

        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const json = await res.json();
                    uploaded = Array.isArray(json?.files)
            ? (json.files as UploadedFile[])
            : [];
          uploadedFileNames = uploaded.length
            ? uploaded.map((f) => f.name)
            : files.map((f) => f.name);
        } else {
          uploadedFileNames = files.map((f) => f.name);
        }
      }
    } catch {
      uploadedFileNames = files.map((f) => f.name);

    }


    const attachmentPaths = uploaded.map((f) => f.path).join(',');
    const uploadedLinksHtml = uploaded.length
      ? uploaded.map((f) => `<a href="${f.fullPath}">${f.name}</a>`).join(', ')
      : 'None';
    const uploadedLine = uploadedFileNames.join(', ') || 'None';
    const remarks = `
      Client Name: ${data.firstName} ${data.lastName} </br>
      Email: ${data.email} </br>
      Phone: ${data.phone} </br>
      Location: ${data.location || '-'} </br>
      Type: ${data.propertyType || '-'} </br>
      Price: ${data.price || '-'} </br>
      Uploaded: ${uploadedLine} </br>
      URL: ${currentUrl}
    `;

    const emailBody = `
      <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;border:1px solid #ccc">
        <thead>
          <tr style="background:#001f3f;color:#fff">
            <th colspan="2" style="padding:10px;text-align:left">Sell Property Inquiry</th>
          </tr>
          <tr style="background:#ff6600;color:#fff">
            <th colspan="2" style="padding:8px;text-align:left">Client Info</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:8px;border:1px solid #ccc;width:30%"><b>Name</b></td><td style="padding:8px;border:1px solid #ccc">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Email</b></td><td style="padding:8px;border:1px solid #ccc">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Phone</b></td><td style="padding:8px;border:1px solid #ccc">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Location</b></td><td style="padding:8px;border:1px solid #ccc">${data.location || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Property Type</b></td><td style="padding:8px;border:1px solid #ccc">${data.propertyType || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Desired Price (AED)</b></td><td style="padding:8px;border:1px solid #ccc">${data.price || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>Uploaded Files</b></td><td style="padding:8px;border:1px solid #ccc">${uploadedLinksHtml}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ccc"><b>URL</b></td><td style="padding:8px;border:1px solid #ccc">${currentUrl}</td></tr>
        </tbody>
      </table>
    `;

    const formDataToSend = {
      TitleID: '129932',
      FirstName: data.firstName,
      FamilyName: data.lastName,
      MobileCountryCode: '',
      MobileAreaCode: '',
      MobilePhone: data.phone,
      TelephoneCountryCode: '',
      TelephoneAreaCode: '',
      Telephone: '',
      Email: data.email,
      NationalityID: '65946',
      LanguageID: '115915',
      CompanyID: '',
      Remarks: remarks,
      RequirementType: '91212',
      ContactType: '3',
      CountryID: '65946',
      StateID: '91823',
      CityID: '91823',
      DistrictID: '102625',
      CommunityID: '',
      PropertyID: '',
      UnitType: String(unitType),
      MethodOfContact: methodOfContact,
      MediaType: mediaType,
      MediaName: mediaName,
      DeactivateNotification: '',
      Bedroom: '21935',
      Bathroom: '21935',
      Budget: data.price || '100000',
      Budget2: data.price || '100000',
      AreaFrom: '',
      AreaTo: '',
      RequirementCountryID: '65946',
      ExistingClient: '',
      CompaignSource: '',
      CompaignMedium: '',
      Company: '',
      NumberOfEmployee: '',
      LeadStageId: '',
      LeadRatingId: '',
      UnitId: '',
      ReferredToID: '3458',
      ReferredByID: '3458',
      IsBulkUpload: '',
      ActivityAssignedTo: '3458',
      ActivityDate: '',
      ActivityTypeId: '167234',
      ActivitySubject: 'Email Inquiry Copy',
      ActivityRemarks: remarks,
      IsForAutoRotation: '',
      PropertyCampaignId: propertyCampaignId,
      contactClassId: '',
    };

  try {
  const response = await fetch(
    `https://api.portal.psi-crm.com/leads?APIKEY=${process.env.NEXT_PUBLIC_PSI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend),
    }
  );
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setPostId('Success');
        reset();
        setFiles([]);

        requestAnimationFrame(() => {
          document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        setTimeout(() => setPostId(null), 6000);
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            body: emailBody,
            receiver: 'callcenter@psinv.net',
            subject: `Sell Property Inquiry - ${data.firstName} ${data.lastName}`,
            filename: attachmentPaths,
            filedata: '',
          }),
        }).catch(() => {});

        return;
      }

      console.error('CRM error:', result);
      setPostId('Error');
      alert('Error submitting the form.');
    } catch (err) {
      console.error('Error:', err);
      setPostId('Error');
    } finally {
       setLoading(false);
    }
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className={`mt-6 space-y-5 no-scrollbar ${className}`}
    >

      {postId === 'Success' && (
        <div className="p-3 rounded bg-green-500 text-white text-center font-medium">
          Thank you! Your property details have been submitted successfully.
        </div>
      )}

      {postId === 'Error' && (
        <div className="p-3 rounded bg-red-500 text-white text-center font-medium">
          Something went wrong. Please try again later.
        </div>
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
          <p className="mt-1 text-xs text-red-400 min-h-[18px]">
            {errors.firstName?.message}
          </p>
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
          <p className="mt-1 text-xs text-red-400 min-h-[18px]">
            {errors.lastName?.message}
          </p>
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
          <p className="mt-1 text-xs text-red-400 min-h-[18px]">
            {errors.phone?.message}
          </p>
        </div>
        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>
            Email <span className="text-[#D92D20]">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 opacity-60" />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`${style.input} pl-9`}
            />
          </div>
          <p className="mt-1 text-xs text-red-400 min-h-[18px]">
            {errors.email?.message}
          </p>
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
            placeholder="Abu Dhabi"
            className={`${style.input} pl-9`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className={`mb-1 block text-xs ${style.label}`}>Property Type</label>
<select
  {...register('propertyType')}
  defaultValue=""
  className={`${style.select} w-full appearance-none pr-8`}
>
  <option value="" disabled>Select a property type</option>
  <option value="Apartment">Apartment</option>
  <option value="Villa">Villa</option>
  <option value="Townhouse">Townhouse</option>
  <option value="Plot">Plot</option>
  <option value="Office">Office</option>
</select>
          <span
            className={[
              'pointer-events-none absolute',
              'right-3 top-1/2 -translate-y-1/2',
              variant === 'dark' ? 'text-[#E9ECEF]' : 'text-gray-400',
            ].join(' ')}
          >
            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" aria-hidden="true">
              <path
                d="M1 1l4 3 4-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>          
        </div>
        <div>
          <label className={`mb-1 block text-xs ${style.label}`}>
            Desired Selling Price
          </label>
          <div className="relative">
            <img
              src="icons/coins.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-70"
            />
            <input
              {...register('price')}
              type="text"
              placeholder="1"
              className={`${style.input} pl-10 pr-14 h-12`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold">
              AED
            </span>
          </div>
          <p className="mt-1 text-xs text-red-400 min-h-[18px]">
            {errors.price?.message}
          </p>
        </div>
      </div>
<div>
  <label className={`mb-1 block text-xs ${style.label}`}>
    Upload Documents
  </label>

  <label
    htmlFor={filesInputId}
    className={[
      'block rounded-md border border-dashed px-4 py-8 text-center transition min-h-[160px] cursor-pointer',
      variant === 'dark' ? 'border-[#3F3F77]' : 'border-gray-300',
    ].join(' ')}
  >
    <div className="flex justify-center mb-3">
      {variant === 'dark' ? (
        <div className="rounded-lg bg-[#6466B5] p-3">
          <img
            src="icons/featured-icon.svg"
            alt=""
            className="h-10 w-10"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="p-2 bg-[#ffff] rounded-lg">
          <img
            src="/featured-icon-footer.svg"
            alt=""
            className="h-10 w-10"
            aria-hidden="true"
          />
        </div>
      )}
    </div>

    <p
      className={`text-sm leading-5 ${
        variant === 'dark' ? 'text-white/90' : 'text-white'
      }`}
    >
      <span
        className={
          variant === 'dark'
            ? 'font-semibold text-[#B9BAFC]'
            : 'font-semibold text-[#ffff]'
        }
      >
        Click to upload
      </span>{' '}
      or drag and drop
    </p>

    <p
      className={`text-xs mt-2 ${
        variant === 'dark' ? 'text-white/60' : 'text-white-500'
      }`}
    >
      SVG, PNG, JPG or GIF (max. 800×400px)
    </p>
{!!fileErrors.length && (
  <ul className="mt-2 text-xs text-red-400 space-y-1">
    {fileErrors.map((msg, i) => (
      <li key={i}>• {msg}</li>
    ))}
  </ul>
)}
  </label>

<input
  id={filesInputId}
  name="files"
  type="file"
  multiple
  accept="image/png,image/jpeg,image/gif,image/svg+xml"
  className="sr-only"
  onChange={handleFilesChange}
/>
</div>


    </form>
  );
}
