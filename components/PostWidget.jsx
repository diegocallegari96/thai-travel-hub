import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getFeaturedPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      // Fetch similar posts if a slug is provided (for a specific post)
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
    } else {
      // Fetch featured posts instead of recent posts
      getFeaturedPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 mb-8">
      <h3 className="text-xl mb-6 sm:mb-8 font-semibold border-b pb-2 sm:pb-4">
        {slug ? 'Related Posts' : 'Featured Posts'}
      </h3>
      {relatedPosts.slice().reverse().map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-12 sm:w-16 flex-none">
            <img
              alt={post.title}
              height="48px"
              width="48px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-3 sm:ml-4">
            <Link href={`/post/${post.slug}`} key={post.title} className="text-sm sm:text-md text-gray-800 hover:text-blue-500">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
