import { createContext, useState, useContext, useEffect } from 'react'

const EditorContext = createContext()

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  // Load saved state from localStorage when the component mounts
  useEffect(() => {
    const savedEditorContent = localStorage.getItem('editorContent')
    const savedTitle = localStorage.getItem('title')
    const savedSlug = localStorage.getItem('slug')
    const savedThumbnail = localStorage.getItem('thumbnail')
    const savedThumbnailPreview = localStorage.getItem('thumbnailPreview')

    if (savedEditorContent) setEditorContent(savedEditorContent)
    if (savedTitle) setTitle(savedTitle)
    if (savedSlug) setSlug(savedSlug)
    if (savedThumbnail) setThumbnail(savedThumbnail)
    if (savedThumbnailPreview) setThumbnailPreview(savedThumbnailPreview)
  }, [])

  useEffect(() => {
    localStorage.setItem('editorContent', editorContent)
    localStorage.setItem('title', title)
    localStorage.setItem('slug', slug)
    localStorage.setItem('thumbnail', thumbnail)
    localStorage.setItem('thumbnailPreview', thumbnailPreview, thumbnailPreview)
  }, [editorContent, title, slug, thumbnail])

  return (
    <EditorContext.Provider
      value={{
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
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
