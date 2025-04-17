import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the first intro screen
  redirect("/intro/1")
}
