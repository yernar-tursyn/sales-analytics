'use client'

import { useState, useEffect, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, AlertTriangle, TrendingUp, Users, ShoppingBag, ChefHat } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Notification {
  id: number
  type: 'warning' | 'info' | 'alert' | 'success'
  message: string
  icon: ElementType
  timestamp: Date
}

const notificationTemplates: Omit<Notification, 'id' | 'timestamp'>[] = [
  {
    type: 'warning',
    message: 'Заканчивается картофель фри (осталось менее 20%)',
    icon: AlertTriangle,
  },
  {
    type: 'info',
    message: 'Пиковая нагрузка ожидается через 30 минут',
    icon: TrendingUp,
  },
  {
    type: 'alert',
    message: 'Требуется дополнительный кассир в зал',
    icon: Users,
  },
  {
    type: 'success',
    message: 'Новая поставка продуктов прибудет через 15 минут',
    icon: ShoppingBag,
  },
  {
    type: 'info',
    message: 'Время приготовления заказов увеличилось на 2 минуты',
    icon: ChefHat,
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = () => {
    const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)]
    const newNotification: Notification = {
      id: Date.now(),
      ...template,
      timestamp: new Date(),
    }
    setNotifications(prev => [newNotification, ...prev].slice(0, 5))
  }

  useEffect(() => {
    addNotification()

    const interval = setInterval(addNotification, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Уведомления
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex items-start p-4 rounded-lg border ${
                    notification.type === 'warning'
                      ? 'bg-yellow-50 border-yellow-200'
                      : notification.type === 'info'
                      ? 'bg-blue-50 border-blue-200'
                      : notification.type === 'success'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <notification.icon
                    className={`mr-3 mt-1 flex-shrink-0 h-5 w-5 ${
                      notification.type === 'warning'
                        ? 'text-yellow-500'
                        : notification.type === 'info'
                        ? 'text-blue-500'
                        : notification.type === 'success'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
