'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus } from 'lucide-react'

interface InventoryItem {
  id: number
  name: string
  quantity: number
  unit: string
  status: 'normal' | 'low' | 'critical'
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: 'Булочки', quantity: 500, unit: 'шт', status: 'normal' },
  { id: 2, name: 'Котлеты', quantity: 300, unit: 'шт', status: 'normal' },
  { id: 3, name: 'Картофель фри', quantity: 150, unit: 'кг', status: 'low' },
  { id: 4, name: 'Кола', quantity: 200, unit: 'л', status: 'normal' },
]

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory)

  const updateQuantity = (id: number, change: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change)
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity < 100 ? 'critical' : newQuantity < 200 ? 'low' : 'normal'
        }
      }
      return item
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-600">Управление инвентарем</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Наименование</TableHead>
              <TableHead className="font-semibold">Количество</TableHead>
              <TableHead className="font-semibold">Действия</TableHead>
              <TableHead className="font-semibold">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity} {item.unit}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-red-100 hover:bg-red-200"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-green-100 hover:bg-green-200"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.status === 'critical' ? 'border-red-500 text-red-500' :
                      item.status === 'low' ? 'border-yellow-500 text-yellow-500' :
                      'border-green-500 text-green-500'
                    }
                  >
                    {item.status === 'critical' ? 'Критический' :
                     item.status === 'low' ? 'Низкий' : 'Нормальный'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

