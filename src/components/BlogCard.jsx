import axiosInstance from '../utils/axiosInstance'
const BlogCard = ({
  thumbnail,
  date,
  title,
  description,
  tag,
  index,
  slug,
  id,
  drafts,
  setDrafts,
  published,
  setPublished,
}) => {
  const handlePublishDraft = async () => {
    try {
      await axiosInstance.put(`/publish-draft/${id}`)
      if (drafts && setDrafts) {
        setDrafts((prevDrafts) =>
          prevDrafts.filter((draft) => draft._id !== id)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteDraft = async () => {
    try {
      await axiosInstance.delete(`/delete/${id}`)

      if (drafts && setDrafts) {
        setDrafts((prevDrafts) =>
          prevDrafts.filter((draft) => draft._id !== id)
        )
      }

      if (published && setPublished) {
        setPublished((publishedDrafts) =>
          publishedDrafts.filter((published) => published._id !== id)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-[25rem] overflow-hidden shadow-lg rounded-lg flex flex-col cursor-pointer'>
      <div className='relative w-full xl:h-[12rem] lg:h-[13rem] max-lg:h-[12rem] overflow-hidden object-cover object-center'>
        <img
          className='w-full h-full lg:bg-cover max-lg:bg-contain'
          src={thumbnail}
          alt='Blog Thumbnail'
          loading='eager'
        />
        <div className='absolute top-5 right-5 bg-blue-500 text-white text-sm px-4 py-1 rounded-xl'>
          {tag}
        </div>
      </div>

      <div className='p-6 flex-1 flex flex-col'>
        <h2 className='font-semibold text-sm md:text-xl mb-3'>{title}</h2>
        <div className='flex-grow'></div>{' '}
        <div className='mt-2'>
          {location.pathname === '/published' && (
            <span className='text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer'>
              <a href={`https://wiseadvice.in/${slug}`} target='__blank'>
                Check »
              </a>
            </span>
          )}

          {location.pathname === '/drafts' && (
            <div className='flex justify-between'>
              <span className='text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-xl'>
                <a href={`edit/${id}`}>Edit »</a>
              </span>

              <span className='text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-xl'>
                <a onClick={handlePublishDraft}>Publish »</a>
              </span>
            </div>
          )}
        </div>
      </div>

      <hr className='border-gray-300' />
      <div className='text-gray-600 text-sm px-6 py-4 flex justify-between'>
        <span>{date}</span>
        <a className='text-red-500' onClick={handleDeleteDraft}>
          Delete
        </a>
      </div>
    </div>
  )
}

export default BlogCard
