
import apiClient from "./apiClient";
import type {
    House,
    Floor,
    Room,
    RoomFormData,
    HouseFormData,
    PaginatedResponse,
    ApiResponse,
    RoomFilter,
} from '@/shared/types'


const HouseServices = {
    getAll: async (page = 1 , limit = 10 ) : Promise<PaginatedResponse<House>> => {
        const response = await apiClient.get('/houses' , {
            params: {page , limit}
        })
        return response.data
    },
    getById: async (id: string): Promise<House> => {
        const response = await apiClient.get(`/houses/${id}`)
        return response.data
    },
    create: async(data:HouseFormData): Promise<House> => {
        const response = await apiClient.post(`/houses/` , data)
        return response.data 
    },
    update: async(id:string , data:HouseFormData): Promise<House> => {
        const response = await apiClient.put(`/houses/${id}` , data)
        return response.data
    },
    delete: async(id:string):Promise<void> => {
        await apiClient.delete(`/houses/${id}`)
    },

}

const FloorServices = {
    getByHouse:async(housesId:string): Promise<Floor[]> => {
        const response = await apiClient.get(`/houses/${housesId}/floors`)
        return response.data
    },
    getById: async(id:string): Promise<Floor> => {
        const response = await apiClient.get(`/floors/${id}`)
        return response.data
    },
    creates : async(houseId: string , floorNo:number) : Promise<Floor> => {
        const response = await apiClient.post(`/houses/${houseId}/floors` , {
            floorNo
        })
        return response.data
    },
    delete : async(id:string): Promise<void> => {
        await apiClient.delete(`/floors/${id}`)
    },
}

const RoomService = {
    getAll:async (
        filter?:RoomFilter,
        page =1,
        limit = 10
    ): Promise<PaginatedResponse<Room>> => {
        const response = await apiClient.get(`/rooms` , {
            params : { ...filter,page,limit},
        })
        return response.data
    },
    getByFloor: async (floorId: string): Promise<Room[]> => {
        const response = await apiClient.get(`/floors/${floorId}/rooms`)
        return response.data
    },
    create: async (floorID : string , data :RoomFormData): Promise<Room> => {
        const response = await apiClient.post(`/floors/${floorID}/rooms` , data)
        return response.data
    },
    update: async(id:string , data:Partial<RoomFormData>): Promise<Room> => {
        const response = await apiClient.put(`/rooms/${id}` , data)
        return response.data
    },
    delete: async(id:string): Promise<void> => {
        await apiClient.delete(`/rooms/${id}`)
    },
}

export {HouseServices , FloorServices , RoomService}

export type {ApiResponse}