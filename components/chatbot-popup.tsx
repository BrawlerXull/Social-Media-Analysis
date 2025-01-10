"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatbotPopupProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  text: string
  sender: 'user' | 'bot'
}

export function ChatbotPopup({ isOpen, onClose }: ChatbotPopupProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you with your social media analytics today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: `Based on the analysis of your Instagram data, here’s what I found and recommend to boost your reach:
        
            Insights:
            - **Top-performing content**: Your Reels and carousel posts consistently receive higher engagement compared to static posts. Videos with engaging storytelling or humor tend to perform best.
            - **Audience activity**: Your audience is most active between 6 PM and 9 PM, especially on weekdays.
            - **Hashtag usage**: Posts with 10-15 relevant hashtags perform better. However, some hashtags are oversaturated, so niche ones are more effective.
            - **Engagement trends**: Content that sparks conversation (polls, questions, or controversial opinions) sees higher engagement.
        
            Recommendations:
            1. **Double down on Reels**: Create short, engaging videos with trending audio. Behind-the-scenes, how-tos, and transformation videos align well with your audience's interests.
            2. **Optimize captions**: Use storytelling or ask questions to encourage comments.
            3. **Consistency**: Post at least 4-5 times a week, focusing on quality over quantity.
            4. **Collaborations**: Partner with influencers or accounts in your niche to tap into new audiences.
            5. **Interactive Stories**: Use polls, quizzes, and Q&A to engage your audience daily.
            6. **Experiment**: Test new content formats like memes or infographics to see what resonates.
        
            If you'd like me to refine this based on your actual preferences or niche, let me know!`,
            sender: "bot",
          },
        ]);
        
      }, 1000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 right-4 w-80 z-50"
        >
          <Card className="w-full h-96 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat with AI Assistant</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>X</Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-full">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex w-full gap-2"
              >
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

