import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72 sm:h-80 md:h-96 lg:h-100 xl:h-120 mb-8">
    {/* Background image with proper styling */}
    <div
      className="absolute inset-0 rounded-lg bg-center bg-cover bg-no-repeat shadow-lg transition-transform transform hover:scale-105 duration-500"
      style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-black opacity-75" />

    {/* Post Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 text-shadow">
        {post.title}
      </h2>
      <p className="text-white text-sm md:text-md font-semibold mb-4 text-shadow">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
    </div>

    {/* Link to post */}
    <Link href={`/post/${post.slug}`}>
      <a className="absolute inset-0 z-20 cursor-pointer" aria-label={post.title} />
    </Link>
  </div>
);

export default FeaturedPostCard;
