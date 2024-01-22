import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import Head from 'next/head'


const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

  return (
    
    <div className='container mx-auto px-10 mb-8'>
        <Head>
            <title>Thai Travel Hub</title>
            <link rel='icon' href='/thaihubicowit.svg'/>
         </Head>
        <div className='border-b w-full inline-block border-purple-800 py-8'>
            <div className='md:float-left block'>
                <Link href='/'>
                <div  className='flex items-center' >
                <img className='cursor-pointer' src='/thaihubicowit.svg' alt="Logo image" style={{width: '60px'}}/>
                    <span className='pl-6 cursor-pointer font-bold text-4xl text-white'> 
                    Thai Travel Hub 
                    </span>
                </div> 
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Header