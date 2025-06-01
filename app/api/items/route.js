import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Item from "@/models/Item"

export async function GET() {
  try {
    await connectDB()

    const items = await Item.find().populate("seller", "name email").sort({ createdAt: -1 })

    return NextResponse.json(items, { status: 200 })
  } catch (error) {
    console.error("Get items error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    const { name, description, price, contactNumber } = await request.json()

    // Validate input
    if (!name || !description || !price || !contactNumber) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Create item
    const item = await Item.create({
      name,
      description,
      price: Number(price),
      contactNumber,
      seller: decoded.userId,
    })

    // Populate seller info
    await item.populate("seller", "name email")

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Create item error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
