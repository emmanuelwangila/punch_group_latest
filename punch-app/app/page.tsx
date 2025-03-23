import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen rounded-md  m-4 p-4 font-sans">
      <h1 className="text-blue-500 flex justify-center  ">
        Welcome to Punch Group
      </h1>
    </div>
  );
}
