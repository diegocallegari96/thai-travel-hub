import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";


export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <PostCard post={post.node} key={post.title} />
            ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
            <div className="rounded-lg"
             data-gyg-href="https://widget.getyourguide.com/default/city.frame" 
             data-gyg-location-id="169040" 
             data-gyg-locale-code="en-US" 
             data-gyg-widget="city" 
             data-gyg-partner-id="1SPD11R">
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
