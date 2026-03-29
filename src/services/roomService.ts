import apiClient from "./apiClient"
import type {
    House, Floor, Room, HouseTree,
    RoomFormData, HouseFormData,
    PaginatedResponse, RoomFilter,
} from '@/shared/types'

export const houseService = {
    getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<House>> => {
        const response = await apiClient.get('/houses', { params: { page, limit } })
        return response.data
    },
    getByLandlord: async (landlordId: string, page = 1, limit = 10): Promise<PaginatedResponse<House>> => {
        const response = await apiClient.get(`/houses/landlord/${landlordId}`, {
            params: { page, limit }
        })
        return response.data
    },
    getById: async (id: string): Promise<House> => {
        const response = await apiClient.get(`/houses/${id}`)
        return response.data
    },

    getTree: async (houseId: string): Promise<HouseTree> => {
        const response = await apiClient.get(`/houses/${houseId}/tree`)
        return response.data
    },
    create: async (data: HouseFormData): Promise<House> => {
        const response = await apiClient.post('/houses', data)
        return response.data
    },
    update: async (id: string, data: HouseFormData): Promise<House> => {
        const response = await apiClient.put(`/houses/${id}`, data)
        return response.data
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/houses/${id}`)
    },
}

export const floorService = {

    getByHouse: async (houseId: string): Promise<Floor[]> => {
        const response = await apiClient.get(`/floors/house/${houseId}`)
        return response.data
    },
    getById: async (id: string): Promise<Floor> => {
        const response = await apiClient.get(`/floors/${id}`)
        return response.data
    },

    create: async (houseId: string, floorNo: number): Promise<Floor> => {
        const response = await apiClient.post('/floors', { houseId, floorNo })
        return response.data
    },
    update: async (id: string, floorNo: number): Promise<Floor> => {
        const response = await apiClient.put(`/floors/${id}`, { floorNo })
        return response.data
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/floors/${id}`)
    },
}

export const roomService = {
    getAll: async (
        filter?: RoomFilter,
        page = 1,
        limit = 10
    ): Promise<PaginatedResponse<Room>> => {
        const response = await apiClient.get('/rooms', {
            params: { ...filter, page, limit },
        })
        return response.data
    },

    getByFloor: async (floorId: string): Promise<Room[]> => {
        const response = await apiClient.get(`/rooms/floor/${floorId}`)
        return response.data
    },
    getById: async (id: string): Promise<Room> => {
        const response = await apiClient.get(`/rooms/${id}`)
        return response.data
    },

    create: async (floorId: string, data: RoomFormData): Promise<Room> => {
        const response = await apiClient.post('/rooms', { floorId, ...data })
        return response.data
    },
    update: async (id: string, data: Partial<RoomFormData>): Promise<Room> => {
        const response = await apiClient.put(`/rooms/${id}`, data)
        return response.data
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/rooms/${id}`)
    },
}