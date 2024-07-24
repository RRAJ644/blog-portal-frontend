const BlogCard = ({
  thumbnail,
  date,
  title,
  description,
  tag,
  index,
  slug,
}) => {
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
          <span className='text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer'>
            Check »
          </span>
        </div>
      </div>

      <hr className='border-gray-300' />
      <div className='text-gray-600 text-sm px-6 py-4 flex justify-between'>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default BlogCard
