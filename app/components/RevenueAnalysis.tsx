'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Restaurant {
  name: string
  location?: string
}

interface Props {
  selectedRestaurant: Restaurant | null
}

const revenueData = [
  { month: 'Янв', revenue: 1000000, profit: 200000 },
  { month: 'Фев', revenue: 1200000, profit: 240000 },
  { month: 'Мар', revenue: 1100000, profit: 220000 },
  { month: 'Апр', revenue: 1300000, profit: 260000 },
  { month: 'Май', revenue: 1500000, profit: 300000 },
  { month: 'Июн', revenue: 1400000, profit: 280000 },
]

export default function RevenueAnalysis({ selectedRestaurant }: Props) {
  const [dataType, setDataType] = useState<'revenue' | 'profit'>('revenue')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Анализ выручки и прибыли</h2>
      {selectedRestaurant && (
        <p className="text-lg text-gray-600 mb-4">Данные для ресторана: {selectedRestaurant.name}</p>
      )}
      <div className="mb-4">
        <label htmlFor="dataType" className="mr-2 text-gray-700">Показать:</label>
        <select
          id="dataType"
          value={dataType}
          onChange={(e) => setDataType(e.target.value as 'revenue' | 'profit')}
          className="border border-yellow-400 rounded p-2 bg-yellow-50 text-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="revenue">Выручка</option>
          <option value="profit">Прибыль</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
          <XAxis dataKey="month" stroke="#b91c1c" />
          <YAxis stroke="#b91c1c" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #fbbf24' }} />
          <Legend />
          {dataType === 'revenue' ? (
            <Line type="monotone" dataKey="revenue" stroke="#ef4444" name="Выручка (₸)" />
          ) : (
            <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Прибыль (₸)" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
