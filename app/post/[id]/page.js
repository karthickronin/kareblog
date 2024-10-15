import Post from "../../../components/Post";

export async function generateMetadata({ params }) {
  const id = params.id;
  const post = await fetch("http://localhost:3000/api" + "/posts/" + id)
  .then(
    (res) => res.json()
  );

  return { title: post.title };
}

export default function Page({ params }) {
  return <Post params={params} />;
}