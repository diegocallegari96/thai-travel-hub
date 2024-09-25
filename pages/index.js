import { useRouter } from 'next/router';
import { useState } from 'react';
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { FaSearch } from 'react-icons/fa'; // Import magnifying glass icon

export default function Home({ posts }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const postsPerPage = 5;  // Number of posts per page

  // Reverse the posts array so the latest posts appear first
  const reversedPosts = posts.slice().reverse();

  // Filter posts based on the search term, only looking at titles (H1 equivalent)
  const filteredPosts = reversedPosts.filter((post) => 
    post.node.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSearch = () => {
    // Add search handling logic here if needed (optional)
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="w-full mx-0 px-0 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8 w-full px-0 lg:px-10">
          {/* New div for search bar with matching background and styling */}
          <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
            <div className="flex mx-auto justify-center items-center border-b-2 border-gray-300 w-full lg:w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                placeholder="Search titles..."
                className="px-4 py-2 w-full focus:outline-none focus:ring-0"
              />
              <button
                onClick={handleSearch} // Click to trigger search
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>

          {/* Display filtered posts */}
          {selectedPosts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-8 w-full">
            {/* Center the page number */}
            <span className="text-gray-600 text-center flex-grow">Page {currentPage} of {totalPages}</span>

            {/* Align buttons to the right */}
            <div className="ml-auto space-x-4">
              <button
                className={`px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
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
