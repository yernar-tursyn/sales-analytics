'use client'

import { motion } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

// Описывает структуру данных о ресторане
interface Restaurant {
  id: number
  name: string
  location?: string
}

// Описывает структуру метрики
interface Metric {
  name: string
  value: string
  change: number
}

// Описывает пропсы компонента, в том числе selectedRestaurant
interface MetricsOverviewProps {
  selectedRestaurant: Restaurant | null
}

const metrics: Metric[] = [
  { name: 'Продажи сегодня', value: '₸1,245,300', change: 12.5 },
  { name: 'Посетители', value: '3,240', change: -2.3 },
  { name: 'Средний чек', value: '₸384', change: 5.7 },
  { name: 'Популярное блюдо', value: 'Биг Мак', change: 8.1 },
]

export default function MetricsOverview({ selectedRestaurant }: MetricsOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Ключевые метрики</h2>

      {/* Пример использования selectedRestaurant */}
      {selectedRestaurant ? (
        <p className="text-lg text-gray-600 mb-4">
          Ресторан: <strong>{selectedRestaurant.name}</strong>
        </p>
      ) : (
        <p className="text-lg text-gray-600 mb-4">Ресторан не выбран</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-50 p-4 rounded-md border border-yellow-200"
          >
            <p className="text-sm text-gray-600 font-medium">{metric.name}</p>
            <p className="text-2xl font-bold text-red-600">{metric.value}</p>
            <div
              className={`flex items-center ${
                metric.change >= 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {metric.change >= 0 ? (
                <ArrowUpIcon size={16} />
              ) : (
                <ArrowDownIcon size={16} />
              )}
              <span className="ml-1 text-sm font-medium">
                {Math.abs(metric.change)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
