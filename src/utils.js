export function fixIOSPageScrolling() {
  document.querySelectorAll('.page__content').forEach(element => {
    element.classList.add('page__content__fix');
    setTimeout(() => {
      element.classList.remove('page__content__fix');
    }, 100);
  });
}
