import { createContext, useState, useContext } from 'react'

const EditorContext = createContext()

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState('')

  return (
    <EditorContext.Provider value={{ editorContent, setEditorContent }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
