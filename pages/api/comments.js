import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug }}}) {
        id
      }
    }
  `;

  console.log('Raw Request Body:', req.body);
  try {
    const result = await graphQLClient.request(query, req.body);

    // Log successful response
    // console.log('Response:', result);

    return res.status(200).send(result);
  } catch (error) {
    // Log error
    console.error('Error:', error);

    return res.status(error.response.status).send(error.response.data);
  }
}
