//===== reasons__modal:

$('.reasons__video, .reasons__watch').on('click', function (event) {
  event.preventDefault();

  $('.reasons__modal').fadeIn(600).css('display', 'flex');
  $('body').addClass('no-scroll');

  $('.reasons__modal-iframe')[0].src += '?autoplay=1';
});

$('.reasons__modal').on('click', function (event) {
  event.preventDefault();

  $('.reasons__modal').fadeOut(600);
  $('body').removeClass('no-scroll');
  $('.reasons__modal-iframe').attr('src', 'https://www.youtube.com/embed/bbcsz8sb7Cg');
});

$('.reasons__modal-video').on('click', function (event) {
  event.stopPropagation();
});
