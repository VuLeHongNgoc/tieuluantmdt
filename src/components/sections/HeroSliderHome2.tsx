'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/images/home-slider/home-2/home-2-1.jpg',
    title: 'EXPLORE',
    subtitle: 'NEW OUTFITS',
    buttonText: 'Shop Now',
    buttonLink: '/shop'
  },
  {
    id: 2,
    image: '/images/home-slider/home-2/home-2-3.jpg',
    title: 'JACKET',
    subtitle: 'FOR MAN',
    buttonText: 'Shop Now',
    buttonLink: '/shop'
  }
];

export function HeroSliderHome2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      id="hero-slider-home-2" 
      className="relative w-full h-[720px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-10" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {/* Main Title */}
              <h1 
                className={`text-6xl md:text-8xl lg:text-[140px] font-extrabold text-[#867462] mb-4 transform transition-all duration-1500 ${
                  index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-full opacity-0'
                }`}
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  letterSpacing: '0px',
                  lineHeight: '1'
                }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <h2 
                className={`text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#867462] mb-8 transform transition-all duration-1500 delay-200 ${
                  index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }`}
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  letterSpacing: '0px'
                }}
              >
                {slide.subtitle}
              </h2>

              {/* Shop Now Button */}
              <button 
                className={`
                  px-11 py-3 border border-[#867462] text-[#867462] text-xs font-bold uppercase
                  rounded-full hover:bg-[#ca2028] hover:text-white hover:border-[#ca2028]
                  transition-all duration-500 transform ${
                    index === currentSlide
                      ? '-translate-x-0 opacity-100'
                      : '-translate-x-full opacity-0'
                  }
                `}
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  letterSpacing: '0px',
                  lineHeight: '20px',
                  transitionDelay: index === currentSlide ? '1000ms' : '0ms'
                }}
                onClick={() => window.location.href = slide.buttonLink}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Timer Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-[#ca2028] transition-all duration-75 ease-linear z-10"
        style={{
          width: isAutoPlaying ? '100%' : '0%',
          animation: isAutoPlaying ? 'timer 5000ms linear infinite' : 'none'
        }}
      />

      <style jsx>{`
        @keyframes timer {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
