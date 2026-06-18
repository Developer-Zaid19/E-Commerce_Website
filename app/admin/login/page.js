"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setisSubmitting(true)
      console.log("Button clicked");
      const login = await signIn("credentials", {
        redirect: false,
        username: name,
        password: password,
      });
      if (login.ok) {
        alert("signin successfully");
        router.push("/admin/dashboard");
      } else {
        alert("Invalid username or password");
      }
      setisSubmitting(false)
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background) px-4 text-white">
      <form
        className="w-full max-w-md bg-(--background-card) shadow-lg rounded-2xl p-8 space-y-6 border border-(--border)"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Enter in your account
        </h2>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="name@example.com"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full p-3 rounded-lg bg-(--background-subtle) text-gray-100 border border-(--border)focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder:text-gray-500"
          />

        </div>

        {/* Password */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            placeholder="••••••••"
            className="w-full p-3 pr-10 rounded-lg bg-(--background-subtle) text-gray-100 border border-(--border) focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder:text-gray-500"
            onChange={(e) => setpassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 mt-4 bg-(--brand) hover:bg-(--brand-hover) text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition focus:outline-none focus:ring-4 focus:ring-green-300 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}
