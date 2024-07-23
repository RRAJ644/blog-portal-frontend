import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEditor } from '../context/EditorContext'
import { Button, Tabs, Tab } from '@mui/material'
import Preview from './Preview'

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
  const [tabIndex, setTabIndex] = useState(0)

  const handleSave = () => {
    setContent(editorContent)
  }

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex)
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
    <section className='flex flex-col items-center h-screen'>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        className='mb-10 border-2 border-gray-500 w-fit text-black px-10 rounded-full '
      >
        <Tab label='Write' />
        <Tab label='Preview' />
      </Tabs>

      {tabIndex === 0 && (
        <div className='border-2 border-gray-400 w-full'>
          <ReactQuill
            theme='snow'
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
          />

          {editorContent.length > 0 &&
            editorContent !==
              '<p class="prose-customParagraph max-lg:text-xl max-sm:text-lg"><br></p>' && (
              <Button onClick={() => handleSave()}>Save</Button>
            )}
        </div>
      )}

      {tabIndex === 1 && (
        <div className='border-2 border-gray-400 flex-1 w-full'>
          {content?.trim()?.length > 0 ? (
            <Preview content={content} />
          ) : (
            <p className='text-gray-500'>
              Write in editor and save to preview...{' '}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

export default Write
