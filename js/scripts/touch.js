//===== Touch event check:
if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
  document.body.classList.add('touch');
} else {
  document.body.classList.add('no-touch');
}
