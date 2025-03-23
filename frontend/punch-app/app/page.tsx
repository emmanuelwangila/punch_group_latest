"use client";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/posts/";

import Image from "next/image";

interface Post {
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const createPost = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosts),
      });

      if (response.ok) {
        fetchPosts();
      } else {
        console.error("Error creating a post");
      }
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleteing post", error);
    }
  };

  const updatePost = async (id: string, newPosts: Post) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosts),
      });

      if (response.ok) {
        await fetchPosts();
      } else {
        console.error("Errors updating a apost");
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen rounded-md  m-4 p-4 font-sans">
      <h1 className="text-blue-500 flex justify-center  ">
        Welcome to Punch Group
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Create a New Post</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newPosts.title}
          onChange={(e) => setNewPosts({ ...newPosts, title: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Author"
          value={newPosts.author}
          onChange={(e) => setNewPosts({ ...newPosts, author: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={newPosts.content}
          onChange={(e) =>
            setNewPosts({ ...newPosts, content: e.target.value })
          }
        ></textarea>
        <button
          onClick={createPost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Post
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        {posts.map((post: any) => (
          <div
            key={post._id}
            className="border p-4 mb-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-600">by {post.author}</p>
            <p className="mt-2">{post.content}</p>
            <button
              onClick={() => handleDelete(post._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
