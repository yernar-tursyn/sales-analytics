'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const productData = [
  { name: 'Биг Мак', sales: 1245, revenue: 373500 },
  { name: 'Чикен Макнаггетс', sales: 980, revenue: 245000 },
  { name: 'Картофель фри', sales: 1560, revenue: 234000 },
  { name: 'Макфлури', sales: 720, revenue: 144000 },
  { name: 'Чизбургер', sales: 1350, revenue: 202500 },
]

export default function ProductPerformance({ selectedRestaurant }) {
  const [sortBy, setSortBy] = useState('sales')

  const sortedData = [...productData].sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Анализ производительности продуктов</h2>
      {selectedRestaurant && (
        <p className="text-lg text-gray-600 mb-4">Данные для ресторана: {selectedRestaurant.name}</p>
      )}
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2 text-gray-700">Сортировать по:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-yellow-400 rounded p-2 bg-yellow-50 text-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="sales">Продажам</option>
          <option value="revenue">Выручке</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
          <XAxis dataKey="name" stroke="#b91c1c" />
          <YAxis stroke="#b91c1c" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #fbbf24' }} />
          <Legend />
          <Bar dataKey="sales" fill="#ef4444" name="Продажи (шт.)" />
          <Bar dataKey="revenue" fill="#3b82f6" name="Выручка (₽)" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

