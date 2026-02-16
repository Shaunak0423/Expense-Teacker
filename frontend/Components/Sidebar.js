"use client";
import Link from "next/link";
import Image from 'next/image';
import logo_image from '../Images/App-Logo.png'

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-30 w-60 bg-[#cfa2e6] items-center text-white min-h-screen p-5">
    <div className="flex flex-col gap-2">
        <Image className="h-24 w-24 rounded-full" src={logo_image} alt="Logo Image"/>
        <h2 className="text-xl font-bold">Expense App</h2>
    </div>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="hover:text-blue-400">
          All Expenses
        </Link>
        <Link href="/dashboard/add" className="hover:text-blue-400">
          Add Expense
        </Link>
      </nav>
    </div>
  );
}
