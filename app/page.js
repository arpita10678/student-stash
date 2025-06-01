"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Student Stash</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">BMSCE Student Marketplace</h2>
          <p className="text-xl text-gray-600 mb-8">Buy and sell second-hand items within our campus community</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 inline-block">
            <p className="text-yellow-800 text-sm">🎓 Exclusively for BMSCE students and graduates</p>
          </div>
        </div>

        {user ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link
              href="/buy"
              className="group bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
            >
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Buy Items</h3>
              <p className="text-gray-600">Browse and purchase second-hand items from fellow students</p>
              <div className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-lg group-hover:bg-green-600 transition-colors">
                Start Shopping
              </div>
            </Link>

            <Link
              href="/sell"
              className="group bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
            >
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sell Items</h3>
              <p className="text-gray-600">List your items and connect with potential buyers</p>
              <div className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg group-hover:bg-blue-600 transition-colors">
                Start Selling
              </div>
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Please sign in to continue</h3>
              <p className="text-gray-600 mb-6">
                You need to be logged in with your BMSCE email to access the marketplace
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Student Stash - BMSCE Campus Marketplace</p>
        </div>
      </footer>
    </div>
  )
}
