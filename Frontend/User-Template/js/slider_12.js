var revapi11,
  tpj = jQuery;

tpj(document).ready(function () {
  if (tpj('#rev_slider_11_1').revolution == undefined) {
    revslider_showDoubleJqueryError('#rev_slider_11_1');
  } else {
    revapi11 = tpj('#rev_slider_11_1')
      .show()
      .revolution({
        sliderType: 'standard',
        jsFileLocation:
          '//localhost/wordpress/wp-content/plugins/revslider/public/assets/js/',
        sliderLayout: 'fullscreen',
        dottedOverlay: 'none',
        delay: 9000,
        navigation: {
          onHoverStop: 'off',
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
