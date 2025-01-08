'use client'

import { motion } from 'framer-motion'
import { Bell, BarChart, Map, PieChart, Package, Users, DollarSign, Clipboard, UserCheck } from 'lucide-react'

interface HeaderProps {
  setActiveSection: (section: string) => void
}

export default function Header({ setActiveSection }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-600 text-white shadow-md"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">McAnalytics Pro</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button onClick={() => setActiveSection('overview')} className="hover:text-yellow-300 transition-colors flex items-center">
                <PieChart size={20} className="mr-1" />
                <span className="hidden md:inline">Обзор</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('forecast')} className="hover:text-yellow-300 transition-colors flex items-center">
                <BarChart size={20} className="mr-1" />
                <span className="hidden md:inline">Прогноз</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('map')} className="hover:text-yellow-300 transition-colors flex items-center">
                <Map size={20} className="mr-1" />
                <span className="hidden md:inline">Карта</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('products')} className="hover:text-yellow-300 transition-colors flex items-center">
                <Package size={20} className="mr-1" />
                <span className="hidden md:inline">Продукты</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('customers')} className="hover:text-yellow-300 transition-colors flex items-center">
                <Users size={20} className="mr-1" />
                <span className="hidden md:inline">Клиенты</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('revenue')} className="hover:text-yellow-300 transition-colors flex items-center">
                <DollarSign size={20} className="mr-1" />
                <span className="hidden md:inline">Выручка</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('inventory')} className="hover:text-yellow-300 transition-colors flex items-center">
                <Clipboard size={20} className="mr-1" />
                <span className="hidden md:inline">Инвентарь</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('staff')} className="hover:text-yellow-300 transition-colors flex items-center">
                <UserCheck size={20} className="mr-1" />
                <span className="hidden md:inline">Персонал</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('notifications')} className="hover:text-yellow-300 transition-colors flex items-center">
                <Bell size={20} className="mr-1" />
                <span className="hidden md:inline">Уведомления</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

