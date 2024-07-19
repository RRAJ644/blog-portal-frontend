import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuItem from '@mui/material/MenuItem'
import profile from '../assets/profile.png'
import { PROFILE_MENU } from '../data'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ChangePassword from './ChangePassword' // Adjust the path as necessary

const ContextMenu = ({ anchorEl, setAnchorEl }) => {
  const { logout } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleMenuClick = (trigger) => {
    handleClose() // Close the popover
    if (trigger === 'logout') {
      logout()
    } else if (trigger === 'changePassword') {
      handleOpenModal()
    }
  }

  return (
    <div>
      <img
        src={profile}
        alt='profile'
        loading='eager'
        className='w-12 h-12 rounded-full cursor-pointer'
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className='flex flex-col p-2'>
            {PROFILE_MENU?.map((profile) => (
              <MenuItem
                key={profile.item}
                onClick={() => handleMenuClick(profile?.trigger)}
              >
                {profile?.item}
              </MenuItem>
            ))}
          </div>
        </ClickAwayListener>
      </Popover>

      <ChangePassword open={openModal} handleClose={handleCloseModal} />
    </div>
  )
}

export default ContextMenu
