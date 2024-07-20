// import React, { useState } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css' // Import styles

// // Custom toolbar options
// const toolbarOptions = {
//   toolbar: [
//     [{ 'font': ['sans-serif', 'serif', 'monospace'] }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ align: [] }],
//     ['link', 'image'],
//     [{ color: [] }, { background: [] }],
//     ['clean'],
//   ],
// }

// const Write = () => {
//   const [value, setValue] = useState('')

//   return (
//     <ReactQuill
//       theme='snow'
//       value={value}
//       onChange={setValue}
//       modules={toolbarOptions}
//       placeholder='Write something amazing...'
//     />
//   )
// }

// export default Write


import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEditor } from '../context/EditorContext'

// Custom toolbar options
const toolbarOptions = {
  toolbar: [
    [{ 'font': ['sans-serif', 'serif', 'monospace'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ align: [] }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
}

const Write = () => {
  const { editorContent, setEditorContent } = useEditor()

  return (
    <ReactQuill
      theme='snow'
      value={editorContent}
      onChange={setEditorContent}
      modules={toolbarOptions}
      placeholder='Write something amazing...'
    />
  )
}

export default Write
