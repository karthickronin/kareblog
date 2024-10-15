"use client";

import { useState } from "react";

export default function Contact() {
  const [input, setInput] = useState({});
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setInput((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/enquiry", {
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
      <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      <form className="w-full max-w-lg">
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="w-1/4">
            Name:
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="name"
            value={input.name??""}
            className="border rounded px-2 py-1 w-3/4 outline-none"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="email" className=" w-1/4">
            Email:
          </label>
          <input
            type="email"
            onChange={handleInput}
            name="email"
            value={input.email??""}
            className="border outline-none rounded px-2 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="message" className="outline-none w-1/4">
            Message:
          </label>
          <textarea
            id="message"
            onChange={handleInput}
            name="message"
            value={input.message??""}
            className="border rounded px-2 outline-none py-1 w-3/4"
            rows="4"
          ></textarea>
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
