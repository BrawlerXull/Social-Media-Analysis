"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MessageCircle } from 'lucide-react'
import { ChatbotPopup } from '@/components/chatbot-popup'

const fetchUserData = async (username: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    engagementData: [
      { type: 'Carousel', likes: 150, shares: 30, comments: 25 },
      { type: 'Reels', likes: 300, shares: 80, comments: 50 },
      { type: 'Static Image', likes: 100, shares: 20, comments: 15 },
    ],
    insights: [
      'Carousel posts have 20% higher engagement than static posts.',
      'Reels drive 2x more comments compared to other formats.',
    ],
  }
}

export default function UserData() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = await fetchUserData(username)
    setUserData(data)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Data'}
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Engagement Data</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Post Type</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.engagementData.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.likes}</TableCell>
                        <TableCell>{item.shares}</TableCell>
                        <TableCell>{item.comments}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>



            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {userData.insights.map((insight: string, index: number) => (
                    <li key={index} className="mb-2">{insight}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="rounded-full w-12 h-12 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      <ChatbotPopup isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}

