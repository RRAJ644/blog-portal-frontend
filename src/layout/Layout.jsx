// import React, { useState } from 'react'
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
// } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
// import { NAV_ITEMS } from '../data'
// import ContextMenu from '../components/ContextMenu'
// import { useNavigate } from 'react-router-dom'

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [searchQuery, setSearchQuery] = useState('')

//   const navigate = useNavigate()

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   const handleRedirects = (trigger) => {
//     navigate(`/${trigger}`)
//   }

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value)
//   }

//   const handleSearchSubmit = (event) => {
//     event.preventDefault()
//     console.log('Search query:', searchQuery)
//   }

//   return (
//     <div className='flex h-screen'>
//       {isSidebarOpen && (
//         <Drawer
//           variant='persistent'
//           anchor='left'
//           open={isSidebarOpen}
//           className='w-64 bg-red-300'
//           classes={{ paper: 'w-64' }}
//         >
//           <div className='w-full flex justify-center items-center bg-gray-800'>
//             <a href='/' className='w-full'>
//               <h2 className='text-white text-2xl w-full text-center p-5 border-b-2'>
//                 Blog-portal BSG
//               </h2>
//             </a>
//           </div>
//           <List
//             className='flex items-center flex-col bg-gray-800 h-full'
//             sx={{ paddingTop: '4rem' }}
//           >
//             {NAV_ITEMS.map((link, index) => (
//               <ListItem
//                 key={index}
//                 className='w-full'
//                 onClick={() => handleRedirects(link.trigger)}
//               >
//                 <ListItemText
//                   className='w-full text-white pl-12 cursor-pointer'
//                   primary={<span className='text-2xl'>{link.item}</span>}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//       )}
//       <div className={`flex flex-col w-full`}>
//         <header className='flex items-center justify-between px-10 py-3 bg-gray-800 text-white '>
//           <div className='flex justify-center items-center'>
//             <IconButton edge='start' color='inherit' onClick={toggleSidebar}>
//               <MenuIcon />
//             </IconButton>
//           </div>

//           <form onSubmit={'handleSearchSubmit'} className='flex items-center'>
//             <TextField
//               variant='outlined'
//               size='small'
//               placeholder='Search...'
//               value={'searchQuery'}
//               onChange={'handleSearchChange'}
//               className='mr-4'
//             />
//           </form>

//           <ContextMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
//         </header>

//         <main className='flex-grow p-4 overflow-auto'>{children}</main>
//       </div>
//     </div>
//   )
// }

// export default Layout

import React, { useState } from 'react'
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { NAV_ITEMS } from '../data'
import ContextMenu from '../components/ContextMenu'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { setDrafts, setPublished } = children?.props

  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleRedirects = (trigger) => {
    navigate(`/${trigger}`)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('Search query:', searchQuery)
      const response = await axiosInstance.get(`/search/?search=${searchQuery}`)

      if (setDrafts) {
        setDrafts(response.data)
      } else {
        console.log('object')
        setPublished(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-screen'>
      {isSidebarOpen && (
        <Drawer
          variant='persistent'
          anchor='left'
          open={isSidebarOpen}
          className='w-64 bg-red-300'
          classes={{ paper: 'w-64' }}
        >
          <div className='w-full flex justify-center items-center bg-gray-800'>
            <a href='/' className='w-full'>
              <h2 className='text-white text-2xl w-full text-center p-5 border-b-2'>
                Blog-portal BSG
              </h2>
            </a>
          </div>
          <List
            className='flex items-center flex-col bg-gray-800 h-full'
            sx={{ paddingTop: '4rem' }}
          >
            {NAV_ITEMS.map((link, index) => (
              <ListItem
                key={index}
                className='w-full'
                onClick={() => handleRedirects(link.trigger)}
              >
                <ListItemText
                  className='w-full text-white pl-12 cursor-pointer'
                  primary={<span className='text-2xl'>{link.item}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <div className={`flex flex-col w-full`}>
        <header className='flex items-center justify-between px-10 py-3 bg-gray-800 text-white '>
          <div className='flex justify-center items-center'>
            <IconButton edge='start' color='inherit' onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          </div>

          {location.pathname !== '/write' && (
            <form onSubmit={handleSearchSubmit} className='flex items-center'>
              <TextField
                variant='outlined'
                size='small'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='mr-4'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: '300px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />
            </form>
          )}

          <ContextMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </header>

        <main className='flex-grow p-4 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}

export default Layout
