// applyCustomClasses.js

export const applyCustomClasses = (selector, classNames) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element) => {
    classNames.forEach((className) => {
      element.classList.add(className)
    })
  })
}

export const applyEditorStyles = () => {
  applyCustomClasses('.ql-editor', [])
  applyCustomClasses('h2, h3', [
    'prose-customHeading',
    'max-lg:text-center',
    'max-lg:text-2xl',
    'max-sm:text-xl',
  ])
  applyCustomClasses('p, li', [
    'prose-customParagraph',
    'max-lg:text-xl',
    'max-sm:text-lg',
  ])
  applyCustomClasses('ul', [
    'prose-customParagraph',
    'max-lg:text-xl',
    'max-sm:text-lg',
    'space-y-4',
    'list-disc',
    'pl-10',
    'max-sm:pl-6',
    'mb-4',
  ])
  applyCustomClasses('ol', [
    'prose-customParagraph',
    'max-lg:text-xl',
    'max-sm:text-lg',
    'space-y-4',
    'pl-10',
    'max-sm:pl-6',
    'mb-4',
  ])
  applyCustomClasses('img', ['mx-auto', 'block'])
}
