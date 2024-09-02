

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

const Write = ({ editID }) => {
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(0)
  const navigate = useNavigate()
  const [sameDraftId, setSameDraftId] = useState(null)
  const [isSaving, setIsSaving] = useState(false) // New state for tracking save operation

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
    setIsSaving(true) // Set loading state to true
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
    } finally {
      setIsSaving(false) // Set loading state to false
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
            <Button
              onClick={handleSaveAsDraft}
              variant='contained'
              disabled={isSaving} // Disable the button when saving
            >
              {isSaving
                ? editID || sameDraftId
                  ? 'Saving...'
                  : 'Saving as Draft...'
                : editID || sameDraftId
                ? 'Save'
                : 'Draft'}
            </Button>
          )}
      </div>
    </section>
  )
}

export default Write
