(function($) {

  $.fn.smoothScroll = function() {
  
    return this.on('click', function() {
      var hash = $(this).attr('href');
      var dest = $(hash).offset();
      
      $('html:not(:animated),body:not(:animated)').animate({scrollTop: dest.top, scrollLeft: dest.left}, 700, function() {
        window.location.hash = hash;
      });
    
      return false;
    });
    
  };

})(jQuery);