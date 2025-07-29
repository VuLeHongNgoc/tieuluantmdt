var revapi5,
  tpj = jQuery;

tpj(document).ready(function () {
  if (tpj('#rev_slider_5_1').revolution == undefined) {
    revslider_showDoubleJqueryError('#rev_slider_5_1');
  } else {
    revapi5 = tpj('#rev_slider_5_1')
      .show()
      .revolution({
        sliderType: 'standard',
        jsFileLocation:
          '//localhost/wordpress/wp-content/plugins/revslider/public/assets/js/',
        sliderLayout: 'auto',
        dottedOverlay: 'none',
        delay: 9000,
        navigation: {
          keyboardNavigation: 'off',
          keyboard_direction: 'horizontal',
          mouseScrollNavigation: 'off',
          mouseScrollReverse: 'default',
          onHoverStop: 'off',
          bullets: {
            enable: true,
            hide_onmobile: false,
            style: 'custom-nav',
            hide_onleave: false,
            direction: 'horizontal',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
          },
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1170, 1024, 778, 480],
        gridheight: [720, 600, 500, 400],
        lazyType: 'none',
        shadow: 0,
        spinner: 'spinner0',
        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: 'off',
        autoHeight: 'off',
        disableProgressBar: 'on',
        hideThumbsOnMobile: 'off',
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: 'off',
          nextSlideOnWindowFocus: 'off',
          disableFocusListener: false,
        },
      });
  }
}); /*ready*/
