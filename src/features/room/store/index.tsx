import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { houseService, floorService, roomService } from "@/services/roomServive"

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
    houses: House[]
    selectedHouse: House | null

    floors: Floor[]
    selectedFloor: Floor | null

    rooms: Room[]
    selectedRoom: Room | null

    filter: RoomFilter

    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
    modal: ModalState

    isLoadingHouses: boolean
    isLoadingFloors: boolean
    isLoadingRooms: boolean
    isSubmitting: boolean

    error: string | null
}

const initialState: RoomState = {
    houses: [],
    selectedHouse: null,
    floors: [],
    selectedFloor: null,
    rooms: [],
    selectedRoom: null,
    filter: {},
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
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

export const fetchFloorsByHouse = createAsyncThunk(
    'room/fetchFloorsByHouse',
    async (houseId: string, { rejectWithValue }) => {
        try {
            return await floorService.getByHouse(houseId)
        } catch {
            return rejectWithValue('không thể tải danh sách tầng')
        }
    }
)

export const createFloor = createAsyncThunk('room/createFloor',
    async ({ houseId, floorNo }: { houseId: string; floorNo: number }, { rejectWithValue }) => {
        try {
            return await floorService.create(houseId, floorNo)
        } catch {
            return rejectWithValue('không thể thêm tầng')
        }
    }
)

export const deleteFloor = createAsyncThunk('room/deleteFloor', async (
    id: string, { rejectWithValue }) => {
    try {
        await floorService.delete(id)
        return id
    } catch {
        return rejectWithValue('Không thể xoá tầng')
    }
}
)

export const fetchRooms = createAsyncThunk('room/fetchRooms',
    async (
        {
            filter,
            page,
            limit,
        }: { filter?: RoomFilter; page?: number; limit?: number } = {}, { rejectWithValue }
    ) => {
        try {
            return await roomService.getAll(filter, page, limit)
        } catch {
            return rejectWithValue("không thể tải danh sách phòng")
        }
    }
)

export const fetchRoomsByFloor = createAsyncThunk('room/fecthRoomByFloor',
    async (floorId: string, { rejectWithValue }) => {
        try {
            return await roomService.getByFloor(floorId)
        } catch {
            return rejectWithValue("không thể tải danh sách phòng")
        }
    }
)

export const createRoom = createAsyncThunk('room/createRoom', async ({
    floorId, data }: { floorId: string; data: RoomFormData }, { rejectWithValue }) => {
    try {
        return await roomService.create(floorId, data)
    } catch {
        return rejectWithValue("Không thể thêm phòng")
    }
}
)

export const updateRoom = createAsyncThunk('room/updateRoom', async (
    { id, data }: { id: string; data: Partial<RoomFormData> }, { rejectWithValue }
) => {
    try {
        return await roomService.update(id, data)
    } catch {
        return rejectWithValue("Không thể cập nhật phòng")
    }
}
)

export const deleteRoom = createAsyncThunk('room/deleteRoom', async (
    id: string, { rejectWithValue }
) => {
    try {
        await roomService.delete(id)
        return id
    } catch {
        return rejectWithValue('Không thể xoá phòng')
    }
}
)


const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setSelectedHouse: (state, action: PayloadAction<House | null>) => {
            state.selectedHouse = action.payload
            state.selectedFloor = null
            state.rooms = []
        },
        setSelectedFloor: (state, action: PayloadAction<Floor | null>) => {
            state.selectedFloor = action.payload
        },
        setFilter: (state, action: PayloadAction<RoomFilter>) => {
            state.filter = action.payload
            state.pagination.page = 1
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.page = action.payload
        },
        openModal: (
            state,
            action: PayloadAction<{ mode: ModalState['mode'], selectedId?: string }>) => {
            state.modal.isOpen = true
            state.modal.mode = action.payload.mode
            state.modal.selectedId = action.payload.selectedId
        },
        closeModal: (state) => {
            state.modal = { isOpen: false, mode: 'add', selectedId: undefined }
            state.selectedRoom = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.isLoadingHouses = true
                state.error = null
            })
            .addCase(fetchHouses.fulfilled,(state , action)=>{
                state.isLoadingHouses = false
                state.houses = action.payload.data
                state.pagination = action.payload.meta
            })
            .addCase(fetchHouses.rejected,(state , action)=> {
                state.isLoadingHouses = false
                state.error = action.payload as string
            })
        builder
            .addCase(createHouse.pending,(state)=> {
                state.isSubmitting = true
            })
            .addCase(createHouse.fulfilled,(state ,action) => {
                state.isSubmitting = false
                state.houses.unshift(action.payload)
            })
            .addCase(createHouse.rejected,(state ,action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
        builder
            .addCase(updateHouse.pending , (state) => {
                state.isSubmitting = true
            })
            .addCase(updateHouse.fulfilled,(state , action) => {
                state.isSubmitting = false
                const idx = state.houses.findIndex((h) => h.id === action.payload.id)
                if( idx !== -1 ) state.houses[idx] = action.payload
            })
            .addCase(updateHouse.rejected, (state , action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
        builder
            .addCase(fetchFloorsByHouse.pending, (state) => {
                state.isLoadingFloors = true
            })
            .addCase(fetchFloorsByHouse.fulfilled,(state, action) => {
                state.isLoadingFloors = false
                state.floors = action.payload
            })
            .addCase(fetchFloorsByHouse.rejected,(state , action) => {
                state.isLoadingFloors = false
                state.error = action.payload as string
            })
        builder
            .addCase(createFloor.fulfilled , (state , action) => {
                state.floors.push(action.payload)
            })
        builder
            .addCase(deleteFloor.fulfilled ,(state ,action) => {
                state.floors = state.floors.filter((f) => f.id !== action.payload)
            })
        builder
            .addCase(fetchRooms.pending , (state) => {
                state.isLoadingRooms = true
                state.error = null
            })
            .addCase(fetchRooms.fulfilled , (state ,action) => {
                state.isLoadingRooms = false
                state.rooms = action.payload.data
                state.pagination = action.payload.meta
            })
            .addCase(fetchRooms.rejected,(state , action)=>{
                state.isLoadingRooms = false
                state.error = action.payload as string
            })
        builder
            .addCase(createRoom.pending,(state)=> {
                state.isSubmitting = true
            })
            .addCase(createRoom.fulfilled ,(state,action)=> {
                state.isSubmitting =false
                state.rooms.unshift(action.payload)
            })
            .addCase(createRoom.rejected,(state,action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
        builder
            .addCase(updateRoom.pending ,(state) => {
                state.isSubmitting = true
            })
            .addCase(updateRoom.fulfilled , (state ,action) => {
                state.isSubmitting = false
                const idx = state.rooms.findIndex((r) => r.id === action.payload.id)
                if( idx!== -1) state.rooms[idx] = action.payload
            })
            .addCase(updateRoom.rejected , (state , action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
        builder
            .addCase(deleteRoom.fulfilled,(state , action) => {
                state.rooms = state.rooms.filter((r) => r.id !== action.payload)
            })
    }
        
})

export const {
    setSelectedHouse,
    setSelectedFloor,
    setFilter,
    setPage,
    openModal,
    clearError,
} = roomSlice.actions

export default roomSlice.reducer

