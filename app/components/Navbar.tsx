import Link from "next/link";
import React from "react";
import { UserButton, } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="bg-[#131111] text-white">
      <div className="p-6 max-w-7xl m-auto flex items-center justify-between  shadow-xl z-40 ">
        <div>Kiprono AI</div>
        <div className="flex gap-2">
        <UserButton afterSignOutUrl="/"/>
        <button className="text-lg border px-2">+</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
