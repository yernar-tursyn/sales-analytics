'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DemandForecast from './components/DemandForecast'
import RestaurantMap from './components/RestaurantMap'
import Notifications from './components/Notifications'
import MetricsOverview from './components/MetricsOverview'
import Header from './components/Header'
import ProductPerformance from './components/ProductPerformance'
import CustomerSegmentation from './components/CustomerSegmentation'
import RevenueAnalysis from './components/RevenueAnalysis'
import ProductRecommendations from './components/ProductRecommendations'
import InventoryManagement from './components/InventoryManagement'
import StaffManagement from './components/StaffManagement'

interface Restaurant {
  id: number
  name: string
  location?: string
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>('overview')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <MetricsOverview selectedRestaurant={selectedRestaurant} />
      case 'forecast':
        return <DemandForecast selectedRestaurant={selectedRestaurant} />
      case 'map':
        return <RestaurantMap setSelectedRestaurant={setSelectedRestaurant} />
      case 'notifications':
        return <Notifications />
      case 'products':
        return <ProductPerformance selectedRestaurant={selectedRestaurant} />
      case 'customers':
        return <CustomerSegmentation selectedRestaurant={selectedRestaurant} />
      case 'revenue':
        return <RevenueAnalysis selectedRestaurant={selectedRestaurant} />
      case 'recommendations':
        return <ProductRecommendations selectedRestaurant={selectedRestaurant} />
      case 'inventory':
        return <InventoryManagement />
      case 'staff':
        return <StaffManagement />
      default:
        return <MetricsOverview selectedRestaurant={selectedRestaurant} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-600 mb-8 text-center"
        >
          Расширенная аналитика продаж и управление ресторанами с ИИ
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
