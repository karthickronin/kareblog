
"use client";
import { useEffect, useState } from "react";

export default function post({params}) {
  const id = params.id;
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/posts/" + id)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, []);
  return (
    <>
      {post && (
        <main className="container flex flex-col m-3 mb-20">
          <h2 className="text-4xl font-bold p-2">{post.title}</h2>
          <p className="text-stone-500 p-2">
            published in {post.created_at_formatted}
          </p>
          <img src={post.image} width={500} height={400} className="p-2" />
          <p className="p-2">{post.description}</p>
        </main>
      )}
    </>
  );
}
