import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Write from './Write'
import axiosInstance from '../utils/axiosInstance'

const Edit = () => {
  const [blog, setBlog] = useState({})

  const location = useLocation()

  useEffect(() => {
    const handleGet = async () => {
      const response = await axiosInstance.get(
        `/blog/${location?.pathname?.split('edit/')[1]}`
      )
      setBlog(response?.data)
    }

    handleGet()
  }, [])

  return (
    <div>
      <Write editID={blog._id} />
    </div>
  )
}

export default Edit
