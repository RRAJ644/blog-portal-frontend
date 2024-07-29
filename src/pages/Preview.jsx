import profile from '../assets/blog-profile.webp'
import { formatDate } from '../utils/formatDate'
const Preview = ({ tag, title, content, thumbnail }) => {
  return (
    <section className='flex flex-col items-center mt-8'>
      {tag && (
        <div className='bg-blue-500 text-white text-sm px-4 py-1 mb-4'>
          {tag}
        </div>
      )}

      <div className='w-11/12 md:w-1/2 text-center flex items-center justify-center py-4'>
        <h1 className='text-2xl xl:text-5xl lg:text-4xl md:text-3xl font-roboto'>
          {title}
        </h1>
      </div>
      <div className='w-11/12 md:w-1/2 flex items-center justify-center gap-x-6 py-2'>
        <div className='flex gap-3 items-center'>
          <img src={profile} alt='profile' className='rounded-full w-12 h-12' />
          <span>WISEADVICE</span>
        </div>
        <h3 className='text-lg'>{formatDate(new Date())}</h3>
      </div>

      <div className='w-11/12 md:w-1/2 flex justify-center items-center'>
        <img src={thumbnail} alt='Title Img' className='max-w-full h-auto' />
      </div>
      <div
        className='flex flex-col justify-center items-center w-11/12 md:w-full mt-4'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

export default Preview
