import { useRouter } from 'next/router';
import { useState } from 'react';
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";

export default function Home({ posts }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const postsPerPage = 5;  // Number of posts per page

  // Reverse the posts array so the latest posts appear first
  const reversedPosts = posts.slice().reverse();

  // Filter posts based on the search term
  const filteredPosts = reversedPosts.filter((post) => 
    post.node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.node.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the current page from query params
  const currentPage = parseInt(router.query.page) || 1;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Get the posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Handle navigation
  const handlePagination = (page) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="w-full mx-0 px-0 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <FeaturedPosts className="w-[80%]" />
        <div className="col-span-1 lg:col-span-8 w-full px-0 lg:px-10">
          {/* Centering the search bar */}
          <div className="flex justify-center my-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              placeholder="Search posts..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {/* Display filtered posts */}
          {selectedPosts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-8 w-full">
            {/* Center the page number */}
            <span className="text-white text-center flex-grow">Page {currentPage} of {totalPages}</span>

            {/* Align buttons to the right */}
            <div className="ml-auto space-x-4"> {/* Added margin-left to push buttons to the right */}
              <button
                className={`px-4 py-2 bg-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 bg-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

        </div>

        <div className="col-span-1 lg:col-span-4 w-full px-0 lg:px-10">
          <div className="relative lg:sticky top-8 w-full">
            <PostWidget className="w-full" />
            <Categories className="w-full" />
            {/* Add any widgets */}
            <div
              className="w-full"
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="169040"
              data-gyg-locale-code="en-US"
              data-gyg-widget="city"
              data-gyg-partner-id="1SPD11R"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
