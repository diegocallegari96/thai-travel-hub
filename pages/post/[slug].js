import React from 'react'
import { getPosts, getPostDetails } from '../../services'
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'
import { useRouter } from 'next/router'

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="w-full mx-0 px-0 mb-8"> {/* Full width with no margin/padding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Full width on mobile */}
        <div className="col-span-1 lg:col-span-8 w-full px-0 lg:px-10"> {/* Ensure full width with responsive padding */}
          <div className="w-full"> {/* Make each child component full width */}
            <PostDetail post={post} className="w-full" />
            <Author author={post.author} className="w-full" />
            <CommentsForm slug={post.slug} className="w-full" />
            <Comments slug={post.slug} className="w-full" />
          </div>
        </div>
        
        {/* Sidebar widget */}
        <div className="col-span-1 lg:col-span-4 w-full lg:pr-10">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
            <div
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
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
