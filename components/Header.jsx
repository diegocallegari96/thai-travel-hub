import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import Head from 'next/head'
import Script from 'next/script'







const Header = () => {
    const [categories, setCategories] = useState([]);
    const [nav, setNav] = useState(false)
    const handleClickk = () => setNav(!nav)

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);



  return (
    
    
    <div className='container mx-auto px-10 mb-8'>
        <Head>
            <title>Thai Travel Hub</title>
            <link rel='icon' href='/thaihubicowit.svg'/>
            <meta name="agd-partner-manual-verification" />
            <Script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="1SPD11R"></Script>
         </Head>
        <div className='border-b w-full inline-block border-white py-8'>
            <div className='md:float-left block'>
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
            {/* <div onClick={handleClickk} className='md:hidden z-10 absolute top-0 right-0'>
                {!nav ? <FontAwesomeIcon className='m-12' icon={faBars} style={{color: "#ffffff",}} /> : <FontAwesomeIcon className='m-12' icon={faXmark} style={{color: "#ffffff",}} />}
            </div> */}
            {/* hamburger menu */}
{/* <             div className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center z-50'}>
                    {[...categories].reverse().map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className=' mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div> */}
        </div>
    </div>
  );
}

export default Header