var revapi7,
  tpj = jQuery;

tpj(document).ready(function () {
  if (tpj('#rev_slider_7_1').revolution == undefined) {
    revslider_showDoubleJqueryError('#rev_slider_7_1');
  } else {
    revapi7 = tpj('#rev_slider_7_1')
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
          arrows: {
            style: 'custom-nav',
            enable: true,
            hide_onmobile: false,
            hide_onleave: false,
            tmp: '',
            left: {
              h_align: 'left',
              v_align: 'bottom',
              h_offset: 20,
              v_offset: 55,
            },
            right: {
              h_align: 'right',
              v_align: 'bottom',
              h_offset: 20,
              v_offset: 55,
            },
          },
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1170, 1024, 778, 480],
        gridheight: [868, 768, 960, 720],
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
