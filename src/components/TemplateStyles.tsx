'use client';

import { useEffect } from 'react';

interface TemplateStylesProps {
  loadFontAwesome?: boolean;
  loadMainStyles?: boolean;
  loadSliderStyles?: boolean;
  sliderType?: string;
  loadHeaderStyles?: boolean;
  headerType?: string;
}

export default function TemplateStyles({
  loadFontAwesome = true,
  loadMainStyles = true,
  loadSliderStyles = false,
  sliderType = 'slider-1',
  loadHeaderStyles = false,
  headerType = 'default'
}: TemplateStylesProps) {
  useEffect(() => {
    // Load Font Awesome CSS
    if (loadFontAwesome) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = '/fonts/font-awesome/css/font-awesome.min.css';
      fontAwesome.id = 'font-awesome-css';
      
      if (!document.getElementById('font-awesome-css')) {
        document.head.appendChild(fontAwesome);
      }
    }

    // Load Exist Custom Font
    const existFont = document.createElement('link');
    existFont.rel = 'stylesheet';
    existFont.href = `/fonts/exist-font/style.css?v=${Date.now()}`;
    existFont.id = 'exist-font-css';
    
    if (!document.getElementById('exist-font-css')) {
      document.head.appendChild(existFont);
    }

    // Load Main Template Styles
    if (loadMainStyles) {
      const mainStyles = document.createElement('link');
      mainStyles.rel = 'stylesheet';
      mainStyles.href = '/css/main.css';
      mainStyles.id = 'template-main-css';
      
      if (!document.getElementById('template-main-css')) {
        document.head.appendChild(mainStyles);
      }

      const additionalStyles = document.createElement('link');
      additionalStyles.rel = 'stylesheet';
      additionalStyles.href = '/css/style.css';
      additionalStyles.id = 'template-style-css';
      
      if (!document.getElementById('template-style-css')) {
        document.head.appendChild(additionalStyles);
      }
    }

    // Load Slider Styles
    if (loadSliderStyles && sliderType) {
      const sliderStyles = document.createElement('link');
      sliderStyles.rel = 'stylesheet';
      sliderStyles.href = `/css/sliders/${sliderType}.css`;
      sliderStyles.id = `${sliderType}-css`;
      
      if (!document.getElementById(`${sliderType}-css`)) {
        document.head.appendChild(sliderStyles);
      }
    }

    // Load Header Styles
    if (loadHeaderStyles && headerType) {
      const headerStyles = document.createElement('link');
      headerStyles.rel = 'stylesheet';
      headerStyles.href = `/css/header-${headerType}.css`;
      headerStyles.id = `header-${headerType}-css`;
      
      if (!document.getElementById(`header-${headerType}-css`)) {
        document.head.appendChild(headerStyles);
      }
    }

    // Load Google Fonts
    const montserrat = document.createElement('link');
    montserrat.rel = 'stylesheet';
    montserrat.href = 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700';
    montserrat.id = 'montserrat-font';
    
    if (!document.getElementById('montserrat-font')) {
      document.head.appendChild(montserrat);
    }

    const nunitoSans = document.createElement('link');
    nunitoSans.rel = 'stylesheet';
    nunitoSans.href = 'https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700,900';
    nunitoSans.id = 'nunito-sans-font';
    
    if (!document.getElementById('nunito-sans-font')) {
      document.head.appendChild(nunitoSans);
    }

    // Cleanup function
    return () => {
      // Optionally remove styles on unmount
      // This might not be needed in most cases
    };
  }, [loadFontAwesome, loadMainStyles, loadSliderStyles, sliderType, loadHeaderStyles, headerType]);

  return null; // This component doesn't render anything
}
