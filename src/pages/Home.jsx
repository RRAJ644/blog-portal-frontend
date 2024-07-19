import React, { useState } from 'react'
import ChangePassword from '../components/ChangePassword'
import { Button } from '@mui/material'

const Home = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-y-8 h-full'>
      <p className='text-7xl'>Hello, {'Rituraj Singh'}</p>
      <p className='text-5xl'>Let's Get to work</p>
    </div>
  )
}

export default Home
