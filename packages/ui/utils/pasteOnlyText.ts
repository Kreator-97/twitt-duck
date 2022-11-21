export const pasteOnlyText = (element: HTMLDivElement) => {
  // const onPaste = () => {
  setTimeout(() => {
    if( element ) {
      const innerText = element.innerText
      element.innerText = innerText
    }
  }, 0)
  // }
}
