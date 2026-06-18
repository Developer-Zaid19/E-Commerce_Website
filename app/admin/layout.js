"use client"
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";


export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/products/add">Add Product</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1">
        <header className="border-b p-4 flex gap-2 justify-between">
          <div className=''>Admin Dashboard</div>
          <button className="text-white bg-(--brand) px-2 py-1 rounded-md font-semibold" onClick={() => signOut()}>Signout</button>
          
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}