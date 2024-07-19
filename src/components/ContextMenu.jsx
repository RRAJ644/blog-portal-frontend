import React from 'react'
import Popover from '@mui/material/Popover'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuItem from '@mui/material/MenuItem'
import profile from '../assets/profile.png'
import { PROFILE_MENU } from '../data'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ContextMenu = ({ anchorEl, setAnchorEl }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

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
                onClick={() => {
                  profile?.trigger === 'logout' && logout()
                  navigate('/login')
                }}
              >
                {profile?.item}
              </MenuItem>
            ))}
          </div>
        </ClickAwayListener>
      </Popover>
    </div>
  )
}

export default ContextMenu
