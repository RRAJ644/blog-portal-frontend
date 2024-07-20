import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Write from './pages/Write'
import { EditorProvider } from './context/EditorContext'

// const router = createBrowserRouter([
//   {
//     children: [
//       { path: '/login', element: <Login /> },
//       {
//         path: '/dashboard',
//         element: (
//           <Layout>
//             <Home />
//           </Layout>
//         ),
//       },
//       {
//         path: '/',
//         element: <Login />,
//       },
//     ],
//   },
// ])

// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   )
// }

// export default App

const App = () => {
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
            ></Route>
          </Routes>
        </EditorProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
