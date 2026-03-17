/**
 * Vendor library utilities for Charitics theme
 */

import Swiper from 'swiper/bundle'
import * as bootstrap from 'bootstrap'

// Types for WOW.js (loaded as global script)
declare global {
  interface Window { WOW: any }
}

export const initSwiper = (selector: string, options: any = {}) => {
  const defaultOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
    ...options,
  }
  return new Swiper(selector, defaultOptions)
}

export const initWOW = () => {
  if (typeof window !== 'undefined' && window.WOW) {
    const wow = new window.WOW({ boxClass: 'wow', animateClass: 'animate__animated', offset: 0, mobile: true, live: true })
    wow.init()
    return wow
  }
  return null
}

export const initBootstrap = () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el))
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => new bootstrap.Popover(el))
}

export const loadVendorScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') { resolve(); return }
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

export const loadVendorScripts = async (scripts: string[]): Promise<void> => {
  for (const script of scripts) await loadVendorScript(script)
}

export const initVendorLibraries = async () => {
  try {
    await loadVendorScript('/assets/vendor/animate-wow/wow.min.js')
    initBootstrap()
    initWOW()
    console.log('Vendor libraries initialized successfully')
  } catch (error) {
    console.error('Error initializing vendor libraries:', error)
  }
}

export const cleanupVendorLibraries = () => {}

export const isVendorLibraryLoaded = (libraryName: string): boolean => {
  switch (libraryName) {
    case 'swiper': return true
    case 'bootstrap': return true
    case 'wow': return typeof window !== 'undefined' && !!window.WOW
    default: return false
  }
}
