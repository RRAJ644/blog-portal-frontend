import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Write from './pages/Write'
import { EditorProvider } from './context/EditorContext'
import Published from './pages/Published'
import Drafts from './pages/Drafts'
import Edit from './pages/Edit'

const App = () => {
  const [drafts, setDrafts] = useState([])
  const [published, setPublished] = useState([])

  return (
    <Router>
      <AuthProvider>
        <EditorProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/dashboard'
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path='/write'
              element={
                <Layout>
                  <Write />
                </Layout>
              }
            />
            <Route
              path='/drafts'
              element={
                <Layout>
                  <Drafts drafts={drafts} setDrafts={setDrafts} />
                </Layout>
              }
            />
            <Route
              path='/published'
              element={
                <Layout>
                  <Published
                    published={published}
                    setPublished={setPublished}
                  />
                </Layout>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <Layout>
                  <Edit />
                </Layout>
              }
            />
          </Routes>
        </EditorProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
