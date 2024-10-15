"use client";

import { useState } from "react";

export default function AddPost() {
  const [input, setInput] = useState({});
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setInput((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setInput({});
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };
  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Add Post</h2>
      <form className="w-full max-w-lg">
        <div className="flex items-center mb-4">
          <label htmlFor="title" className="w-1/4">
            Title :
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="title"
            value={input.title??""}
            className="border rounded px-2 py-1 w-3/4 outline-none"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="image" className=" w-1/4">
            Image URL :
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="image"
            value={input.image??""}
            className="border outline-none rounded px-2 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="description" className="w-1/4">
            Description :
          </label>
          <input
            id="description"
            onChange={handleInput}
            name="description"
            value={input.description??""}
            className="border rounded px-2 outline-none py-1 w-3/4"
          ></input>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="created_at" className="outline-none w-1/4">
            Created At :
          </label>
          <input
            id="created_at"
            onChange={handleInput}
            name="created_at"
            value={input.created_at??""}
            className="border rounded px-2 outline-none py-1 w-3/4"
          ></input>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {message && <p className="m-2">Message : {message}</p>}
    </main>
  );
}
