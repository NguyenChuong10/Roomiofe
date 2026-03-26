import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { houseService, floorService, RoomService } from "@/services/roomServive"

import type {
    House,
    Floor,
    Room,
    RoomFormData,
    HouseFormData,
    RoomFilter,
    ModalState,
} from '@/shared/types'

interface RoomState {
    house: House[]
    selectedHouse: House | null

    floors: Floor[]
    selectedFloor: Floor | null

    room: Room[]
    selectedRoom: Room | null

    filter: RoomFilter

    pagination: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
    modal: ModalState

    isLoadingHouses: boolean
    isLoadingFloors: boolean
    isLoadingRooms: boolean
    isSubmitting: boolean

    error: string | null
}

const initialState: RoomState = {
    house: [],
    selectedHouse: null,
    floors: [],
    selectedFloor: null,
    room: [],
    selectedRoom: null,
    filter: {},
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 1,
    },
    modal: {
        isOpen: false,
        mode: 'add',
        selectedId: undefined
    },
    isLoadingHouses: false,
    isLoadingFloors: false,
    isLoadingRooms: false,
    isSubmitting: false,
    error: null
}


export const fetchHouses = createAsyncThunk('room/fetchHouses', async (
    { page, limit }: { page?: number; limit?: number } = {},
    { rejectWithValue }
) => {
    try {
        return await houseService.getAll(page, limit)
    } catch {
        return rejectWithValue('không thể tải danh sách nhà ')
    }
}
)

export const createHouse = createAsyncThunk('room/createHouse', async (
    data: HouseFormData,
    { rejectWithValue }
) => {
    try {
        return await houseService.create(data)
    } catch {
        return rejectWithValue('Không thể thêm phòng  ')
    }
}
)

export const updateHouse = createAsyncThunk('room/updateHouse', async (
    { id, data }: { id: string; data: HouseFormData },
    { rejectWithValue }
) => {
    try {
        return await houseService.update(id, data)
    } catch {
        return rejectWithValue('không thể cập nhật nhà ')
    }
}
)

export const deleteHouse = createAsyncThunk('/room/deleteHouse', async (
    id: string, { rejectWithValue }) => {
    try {
        await houseService.delete(id)
        return id
    } catch {
        return rejectWithValue('không thể xoá phòng')
    }
}
)

export const fetchFloorByHouse = createAsyncThunk(
    'room/fetchFloorsByHouse',
    async (houseId:string , {rejectWithValue} )=>{
        try {
            return await floorService.getByHouse(houseId)
        } catch {
            return rejectWithValue('không thể tải danh sách tầng')
        }
    }
)

export const createFloor = createAsyncThunk('room/createFloor' , 
    async({houseId , floorNo }:{houseId : string ; floorNo : number},{rejectWithValue} )=>{
        try {
            return await floorService.create(houseId , floorNo)
        } catch {
            return rejectWithValue('không thể thêm tầng')
        }
    }
)

export const deleteFloor = createAsyncThunk('room/deleteFloor', async(
    id:string , {rejectWithValue}) => {
        try{
            await floorService.delete(id)
            return id
        }catch {
            return rejectWithValue('Không thể xoá tầng')
        }
    }
)

export const fetchRooms = createAsyncThunk('room/fetchRooms')