export const setDisabledScroll = (isDisabled) => {
  return isDisabled
    ? document.body.classList.add('disableScroll')
    : document.body.classList.remove('disableScroll')
}
