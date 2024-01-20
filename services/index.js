import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
    `;

    const results = await request(graphqlAPI, query);

    return results.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }) {
      title
      excerpt
      featuredImage {
        url
      }
      author{
        name
        bio
        photo {
          url
        }
      }
      createdAt
      slug
      content {
        raw
      }
      categories {
        name
        slug
      }
    }
  }
      
`;

  const results = await request(graphqlAPI, query, { slug });

  return results.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails() {
      posts(orderBy: createdAt_ASC
      last: 3  
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const results = await request(graphqlAPI, query);

  return results.posts;
}

export const getSimilarPosts = async(categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results = await request(graphqlAPI, query, { categories, slug });

  return results.posts;
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const results = await request(graphqlAPI, query);

  return results.categories;
}

export const submitComment = async (obj) => {
  try {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    console.log('aaaa', result, obj);

    // Check if the response status is OK (200)
    if (!result.ok) {
      // If not OK, throw an error with the response details
      console.log(result);
      // const errorDetails = await result.json();
      // console.log('baspa: ', errorDetails);
      // throw new Error(`Error: ${result.status} - ${result.statusText}\n${JSON.stringify(errorDetails)}`);
    }

    // If the response is OK, parse and return the JSON
    // return result.json();
  } catch (error) {
    // Handle fetch errors
    console.error('Fetch Error:', error);
    throw error; // Propagate the error for further handling
  }
};
