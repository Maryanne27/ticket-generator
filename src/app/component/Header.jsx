"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useRouter } from "next/navigation";

function Header() {
const router = useRouter();
return (
  <header className="w-full font-jeju  py-4 px-1 md:px-1 lg:px-10">
    <div className="max-w-6xl mx-auto h-[76px] flex justify-between items-center bg-headerBg border border-blue1  p-3 md:p-4 lg:p-5  backdrop-blur-[2px] rounded-[20px]">
      <div onClick={() => router.push("/")}>
        <Image
          src={logo}
          alt="logo"
          className="w-20 md:w-32 cursor-pointer"
        />
      </div>

      <nav className="hidden lg:flex space-x-8 text-lg font-normal">
        <Link href="#" className="text-white hover:text-white">
          Events
        </Link>
        <Link href="#" className="text-gray hover:text-white">
          My Tickets
        </Link>
        <Link href="#" className="text-gray hover:text-white">
          About Project
        </Link>
      </nav>

      <button className="bg-white text-black md:px-4 py-2 px-2  rounded-lg shadow hover:bg-blue1 hover:text-white">
        MY TICKETS →
      </button>
    </div>
  </header>
);
}

export default Header;
