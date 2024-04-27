import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import Head from 'next/head'
import { FaBars, FaTimes } from 'react-icons/fa';
import Script from 'next/script';

const Header = ({ post }) => {
    const [categories, setCategories] = useState([]);
    const [nav, setNav] = useState(false)
    const handleClickk = () => setNav(!nav)

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    useEffect(() => {
        if (nav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [nav]);


  return (
    <div className='container mx-auto px-10 mb-8'>
        <Head post={post}>
        <title>{post?.title || "Discover Thailand's Wonders: Your Ultimate Guide"}</title>
        <link rel='icon' href='/thaihubicowit.svg' />
        <meta name='description' 
              content={post?.description || 'Explore the beauty and culture of Thailand with ThaiTravelHub. Your ultimate guide to discovering hidden gems, delicious cuisine, and unforgettable experiences across the Land of Smiles.'}/>
        <meta name='keywords' content={post?.keyword || 'Thailand, travel, guide, culture, food, hidden gems, experiences'} />
        {/* Open Graph */}
        <meta property="og:title" 
              content={post?.title || "Discover Thailand's Wonders: Your Ultimate Guide"} />
        <meta property="og:description" 
              content={post?.description || 'Explore the beauty and culture of Thailand with ThaiTravelHub. Your ultimate guide to discovering hidden gems, delicious cuisine, and unforgettable experiences across the Land of Smiles.'} />
        <meta property="og:image" 
              content={post?.featuredImage.url || '/thaihubicowit.svg'} /> 
        <meta property="og:url" 
              content={`https://thaitravelhub.com/post/${post?.slug}` || `https://thaitravelhub.com/`} />
        {/* Twitter */}      
        <meta name="twitter:card" 
              content={post?.featuredImage.url || '/thaihubicowit.svg'} />
        <meta name="twitter:title" 
              content={post?.title || "Discover Thailand's Wonders: Your Ultimate Guide"} />
        <meta name="twitter:description" 
              content={post?.description || 'Explore the beauty and culture of Thailand with ThaiTravelHub. Your ultimate guide to discovering hidden gems, delicious cuisine, and unforgettable experiences across the Land of Smiles.'} />
        <meta name="twitter:image" 
              content={post?.featuredImage.url || '/thaihubicowit.svg'} />          
        <script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="1SPD11R"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9408300979339623"
                crossorigin="anonymous"></script>
        </Head>
        <div className='border-b w-full inline-block border-white py-8'>
            <div className='md:float-left block z-30'>
                <Link href='/'>
                <div  className='flex items-center' >
                <img className='cursor-pointer' src='/thaihubicowit.svg' alt="Logo image" style={{width: '60px'}}/>
                    <span className='sm:text-2xl pl-6 cursor-pointer font-bold md:text-4xl text-white '> 
                    Thai Travel Hub 
                    </span>
                </div> 
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                    {[...categories].reverse().map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
            {/* hamburger */}
            <div onClick={handleClickk} className='md:hidden z-30 absolute top-0 right-0'>
                {!nav ? <FaBars className='m-12' color='white' size={'25'} /> : <FaTimes className='m-12' color='white' size={'25'} />}
            </div>
            {/* hamburger menu */}
            {nav && (
                <div className='fixed top-0 left-0 w-full h-full bg-menuImage flex flex-col justify-center items-center z-10' style={{ backgroundSize: 'cover' }}>
                    {[...categories].map((category) => (
                        <Link className='pb-14' onClick={handleClickk} key={category.slug} href={`/category/${category.slug}`}>
                            <span className=' text-4xl align-middle bg-gray-900 bg-opacity-45 p-2 rounded-lg text-white font-bold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Header