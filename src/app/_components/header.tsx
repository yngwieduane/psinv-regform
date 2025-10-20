'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {  
  Bars3Icon,  
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'List your property', href: '#list-your-property' },
  { name: 'Madhmoun', href: '#madhmoun' },
  { name: 'Sales', href: '#sales' },
  { name: 'Why PSI?', href: '#why-psi' },
  { name: 'Testimonials', href: '#testimonials' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    
      <header className="absolute inset-x-0 top-0 z-50 bg-black/25">
        <nav aria-label="Global" className="flex items-center justify-between p-5 lg:px-8 container mx-auto">
          <div className="flex lg:flex-1">
            <a href="#home" className="-m-1.5 p-1.5">
              <span className="sr-only">PSI</span>
              <Image
                alt="PSI" title='PSI'
                src="/PSI-Logo2.svg"
                className="h-auto w-full"
                width={200}
                height={200}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex xl:gap-x-12 lg:gap-x-9">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}  className="text-sm/6 font-semibold text-gray-400 hover:text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#register" onClick={() => setMobileMenuOpen(false)} className="text-sm/6 font-semibold text-white bg-[#E46027] py-2 px-5 rounded-full">
              Register Now
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>                
                <img
                  alt="logo" title='logo'
                  src="/PSI-Logo2.svg"
                  className="h-8 w-auto not-dark:hidden"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/30">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a onClick={() => setMobileMenuOpen(false)}
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  );
}
