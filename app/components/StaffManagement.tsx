'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from 'lucide-react'

interface StaffShift {
  id: number
  name: string
  position: string
  shift: string
  date: string
}

const initialShifts: StaffShift[] = [
  { id: 1, name: 'Иван Петров', position: 'Кассир', shift: 'Утро', date: '2023-05-15' },
  { id: 2, name: 'Анна Сидорова', position: 'Повар', shift: 'День', date: '2023-05-15' },
  { id: 3, name: 'Петр Иванов', position: 'Менеджер', shift: 'Вечер', date: '2023-05-15' },
  { id: 4, name: 'Мария Кузнецова', position: 'Кассир', shift: 'Утро', date: '2023-05-16' },
]

export default function StaffManagement() {
  const [shifts, setShifts] = useState(initialShifts)
  const [newShift, setNewShift] = useState({
    name: '',
    position: '',
    shift: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleAddShift = () => {
    if (newShift.name && newShift.position && newShift.shift && newShift.date) {
      setShifts([...shifts, { id: shifts.length + 1, ...newShift }])
      setNewShift({
        name: '',
        position: '',
        shift: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-600">Расписание персонала</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Имя сотрудника"
            value={newShift.name}
            onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
            className="flex-1 min-w-[200px]"
          />
          <Input
            placeholder="Должность"
            value={newShift.position}
            onChange={(e) => setNewShift({ ...newShift, position: e.target.value })}
            className="flex-1 min-w-[200px]"
          />
          <Select
            value={newShift.shift}
            onValueChange={(value) => setNewShift({ ...newShift, shift: value })}
          >
            <SelectTrigger className="flex-1 min-w-[200px]">
              <SelectValue placeholder="Выберите смену" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Утро">Утро</SelectItem>
              <SelectItem value="День">День</SelectItem>
              <SelectItem value="Вечер">Вечер</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1 min-w-[200px] relative">
            <Input
              type="date"
              value={newShift.date}
              onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
              className="w-full"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <Button
            onClick={handleAddShift}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[200px]"
          >
            Добавить смену
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Сотрудник</TableHead>
              <TableHead className="font-semibold">Должность</TableHead>
              <TableHead className="font-semibold">Смена</TableHead>
              <TableHead className="font-semibold">Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell className="font-medium">{shift.name}</TableCell>
                <TableCell>{shift.position}</TableCell>
                <TableCell>{shift.shift}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {shift.date}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

