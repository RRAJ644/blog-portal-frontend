import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEditor } from '../context/EditorContext'
import { Button } from '@mui/material'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'direction',
  'align',
  'link',
  'image',
  'video',
]

const Write = () => {
  const { editorContent, setEditorContent } = useEditor()
  const [content, setContent] = useState('')

  const handleSave = () => {
    setContent(editorContent)
  }

  useEffect(() => {
    const quillEditor = document.querySelector('.ql-editor')
    if (quillEditor) {
      quillEditor.classList.add(
        'prose-customParagraph',
        'max-lg:text-xl',
        'max-sm:text-lg'
      )
      // Add custom styles for headings
      const headings = quillEditor.querySelectorAll('h2')
      headings.forEach((heading) => {
        heading.classList.add(
          'prose-customHeading',
          'max-lg:text-center',
          'max-lg:text-2xl',
          'max-sm:text-xl'
        )
      })

      const headings3 = quillEditor.querySelectorAll('h3')
      headings3.forEach((heading) => {
        heading.classList.add(
          'prose-customHeading',
          'max-lg:text-center',
          'max-lg:text-2xl',
          'max-sm:text-xl'
        )
      })

      // Add custom styles for paragraphs
      const paragraphs = quillEditor.querySelectorAll('p')
      paragraphs.forEach((paragraph) => {
        paragraph.classList.add(
          'prose-customParagraph',
          'max-lg:text-xl',
          'max-sm:text-lg'
        )
      })
      // Add custom styles for list items
      const listItems = quillEditor.querySelectorAll('li')
      listItems.forEach((li) => {
        li.classList.add(
          'prose-customParagraph',
          'max-lg:text-xl',
          'max-sm:text-lg'
        )
      })

      //Add for image
      const images = quillEditor.querySelectorAll('img')
      images.forEach((img) => {
        img.classList.add('mx-auto', 'block')
      })
    }
  }, [editorContent])

  return (
    <div className='border-2'>
      <ReactQuill
        theme='snow'
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
        // className='prose'
      />
      <Button onClick={handleSave}>Save</Button>
      {content.length > 0 && <div>{content}</div>}
    </div>
  )
}

export default Write
