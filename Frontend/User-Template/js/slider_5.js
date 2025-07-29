var revapi6,
  tpj = jQuery;

tpj(document).ready(function () {
  if (tpj('#rev_slider_6_1').revolution == undefined) {
    revslider_showDoubleJqueryError('#rev_slider_6_1');
  } else {
    revapi6 = tpj('#rev_slider_6_1')
      .show()
      .revolution({
        sliderType: 'standard',
        jsFileLocation:
          '//localhost/wordpress/wp-content/plugins/revslider/public/assets/js/',
        sliderLayout: 'fullscreen',
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
            style: 'uranus',
            hide_onleave: false,
            direction: 'vertical',
            h_align: 'left',
            v_align: 'center',
            h_offset: 30,
            v_offset: 0,
            space: 15,
            tmp: '<span class="tp-bullet-inner"></span>',
          },
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1400, 1024, 778, 480],
        gridheight: [720, 600, 500, 400],
        lazyType: 'none',
        shadow: 0,
        spinner: 'spinner0',
        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: 'off',
        autoHeight: 'off',
        fullScreenAutoWidth: 'off',
        fullScreenAlignForce: 'off',
        fullScreenOffsetContainer: '',
        fullScreenOffset: '',
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
