"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import clientPromise from "@/db/db"
import { log } from "node:console"

export async function signUp(formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")

  if (!email || !password || !name) {
    return {
      error: "Please fill in all fields",
    }
  }

  try {
    const client = await clientPromise
    const db = client.db("ecom-Shop")
    const usersCollection = db.collection("new")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return {
        error: "User with this email already exists",
      }
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      healthScore: 78,
      assessments: 0,
      goals: 0,
      memberSince: new Date(),
    })

    return { success: true, userId: result.insertedId.toString() }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      error: "An error occurred during signup",
    }
  }
}

export async function login(formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return {
      error: "Please fill in all fields",
    }
  }

  try {
    const client = await clientPromise
    const db = client.db("ecom-Shop")
    const usersCollection = db.collection("new")

    // Find the user
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return {
        error: "Invalid email or password",
      }
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return {
        error: "Invalid email or password",
      }
    }

    return { success: true}
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "An error occurred during login",
    }
  }
}

export async function logout() {
  redirect("/login")
}

export async function getCurrentUser() {
  const userId = "6801650b70452d06ea06ec6c"

  try {
    const client = await clientPromise
    const db = client.db("ecom-Shop")
    const usersCollection = db.collection("new")

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user) {
      return null
    }

    const { password, ...userWithoutPassword } = user
    return JSON.parse(JSON.stringify(userWithoutPassword))
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function updateUserProfile(formData) {
  const userId = "6801650b70452d06ea06ec6c"

  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const location = formData.get("location")

  if (!name || !email) {
    return { error: "Name and email are required" }
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const usersCollection = db.collection("users")
 console.log(userId);
 
    if (email) {
      const existingUser = await usersCollection.findOne({
        email,
        _id: { $ne: new ObjectId(userId) },
      })

      if (existingUser) {
        return { error: "Email is already taken by another user" }
      }
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name,
          email,
          phone: phone || "",
          location: location || "",
          updated_at: new Date(),
        },
      }
    )

    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "An error occurred while updating your profile" }
  }
}
