'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MessageSquare, Loader2, Send } from 'lucide-react'
import { fetchMessages, sendMessage, markMessageRead } from '@/lib/api-client'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/utils/constants'
import Link from 'next/link'

export default function MessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await fetchMessages()
      setMessages(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async (msg: any) => {
    setSelected(msg)
    if (!msg.is_read && msg.recipient_id === user?.id) {
      try {
        await markMessageRead(msg.id)
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
      } catch (e) {}
    }
  }

  const inbox = messages.filter(m => m.recipient_id === user?.id)
  const sent = messages.filter(m => m.sender_id === user?.id)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Сообщения</h1>
        <p className="text-muted-foreground">Переписка с работодателями</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-3">Входящие ({inbox.length})</h2>
          {inbox.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground"><MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />Нет входящих сообщений</CardContent></Card>
          ) : (
            <div className="space-y-2">
              {inbox.map(msg => (
                <Card key={msg.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!msg.is_read ? 'border-primary/40 bg-blue-50/30' : ''}`} onClick={() => handleSelect(msg)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate text-sm ${!msg.is_read ? 'text-primary' : ''}`}>{msg.title || 'Без темы'}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{new Date(msg.created_at).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Отправленные ({sent.length})</h2>
          {sent.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground"><Send className="w-10 h-10 mx-auto mb-2 opacity-30" />Нет отправленных</CardContent></Card>
          ) : (
            <div className="space-y-2">
              {sent.map(msg => (
                <Card key={msg.id} className="cursor-pointer hover:shadow-md" onClick={() => handleSelect(msg)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate text-sm">{msg.title || 'Без темы'}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{new Date(msg.created_at).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{selected.title || 'Без темы'}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>✕</Button>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{selected.content}</p>
            <p className="text-xs text-muted-foreground mt-3">{new Date(selected.created_at).toLocaleString('ru-RU')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
