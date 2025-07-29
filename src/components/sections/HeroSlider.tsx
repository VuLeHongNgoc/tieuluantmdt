'use client';

import { useEffect } from 'react';

// Extend window interface for jQuery và Revolution Slider
declare global {
  interface Window {
    jQuery: any;
  }
}

export default function HeroSlider() {
  useEffect(() => {
    // Initialize Revolution Slider sau khi component mount
    if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.revolution) {
      window.jQuery('.rev_slider').revolution({
        sliderType: 'standard',
        jsFileLocation: '/js/',
        sliderLayout: 'fullscreen', 
        dottedOverlay: 'none',
        delay: 9000,
        navigation: {
          keyboardNavigation: 'off',
          keyboard_direction: 'horizontal',
          mouseScrollNavigation: 'off',
          onHoverStop: 'on',
          touch: {
            touchenabled: 'on',
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: 'horizontal',
            drag_block_vertical: false
          },
          arrows: {
            style: 'persephone',
            enable: true,
            hide_onmobile: false,
            hide_onleave: false,
            tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
            left: {
              h_align: 'left',
              v_align: 'center',
              h_offset: 20,
              v_offset: 0
            },
            right: {
              h_align: 'right',
              v_align: 'center',
              h_offset: 20,
              v_offset: 0
            }
          },
          bullets: {
            enable: true,
            hide_onmobile: false,
            style: 'persephone',
            hide_onleave: false,
            direction: 'horizontal',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: ''
          }
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [600, 550, 500, 400],
        lazyType: 'none',
        parallax: {
          type: 'mouse',
          origo: 'slidercenter',
          speed: 2000,
          levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50]
        },
        shadow: 0,
        spinner: 'off',
        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: 'off',
        autoHeight: 'off',
        hideThumbsOnMobile: 'off',
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: 'off',
          nextSlideOnWindowFocus: 'off',
          disableFocusListener: false
        }
      });
    }
  }, []);

  return (
    <div id="homepage-6">
      <div
        className="rev_slider_wrapper fullscreen-container"
        data-alias="home-6"
        data-source="gallery"
        style={{
          background: 'transparent',
          padding: 0,
          margin: '0px auto',
          marginTop: 0,
          marginBottom: 0
        }}
      >
        <div
          id="rev_slider_4_1"
          className="rev_slider fullscreenbanner"
          style={{ display: 'none' }}
          data-version="5.4.5"
        >
          <ul>
            {/* Slide 1 */}
            <li
              data-index="rs-22"
              data-transition="fade"
              data-slotamount="default"
              data-hideafterloop="0"
              data-hideslideonmobile="off"
              data-easein="default"
              data-easeout="default"
              data-masterspeed="300"
              data-thumb="/images/home-slider/slide-6-1.jpg"
              data-rotate="0"
              data-saveperformance="off"
              data-title="Slide"
              data-description=""
            >
              {/* Slide Background */}
              <img
                src="/images/home-slider/slide-6-1.jpg"
                alt=""
                data-bgposition="center center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                className="rev-slidebg"
                data-no-retina=""
              />
              
              {/* Text Layer 1 */}
              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 7,
                  fontSize: '60px',
                  lineHeight: '60px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  letterSpacing: '0px',
                  fontFamily: 'Montserrat'
                }}
              >
                THE NEW
              </div>

              {/* Text Layer 2 */}
              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 8,
                  fontSize: '60px',
                  lineHeight: '60px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  letterSpacing: '0px',
                  fontFamily: 'Montserrat'
                }}
              >
                STANDARD
              </div>

              {/* Description */}
              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 9,
                  fontSize: '16px',
                  lineHeight: '26px',
                  fontWeight: 400,
                  color: '#888888',
                  letterSpacing: '0px',
                  fontFamily: 'Nunito Sans'
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                rutrum congue ligula eget tempor.
              </div>

              {/* Shop Now Button */}
              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 10,
                  fontSize: '14px',
                  lineHeight: '14px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,1)',
                  letterSpacing: '1px',
                  fontFamily: 'Montserrat',
                  backgroundColor: 'rgba(26,26,26,1)',
                  border: '2px solid rgba(26,26,26,1)',
                  textTransform: 'uppercase',
                  padding: '15px 30px',
                  cursor: 'pointer'
                }}
              >
                SHOP NOW
              </div>
            </li>

            {/* Slide 2 */}
            <li
              data-index="rs-23"
              data-transition="fade"
              data-slotamount="default"
              data-hideafterloop="0"
              data-hideslideonmobile="off"
              data-easein="default"
              data-easeout="default"
              data-masterspeed="300"
              data-thumb="/images/home-slider/slide-6-2.jpg"
              data-rotate="0"
              data-saveperformance="off"
              data-title="Slide"
              data-description=""
            >
              <img
                src="/images/home-slider/slide-6-2.jpg"
                alt=""
                data-bgposition="center center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                className="rev-slidebg"
                data-no-retina=""
              />

              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 7,
                  fontSize: '60px',
                  lineHeight: '60px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  letterSpacing: '0px',
                  fontFamily: 'Montserrat',
                  textAlign: 'right'
                }}
              >
                TRENDY
              </div>

              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 8,
                  fontSize: '60px',
                  lineHeight: '60px', 
                  fontWeight: 600,
                  color: '#1a1a1a',
                  letterSpacing: '0px',
                  fontFamily: 'Montserrat',
                  textAlign: 'right'
                }}
              >
                COLLECTION
              </div>

              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 9,
                  fontSize: '16px',
                  lineHeight: '26px',
                  fontWeight: 400,
                  color: '#888888',
                  letterSpacing: '0px',
                  fontFamily: 'Nunito Sans',
                  textAlign: 'right'
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                rutrum congue ligula eget tempor.
              </div>

              <div
                className="tp-caption tp-resizeme"
                style={{
                  zIndex: 10,
                  fontSize: '14px',
                  lineHeight: '14px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,1)',
                  letterSpacing: '1px',
                  fontFamily: 'Montserrat',
                  backgroundColor: 'rgba(26,26,26,1)',
                  border: '2px solid rgba(26,26,26,1)',
                  textTransform: 'uppercase',
                  padding: '15px 30px',
                  cursor: 'pointer'
                }}
              >
                SHOP NOW
              </div>
            </li>
          </ul>
          <div
            className="tp-bannertimer tp-bottom"
            style={{ visibility: 'hidden' as const }}
          ></div>
        </div>
      </div>
    </div>
  );
}
