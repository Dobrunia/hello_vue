import type { Task } from '@/types/tasks'
import { apiClient } from './client'

const API_BASE = 'https://reqres.in/api/users'

interface ReqresUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface ReqresResponse {
  data: ReqresUser[]
}

export const tasksApi = {
  async getAll(): Promise<Task[]> {
    const response = await apiClient.get<ReqresResponse>(API_BASE, {
      'x-api-key': 'reqres-free-v1',
    })

    // Маппим пользователей в задачи
    return response.data.map(user => ({
      id: String(user.id),
      title: user.first_name,
      done: false,
    }))
  },
}
