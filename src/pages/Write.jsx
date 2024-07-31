// import { useState, useEffect } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { useEditor } from '../context/EditorContext'
// import { Button, Tabs, Tab, TextField } from '@mui/material'
// import Preview from './Preview'
// import axiosInstance from '../utils/axiosInstance'
// import { useLocation } from 'react-router-dom'

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     [{ font: [] }, { size: [] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ color: [] }, { background: [] }],
//     [{ script: 'sub' }, { script: 'super' }],
//     ['blockquote', 'code-block'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ indent: '-1' }, { indent: '+1' }],
//     [{ direction: 'rtl' }],
//     [{ align: [] }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
// }

// const formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'color',
//   'background',
//   'script',
//   'blockquote',
//   'code-block',
//   'list',
//   'bullet',
//   'indent',
//   'direction',
//   'align',
//   'link',
//   'image',
//   'video',
// ]

// const applyCustomClasses = (selector, classNames) => {
//   const elements = document.querySelectorAll(selector)
//   elements.forEach((element) => {
//     classNames.forEach((className) => {
//       element.classList.add(className)
//     })
//   })
// }

// const Write = ({ editID }) => {
//   const location = useLocation()
//   const editPath = location?.pathname?.split('/')[1] === 'edit'

//   const { editorContent, setEditorContent } = useEditor()
//   const [content, setContent] = useState('')
//   const [tabIndex, setTabIndex] = useState(0)
//   const [title, setTitle] = useState('')
//   const [slug, setSlug] = useState('')
//   const [thumbnail, setThumbnail] = useState('')
//   const [thumbnailPreview, setThumbnailPreview] = useState(null)

//   useEffect(() => {
//     const handleGet = async () => {
//       const response = await axiosInstance.get(
//         `/blog/${location?.pathname?.split('edit/')[1]}`
//       )
//       const { title, slug, thumbnail, description } = response?.data
//       setTitle(title)
//       setThumbnail(thumbnail)
//       setSlug(slug)
//       setEditorContent(description)
//       setThumbnailPreview(thumbnail)
//     }

//     editPath && handleGet()
//   }, [])

//   const handleSave = () => {
//     const formData = new FormData()
//     formData.append('content', editorContent)
//     formData.append('title', title)
//     formData.append('slug', slug)
//     if (thumbnail) {
//       formData.append('thumbnail', thumbnail)
//     }
//     setContent(editorContent)
//   }

//   const handleSaveAsDraft = async () => {
//     const formData = new FormData()
//     formData.append('content', editorContent)
//     formData.append('title', title)
//     formData.append('slug', slug)
//     if (thumbnail) {
//       formData.append('thumbnail', thumbnail)
//     }

//     if (editID) {
//       try {
//         const response = await axiosInstance.put(`/edit/${editID}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         console.log('Draft saved:', response.data)
//       } catch (error) {
//         console.error('An Error Occurred:', error)
//       }
//     } else {
//       try {
//         const response = await axiosInstance.post('/save-as-draft', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         console.log('Draft saved:', response.data)
//       } catch (error) {
//         console.error('Error saving draft:', error)
//       }
//     }
//   }

//   const handleEdit = async () => {
//     try {
//       const formData = new FormData()
//       formData.append('content', editorContent)
//       formData.append('title', title)
//       formData.append('slug', slug)
//       if (thumbnail) {
//         formData.append('thumbnail', thumbnail)
//       }
//       const response = await axiosInstance.put(`/edit/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//     } catch (error) {
//       console.error('Error editing draft:', error)
//     }
//   }

//   const handleTabChange = (event, newIndex) => {
//     setTabIndex(newIndex)
//   }

//   const handleThumbnailChange = (event) => {
//     const file = event.target.files[0]
//     setThumbnail(file)
//     if (file) {
//       setThumbnailPreview(URL.createObjectURL(file))
//     }
//   }

//   const handleRemoveThumbnail = () => {
//     setThumbnail(null)
//     setThumbnailPreview(null)
//   }

//   useEffect(() => {
//     const quillEditor = document.querySelector('.ql-editor')
//     if (quillEditor) {
//       applyCustomClasses('.ql-editor', [
//         'prose-customParagraph',
//         'max-lg:text-xl',
//         'max-sm:text-lg',
//       ])
//       applyCustomClasses('h2, h3', [
//         'prose-customHeading',
//         'max-lg:text-center',
//         'max-lg:text-2xl',
//         'max-sm:text-xl',
//       ])
//       applyCustomClasses('p, li', [
//         'prose-customParagraph',
//         'max-lg:text-xl',
//         'max-sm:text-lg',
//       ])
//       applyCustomClasses('img', ['mx-auto', 'block'])
//     }
//   }, [editorContent])

//   return (
//     <section className='flex flex-col items-center h-screen w-full'>
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         centered
//         className='mb-10 border-2 border-gray-500 w-fit text-black px-10 rounded-full'
//       >
//         <Tab label='Write' />
//         <Tab label='Preview' />
//       </Tabs>

//       {tabIndex === 0 && (
//         <div className='w-full flex gap-y-6 flex-col'>
//           <TextField
//             label='Title'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label='Slug'
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             fullWidth
//           />
//           <input
//             type='file'
//             accept='image/*'
//             onChange={handleThumbnailChange}
//             className='w-fit'
//           />
//           {thumbnailPreview && (
//             <div className='mb-4 flex items-center flex-col gap-y-4'>
//               <img
//                 src={thumbnailPreview}
//                 alt='Thumbnail Preview'
//                 className='max-h-48 object-contain border-2'
//               />
//               <Button
//                 onClick={handleRemoveThumbnail}
//                 variant='outlined'
//                 color='error'
//                 className='ml-4'
//               >
//                 Remove
//               </Button>
//             </div>
//           )}
//           <ReactQuill
//             theme='snow'
//             value={editorContent}
//             onChange={setEditorContent}
//             modules={modules}
//             formats={formats}
//             className='w-full'
//           />
//         </div>
//       )}

//       {tabIndex === 1 && (
//         <div className='border-2 border-gray-400 flex-1 w-full'>
//           {content?.trim()?.length > 0 ? (
//             <Preview content={content} />
//           ) : (
//             <p className='text-gray-500'>
//               Write in editor and save to preview...
//             </p>
//           )}
//         </div>
//       )}

//       <div className='fixed bottom-4 right-10 space-x-4'>
//         {editorContent.trim() &&
//           editorContent !==
//             '<p class="prose-customParagraph max-lg:text-xl max-sm:text-lg"><br></p>' && (
//             <>
//               <Button onClick={handleSaveAsDraft} variant='contained'>
//                 {editID ? 'Save' : 'Draft'}
//               </Button>
//             </>
//           )}
//       </div>
//     </section>
//   )
// }

// export default Write

// import { useState, useEffect } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { useEditor } from '../context/EditorContext'
// import { Button, Tabs, Tab, TextField } from '@mui/material'
// import Preview from './Preview'
// import axiosInstance from '../utils/axiosInstance'
// import { useLocation } from 'react-router-dom'

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     [{ font: [] }, { size: [] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ color: [] }, { background: [] }],
//     [{ script: 'sub' }, { script: 'super' }],
//     ['blockquote', 'code-block'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ indent: '-1' }, { indent: '+1' }],
//     [{ direction: 'rtl' }],
//     [{ align: [] }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
// }

// const formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'color',
//   'background',
//   'script',
//   'blockquote',
//   'code-block',
//   'list',
//   'bullet',
//   'indent',
//   'direction',
//   'align',
//   'link',
//   'image',
//   'video',
// ]

// const applyCustomClasses = (selector, classNames) => {
//   const elements = document.querySelectorAll(selector)
//   elements.forEach((element) => {
//     classNames.forEach((className) => {
//       element.classList.add(className)
//     })
//   })
// }

// const Write = ({ editID }) => {
//   const location = useLocation()
//   const editPath = location?.pathname?.split('/')[1] === 'edit'

//   const { editorContent, setEditorContent } = useEditor()
//   const [content, setContent] = useState('')
//   const [tabIndex, setTabIndex] = useState(0)
//   const [title, setTitle] = useState('')
//   const [slug, setSlug] = useState('')
//   const [thumbnail, setThumbnail] = useState('')
//   const [thumbnailPreview, setThumbnailPreview] = useState(null)

//   useEffect(() => {
//     if (editPath && editID) {
//       const handleGet = async () => {
//         const response = await axiosInstance.get(`/blog/${editID}`)
//         const { title, slug, thumbnail, description } = response?.data
//         setTitle(title)
//         setThumbnail(thumbnail)
//         setSlug(slug)
//         setEditorContent(description)
//         setThumbnailPreview(thumbnail)
//       }
//       handleGet()
//     }
//   }, [editPath, editID])

//   const handleSaveAsDraft = async () => {
//     const formData = new FormData()
//     formData.append('content', editorContent)
//     formData.append('title', title)
//     formData.append('slug', slug)
//     if (thumbnail) {
//       formData.append('thumbnail', thumbnail)
//     }

//     try {
//       let response
//       if (editID) {
//         for (let [key, value] of formData.entries()) {
//           console.log(`${key}: ${value}`)
//         }

//         response = await axiosInstance.put(`/edit/${editID}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         })
//       } else {
//         response = await axiosInstance.post('/save-as-draft', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         })
//       }
//       console.log('Draft saved:', response.data)
//     } catch (error) {
//       console.error('Error saving draft:', error)
//     }
//   }

//   const handleTabChange = (event, newIndex) => {
//     setTabIndex(newIndex)
//   }

//   const handleThumbnailChange = (event) => {
//     const file = event.target.files[0]
//     setThumbnail(file)
//     if (file) {
//       setThumbnailPreview(URL.createObjectURL(file))
//     }
//   }

//   const handleRemoveThumbnail = () => {
//     setThumbnail(null)
//     setThumbnailPreview(null)
//   }

//   useEffect(() => {
//     const quillEditor = document.querySelector('.ql-editor')
//     if (quillEditor) {
//       applyCustomClasses('.ql-editor', [
//         'prose-customParagraph',
//         'max-lg:text-xl',
//         'max-sm:text-lg',
//       ])
//       applyCustomClasses('h2, h3', [
//         'prose-customHeading',
//         'max-lg:text-center',
//         'max-lg:text-2xl',
//         'max-sm:text-xl',
//       ])
//       applyCustomClasses('p, li', [
//         'prose-customParagraph',
//         'max-lg:text-xl',
//         'max-sm:text-lg',
//       ])
//       applyCustomClasses('img', ['mx-auto', 'block'])
//     }
//   }, [editorContent])

//   return (
//     <section className='flex flex-col items-center h-screen w-full'>
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         centered
//         className='mb-10 border-2 border-gray-500 w-fit text-black px-10 rounded-full'
//       >
//         <Tab label='Write' />
//         <Tab label='Preview' />
//       </Tabs>

//       {tabIndex === 0 && (
//         <div className='w-full flex gap-y-6 flex-col'>
//           <TextField
//             label='Title'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label='Slug'
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             fullWidth
//           />
//           <input
//             type='file'
//             accept='image/*'
//             onChange={handleThumbnailChange}
//             className='w-fit'
//           />
//           {thumbnailPreview && (
//             <div className='mb-4 flex items-center flex-col gap-y-4'>
//               <img
//                 src={thumbnailPreview}
//                 alt='Thumbnail Preview'
//                 className='max-h-48 object-contain border-2'
//               />
//               <Button
//                 onClick={handleRemoveThumbnail}
//                 variant='outlined'
//                 color='error'
//                 className='ml-4'
//               >
//                 Remove
//               </Button>
//             </div>
//           )}
//           <ReactQuill
//             theme='snow'
//             value={editorContent}
//             onChange={setEditorContent}
//             modules={modules}
//             formats={formats}
//             className='w-full'
//           />
//         </div>
//       )}

//       <div className='fixed bottom-4 right-10 space-x-4'>
//         {editorContent.trim() &&
//           editorContent !==
//             '<p class="prose-customParagraph max-lg:text-xl max-sm:text-lg"><br></p>' && (
//             <Button onClick={handleSaveAsDraft} variant='contained'>
//               {editID ? 'Save' : 'Draft'}
//             </Button>
//           )}
//       </div>
//     </section>
//   )
// }

// export default Write

import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEditor } from '../context/EditorContext'
import { Button, Tabs, Tab, TextField } from '@mui/material'
import axiosInstance from '../utils/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'
import Preview from './Preview'
import { applyEditorStyles } from '../utils/applyCustomClasses'

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

const applyCustomClasses = (selector, classNames) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element) => {
    classNames.forEach((className) => {
      element.classList.add(className)
    })
  })
}

const Write = ({ editID }) => {
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(0)
  const navigate = useNavigate()
  const [sameDraftId, setSameDraftId] = useState(null)

  const editPath = location?.pathname?.split('/')[1] === 'edit'

  const {
    editorContent,
    setEditorContent,
    title,
    setTitle,
    slug,
    setSlug,
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    setThumbnailPreview,
  } = useEditor()

  useEffect(() => {
    if (editPath && editID) {
      const handleGet = async () => {
        const response = await axiosInstance.get(`/blog/${editID}`)
        const { title, slug, thumbnail, description } = response?.data
        setTitle(title)
        setThumbnail(thumbnail)
        setSlug(slug)
        setEditorContent(description)
        setThumbnailPreview(thumbnail)
      }
      handleGet()
    } else {
    }
  }, [
    editID,
    editPath,
    setEditorContent,
    setSlug,
    setThumbnail,
    setTitle,
    setThumbnailPreview,
  ])

  useEffect(() => {
    setTitle('')
    setThumbnail('')
    setSlug('')
    setEditorContent('')
    setThumbnailPreview('')
  }, [editID, editPath])

  const handleSaveAsDraft = async () => {
    const formData = new FormData()
    formData.append('content', editorContent)
    formData.append('title', title)
    formData.append('slug', slug)
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }
    try {
      let response
      if (editID || sameDraftId) {
        response = await axiosInstance.put(
          `/edit/${editID || sameDraftId}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
      } else {
        response = await axiosInstance.post('/save-as-draft', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setSameDraftId(response?.data?._id)
      }
      console.log('Draft saved:', response.data)
    } catch (error) {
      console.error('Error saving draft:', error)
    }
  }

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0]
    setThumbnail(file)
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveThumbnail = () => {
    setThumbnail(null)
    setThumbnailPreview(null)
  }


  useEffect(() => {
    const quillEditor = document.querySelector('.ql-editor')
    if (quillEditor) {
      applyEditorStyles()
    }
  }, [editorContent])

  return (
    <section className='flex flex-col items-center h-screen w-full'>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        className='mb-10 border-2 border-gray-500 w-fit text-black px-10 rounded-full'
      >
        <Tab label='Write' />
        <Tab label='Preview' />
      </Tabs>

      {tabIndex === 0 && (
        <div className='w-full flex gap-y-6 flex-col'>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label='Slug'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            fullWidth
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleThumbnailChange}
            className='w-fit'
          />
          {thumbnailPreview && (
            <div className='mb-4 flex items-center flex-col gap-y-4'>
              <img
                src={thumbnailPreview}
                alt='Thumbnail Preview'
                className='max-h-48 object-contain border-2'
              />
              <Button
                onClick={handleRemoveThumbnail}
                variant='outlined'
                color='error'
                className='ml-4'
              >
                Remove
              </Button>
            </div>
          )}
          <ReactQuill
            theme='snow'
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
            className='w-full'
          />
        </div>
      )}

      {tabIndex === 1 && (
        <div className='border-2 border-gray-400 flex-1 w-full'>
          {editorContent?.trim()?.length > 0 ? (
            <Preview
              tag={'CRYPTOCURRENCY'}
              title={title}
              content={editorContent}
              thumbnail={thumbnailPreview}
            />
          ) : (
            <p className='text-gray-500'>
              Write in editor and save to preview...
            </p>
          )}
        </div>
      )}

      <div className='fixed bottom-4 right-10 space-x-4'>
        {editorContent.trim() &&
          editorContent !==
            '<p class="prose-customParagraph max-lg:text-xl max-sm:text-lg"><br></p>' && (
            <Button onClick={handleSaveAsDraft} variant='contained'>
              {editID || sameDraftId ? 'Save' : 'Draft'}
            </Button>
          )}
      </div>
    </section>
  )
}

export default Write
