'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface Restaurant {
  id: number
  name: string
  lat: number
  lon: number
  demand: 'Высокий' | 'Средний' | 'Низкий'
  sales: number
  visitors: number
}

interface Props {
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
}

const restaurants: Restaurant[] = [
  { id: 1, name: 'Ресторан A', lat: 55.7558, lon: 37.6173, demand: 'Высокий', sales: 1245300, visitors: 3240 },
  { id: 2, name: 'Ресторан B', lat: 55.7517, lon: 37.6178, demand: 'Средний', sales: 987600, visitors: 2580 },
  { id: 3, name: 'Ресторан C', lat: 55.7539, lon: 37.6208, demand: 'Низкий', sales: 654300, visitors: 1720 },
  { id: 4, name: 'Ресторан D', lat: 55.7522, lon: 37.6156, demand: 'Высокий', sales: 1356000, visitors: 3560 },
  { id: 5, name: 'Ресторан E', lat: 55.7544, lon: 37.6201, demand: 'Средний', sales: 876500, visitors: 2340 },
]

export default function RestaurantMap({ setSelectedRestaurant }: Props) {
  const [hoveredRestaurant, setHoveredRestaurant] = useState<Restaurant | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-yellow-400"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Карта ресторанов</h2>
      <div className="relative h-[600px] bg-yellow-50 rounded-md border border-yellow-200">
        {restaurants.map((restaurant) => (
          <motion.button
            key={restaurant.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ delay: 0.2 * restaurant.id }}
            className="absolute"
            style={{
              left: `${(restaurant.lon - 37.61) * 60000}px`,
              top: `${(55.76 - restaurant.lat) * 40000}px`,
            }}
            onClick={() => setSelectedRestaurant(restaurant)}
            onMouseEnter={() => setHoveredRestaurant(restaurant)}
            onMouseLeave={() => setHoveredRestaurant(null)}
          >
            <MapPin
              size={24}
              className={`${
                restaurant.demand === 'Высокий'
                  ? 'text-red-500'
                  : restaurant.demand === 'Средний'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            />
            <p className="text-xs font-medium text-gray-700">{restaurant.name}</p>
          </motion.button>
        ))}
      </div>
      {hoveredRestaurant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-white rounded-md shadow-md border border-yellow-200"
        >
          <h3 className="text-lg font-semibold text-red-600 mb-2">{hoveredRestaurant.name}</h3>
          <p className="text-sm text-gray-600">Спрос: <span className="font-medium">{hoveredRestaurant.demand}</span></p>
          <p className="text-sm text-gray-600">Продажи: <span className="font-medium">₸{hoveredRestaurant.sales.toLocaleString()}</span></p>
          <p className="text-sm text-gray-600">Посетители: <span className="font-medium">{hoveredRestaurant.visitors}</span></p>
        </motion.div>
      )}
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <p className="text-sm text-gray-600">Высокий спрос</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <p className="text-sm text-gray-600">Средний спрос</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <p className="text-sm text-gray-600">Низкий спрос</p>
        </div>
      </div>
    </motion.div>
  )
}
