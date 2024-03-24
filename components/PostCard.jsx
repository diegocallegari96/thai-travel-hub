import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Head from 'next/head'
import logoImg from '../public/thaihubicowit.svg'

const PostCard = ({ post }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <Head>
                <title>{post.title}</title>
                <meta name='description' 
                      content={post?.excerpt || 'Explore the beauty and culture of Thailand with ThaiTravelHub. Your ultimate guide to discovering hidden gems, delicious cuisine, and unforgettable experiences across the Land of Smiles.'}/>
                
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post?.excerpt} />
                <meta property="og:image" content={logoImg} /> 
                <meta property="og:url" content={`https://thaitravelhub.com/post/${post.slug}`} />
              
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post?.excerpt} />
                <meta name="twitter:image" content={logoImg} />
      </Head>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img 
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'        
        />
      </div>
      <h1 className='transition duration-700 text-center mb-8  cursor=pointer hover:text-purple-700 text-3xl font-semibold px-2'>
        <Link href={`/post/${post.slug}`}>
            {post.title}
        </Link>
      </h1>
      <div className='block lg:flex text-center items-center justify-center pl-8 mb-8 w-full'>
        {/* <div className='flex items-center justify-center mb-4 lg:mb-0 lg:w-auto mr-8'>
          <img 
          alt={post.author.name}
          height='30px'
          width='30px'
          className='align-middle'
          src={post.author.photo.url}
          />
          <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
        </div> */}
        <div className='font-medium text-gray-700 mb-4 lg:mb-0 lg:w-auto mr-8'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
        </div>
      </div>
      <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>{post.excerpt}</p>
      <div className='text-center text-white'>
          <Link href={`/post/${post.slug}`}>
              <span className='transition duration-500 transform hover:bg-indigo-500 hover:-translate-y-1 inline-block bg-purple-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                Continue Reading
              </span>
          </Link>
      </div>
    </div>
  )
}

export default PostCard