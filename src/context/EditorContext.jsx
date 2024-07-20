import { createContext, useState, useContext, useEffect } from 'react'

const EditorContext = createContext()

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState('')

  useEffect(() => {
    const savedContent = sessionStorage.getItem('editorContent')
    if (savedContent) {
      setEditorContent(savedContent)
    }
  }, [])

  const handleSetEditorContent = (content) => {
    setEditorContent(content)
    sessionStorage.setItem('editorContent', content)
  }

  return (
    <EditorContext.Provider
      value={{ editorContent, setEditorContent: handleSetEditorContent }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
