//===== Animation during scrolling:

const animItems = document.querySelectorAll('.anim-item');

if ( animItems.length > 0 ) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll () {
    for (let i = 0; i < animItems.length; i++) {
      const animItem       = animItems[i],
            animItemHeight = animItem.offsetHeight,
            animItemOffset = offset(animItem).top,
            animStart      = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if ( animItemHeight > window.innerHeight ) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ( (pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight) ) {
        animItem.classList.add('anim-item--is-active');
      } else {
        if ( animItem.classList.contains('anim-hide') ) {
          animItem.classList.remove('anim-item--is-active');
        }
      }
    }
  }

  function offset (el) {
    const rect       = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  setTimeout( () => {
    animOnScroll();
  }, 300);
}
