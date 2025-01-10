"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to Analytics Dashboard</h1>
        <p className="text-xl mb-8">Analyze your social media engagement data with ease</p>
        <Link href="/user-data">
          <Button size="lg">
            View Your Data
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

