'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const initialData = [
  { name: '12:00', Бургеры: 400, Напитки: 240, Картошка: 320 },
  { name: '13:00', Бургеры: 300, Напитки: 139, Картошка: 220 },
  { name: '14:00', Бургеры: 200, Напитки: 980, Картошка: 290 },
  { name: '15:00', Бургеры: 278, Напитки: 390, Картошка: 200 },
  { name: '16:00', Бургеры: 189, Напитки: 480, Картошка: 210 },
  { name: '17:00', Бургеры: 239, Напитки: 380, Картошка: 250 },
  { name: '18:00', Бургеры: 349, Напитки: 430, Картошка: 410 },
]

export default function DemandForecast({ selectedRestaurant }) {
  const [activeProduct, setActiveProduct] = useState('all')
  const [data, setData] = useState(initialData)
  const [aiInsight, setAiInsight] = useState('')
  const [isAIEnabled, setIsAIEnabled] = useState(true)

  useEffect(() => {
    const fetchAIForecast = async () => {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        console.warn('OpenAI API key is not set. AI forecast will be disabled.')
        setIsAIEnabled(false)
        return
      }

      try {
        const { text } = await generateText({
          model: openai('gpt-4o'),
          prompt: `Based on the following sales data for a McDonald's restaurant, provide a short forecast for the next 2 hours and any insights:
          ${JSON.stringify(data)}
          Consider factors like time of day, current trends, and popular items.`,
        })
        setAiInsight(text)
      } catch (error) {
        console.error('Error fetching AI forecast:', error)
        setAiInsight('Unable to generate AI forecast at this time.')
        setIsAIEnabled(false)
      }
    }

    if (isAIEnabled) {
      fetchAIForecast()
    }
  }, [data, isAIEnabled])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Прогноз спроса {isAIEnabled && '(с ИИ)'}</h2>
      {selectedRestaurant && (
        <p className="text-lg text-gray-600 mb-4">Данные для ресторана: {selectedRestaurant.name}</p>
      )}
      <div className="mb-4">
        <select
          value={activeProduct}
          onChange={(e) => setActiveProduct(e.target.value)}
          className="border border-yellow-400 rounded p-2 bg-yellow-50 text-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="all">Все продукты</option>
          <option value="Бургеры">Бургеры</option>
          <option value="Напитки">Напитки</option>
          <option value="Картошка">Картошка</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
          <XAxis dataKey="name" stroke="#b91c1c" />
          <YAxis stroke="#b91c1c" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #fbbf24' }} />
          <Legend />
          {(activeProduct === 'all' || activeProduct === 'Бургеры') && (
            <Line type="monotone" dataKey="Бургеры" stroke="#ef4444" strokeWidth={2} />
          )}
          {(activeProduct === 'all' || activeProduct === 'Напитки') && (
            <Line type="monotone" dataKey="Напитки" stroke="#3b82f6" strokeWidth={2} />
          )}
          {(activeProduct === 'all' || activeProduct === 'Картошка') && (
            <Line type="monotone" dataKey="Картошка" stroke="#f59e0b" strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
      {isAIEnabled && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
          <h3 className="text-lg font-semibold text-red-600 mb-2">ИИ Прогноз и Аналитика</h3>
          <p className="text-gray-700">{aiInsight}</p>
        </div>
      )}
    </motion.div>
  )
}

