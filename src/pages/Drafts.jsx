import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import BlogCard from '../components/BlogCard'
import axios from 'axios'

const Drafts = () => {
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getDrafts = async () => {
      try {
        const response = await axiosInstance.get('/blogs?status=drafts')
        console.log(response.data)
        setDrafts(response.data)
      } catch (error) {
        setError('Failed to fetch drafts')
        console.log('Error fetching drafts:', error)
      } finally {
        setLoading(false)
      }
    }

    getDrafts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (drafts?.length === 0) return <div>No drafts available</div>

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Your Drafts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {drafts.length > 0 &&
          drafts?.map(
            ({
              thumbnail,
              date,
              title,
              description,
              tag,
              index,
              slug,
              _id,
            }) => (
              <BlogCard
                key={slug}
                thumbnail={thumbnail}
                date={date}
                title={title}
                description={description}
                tag={tag}
                index={index}
                slug={slug}
                id={_id}
                setDrafts={setDrafts}
                drafts={drafts}
              />
            )
          )}
      </div>
    </div>
  )
}

export default Drafts
