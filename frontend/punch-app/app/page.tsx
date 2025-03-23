"use client";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/posts/";

import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([
    { title: "", content: "", author: "" },
  ]);

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

  interface Post {
    title: string;
    content: string;
    author: string;
  }

  const createPost = async (post: Post) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
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

  const updatePost = async (id: string, post: Post) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        fetchPosts();
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
    </div>
  );
}
