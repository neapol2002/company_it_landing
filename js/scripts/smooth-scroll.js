//===== Smooth scroll:
$('a[href^="#"]:not([href="#"])').on('click', function(event) {
  event.preventDefault();

  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 350);
});
