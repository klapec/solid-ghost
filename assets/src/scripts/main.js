$(document).ready(function() {

  hljs.initHighlightingOnLoad();

  var width = $(window).width();

  if (width <= 900) {
    $('.animated').removeClass('fadeInLeft').addClass('fadeInDown');
  }
  
});
