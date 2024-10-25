"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef("");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  const searchPost = (e) => {
    if (e.type == "keydown" && e.key !== "Enter") {
      return;
    }
    setSearch(true);
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value
    )
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false));
  };

  const handleDelete = (id) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // No Content, deletion was successful
          const updatedPosts = posts.filter((post) => post._id !== id); // Filter out the deleted post
          setPosts(updatedPosts); // Update the posts state
          setMessage("Post deleted successfully!");

          setTimeout(() => {
            setMessage("");
          }, 2000);
        } else if (response.status === 404) {
          setMessage("Post not found!");
        } else {
          return response.json().then((data) => {
            setMessage(`Error: ${data.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="mb-20">
      <Link href="/addpost">
        <div className="fixed right-5 bottom-16 bg-green-600 p-10 w-8 h-8 flex justify-center items-center text-white text-5xl hover:bg-green-700 rounded-full">
          +
        </div>
      </Link>
      <main className="flex justify-center items-center flex-col">
        <h2 className="text-5xl font-semibold p-5 uppercase">
          Welcome to the kare blog
        </h2>
        <p className="text-2xl">Here you can see the latest articles</p>
      </main>
      <div className="flex items-center lg:justify-end justify-center m-3 gap-2 p-2">
        <input
          ref={inputRef}
          type="text"
          onKeyDown={searchPost}
          className=" border outline-none bg-stone-300 border-stone-500 rounded px-3 py-1 "
        />
        <button
          onClick={searchPost}
          disabled={search}
          className="px-3 py-1.5 bg-blue-500 font-bold text-white rounded "
        >
          {search ? "Loading" : "Search"}
        </button>
      </div>
      <p>{message}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:justify-center lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border m-2 border-stone-300 p-2">
            <Link href={"/post/" + post._id}>
              <img
                src={post.image}
                className="p-3 w-full object-cover"
                alt={post.title}
              />

              <h2 className="p-3 flex justify-center font-bold text-3xl">
                {post.title}
              </h2>
              <p className="px-3 flex justify-center">
                {post.short_description}
              </p>
              <div></div>
            </Link>
            <button
              onClick={() => {
                handleDelete(post._id);
              }}
              className="mx-3 my-1 px-2 py-1 bg-red-500 rounded text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
        {!posts.length > 0 && inputRef.current.value && (
          <p className="flex justify-center items-center text-red-600">
            No post available for this query : <b>{inputRef.current.value}</b>{" "}
          </p>
        )}
      </div>
    </div>
  );
}
