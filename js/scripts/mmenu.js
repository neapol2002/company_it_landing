//===== Mobile Navigation:

// Hamburger toggle:
$('.hamburger').on('click', function (event) {
  event.preventDefault();

  $('.hamburger, .header__menu, .header').toggleClass('is-active');
  $('body').toggleClass('of-hidden');
});

// Hide the menu and return the standard view of the hamburger:
$('.header__list-link, .button').on('click', function (event) {
  event.preventDefault();

  $('.hamburger, .header__menu, .header').removeClass('is-active');
  $('body').removeClass('of-hidden');
});

// Resetting scroll for menu:
$('.hamburger, .header__list-link, .button').on('click', function (event) {
  event.preventDefault();

  $('.header__menu').delay(350).queue(function (reset_scroll) {
    $(this).scrollTop(0);
    reset_scroll();
  });
});

// Removing classes for menu if window resize:
$(window).on('resize', function () {
  var width = $(document).width();

  if (width > 767) {
    $('.hamburger, .header__menu, .header').removeClass('is-active');
    $('body').removeClass('of-hidden');
  }
});
