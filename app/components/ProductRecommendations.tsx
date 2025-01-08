'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const productData = [
  { name: 'Биг Мак', sales: 1245, revenue: 373500 },
  { name: 'Чикен Макнаггетс', sales: 980, revenue: 245000 },
  { name: 'Картофель фри', sales: 1560, revenue: 234000 },
  { name: 'Макфлури', sales: 720, revenue: 144000 },
  { name: 'Чизбургер', sales: 1350, revenue: 202500 },
]

export default function ProductRecommendations({ selectedRestaurant }) {
  const [recommendations, setRecommendations] = useState('')

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { text } = await generateText({
          model: openai('gpt-4o'),
          prompt: `Based on the following product data for a McDonald's restaurant, provide personalized product recommendations and promotional strategies:
          ${JSON.stringify(productData)}
          Consider factors like sales volume, revenue, and potential for upselling or cross-selling.`,
        })
        setRecommendations(text)
      } catch (error) {
        console.error('Error fetching AI recommendations:', error)
        setRecommendations('Unable to generate AI recommendations at this time.')
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">ИИ Рекомендации по Продуктам</h2>
      {selectedRestaurant && (
        <p className="text-lg text-gray-600 mb-4">Данные для ресторана: {selectedRestaurant.name}</p>
      )}
      <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Персонализированные Рекомендации</h3>
        <p className="text-gray-700 whitespace-pre-line">{recommendations}</p>
      </div>
    </motion.div>
  )
}

