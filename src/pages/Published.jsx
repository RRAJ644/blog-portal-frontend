import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import BlogCard from '../components/BlogCard'
const Published = () => {
  const [published, setPublished] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPublished = async () => {
      try {
        const response = await axiosInstance.get('/blogs?status=published')
        setPublished(response?.data)
      } catch (error) {
        setError('Failed to fetch drafts')
        console.error('Error fetching drafts:', error)
      } finally {
        setLoading(false)
      }
    }

    getPublished()
  }, [published])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (published?.length === 0) return <div>Not published yet</div>

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Published blogs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {published?.map(
          ({ thumbnail, date, title, description, tag, index, slug, _id }) => (
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
              setPublished={setPublished}
              published={published}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Published
