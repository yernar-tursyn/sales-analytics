'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

interface Restaurant {
  name: string
  location?: string
}

const customerData = [
  { name: 'Новые клиенты', value: 30 },
  { name: 'Случайные посетители', value: 25 },
  { name: 'Постоянные клиенты', value: 35 },
  { name: 'VIP-клиенты', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface Props {
  selectedRestaurant: Restaurant
}

export default function CustomerSegmentation({ selectedRestaurant }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [aiInsight, setAiInsight] = useState('')

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    const fetchAIInsight = async () => {
      try {
        const { text } = await generateText({
          model: openai('gpt-4o'),
          prompt: `На основе следующих данных сегментации клиентов для ресторана McDonald's предоставьте инсайты и рекомендации:
          ${JSON.stringify(customerData)}
          Учитывайте стратегии для увеличения лояльности клиентов и привлечения новых.`,
        })
        setAiInsight(text)
      } catch (error) {
        console.error('Ошибка при получении данных ИИ:', error)
        setAiInsight('Здесь будут представлены ИИ-аналитика, рекомендации и другие связанные функции.')
      }
    }

    fetchAIInsight()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Сегментация клиентов (с ИИ)</h2>
      {selectedRestaurant && (
        <p className="text-lg text-gray-600 mb-4">Данные для ресторана: {selectedRestaurant.name}</p>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={customerData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {customerData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <h3 className="text-lg font-semibold text-red-600 mb-2">ИИ Аналитика и Рекомендации</h3>
        <p className="text-gray-700">{aiInsight}</p>
      </div>
    </motion.div>
  )
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} клиентов`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}
