import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { roomService } from "@/services/roomService"
import type { Room, RoomFormData, RoomFilter, ModalState } from "@/shared/types"

interface RoomState {
    items: Room[]
    selected: Room | null
    filter: RoomFilter
    pagination: { page: number; limit: number; total: number; totalPages: number }
    modal: ModalState
    isLoading: boolean
    isSubmitting: boolean
    error: string | null
}

const initialState: RoomState = {
    items: [],
    selected: null,
    filter: {},
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    modal: { isOpen: false, mode: 'add', selectedId: undefined },
    isLoading: false,
    isSubmitting: false,
    error: null,
}

export const fetchRooms = createAsyncThunk(
    'room/fetchAll',
    async (
        { filter, page, limit }: { filter?: RoomFilter; page?: number; limit?: number } = {},
        { rejectWithValue }
    ) => {
        try { return await roomService.getAll(filter, page, limit) }
        catch { return rejectWithValue('Không thể tải danh sách phòng') }
    }
)

export const fetchRoomsByFloor = createAsyncThunk(
    'room/fetchByFloor',
    async (floorId: string, { rejectWithValue }) => {
        try { return await roomService.getByFloor(floorId) }
        catch { return rejectWithValue('Không thể tải danh sách phòng') }
    }
)

export const createRoom = createAsyncThunk(
    'room/create',
    async ({ floorId, data }: { floorId: string; data: RoomFormData }, { rejectWithValue }) => {
        try { return await roomService.create(floorId, data) }
        catch { return rejectWithValue('Không thể thêm phòng') }
    }
)

export const updateRoom = createAsyncThunk(
    'room/update',
    async ({ id, data }: { id: string; data: Partial<RoomFormData> }, { rejectWithValue }) => {
        try { return await roomService.update(id, data) }
        catch { return rejectWithValue('Không thể cập nhật phòng') }
    }
)

export const deleteRoom = createAsyncThunk(
    'room/delete',
    async (id: string, { rejectWithValue }) => {
        try { await roomService.delete(id); return id }
        catch { return rejectWithValue('Không thể xoá phòng') }
    }
)

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
            state.selected = action.payload
        },
        setRoomFilter: (state, action: PayloadAction<RoomFilter>) => {
            state.filter = action.payload
            state.pagination.page = 1
        },
        setRoomPage: (state, action: PayloadAction<number>) => {
            state.pagination.page = action.payload
        },
        openRoomModal: (state, action: PayloadAction<{ mode: ModalState['mode']; selectedId?: string }>) => {
            state.modal = { isOpen: true, ...action.payload }
        },
        closeRoomModal: (state) => {
            state.modal = { isOpen: false, mode: 'add', selectedId: undefined }
            state.selected = null
        },
        clearRoomError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.data
                state.pagination = action.payload.meta
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

            .addCase(fetchRoomsByFloor.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRoomsByFloor.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
            })
            .addCase(fetchRoomsByFloor.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

            .addCase(createRoom.pending, (state) => {
                state.isSubmitting = true
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.isSubmitting = false
                state.items.unshift(action.payload)
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
            
            .addCase(updateRoom.pending, (state) => {
                state.isSubmitting = true
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.isSubmitting = false
                const idx = state.items.findIndex(r => r.id === action.payload.id)
                if (idx !== -1) state.items[idx] = action.payload
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.items = state.items.filter(r => r.id !== action.payload)
            })
    },
})

export const {
    setSelectedRoom,
    setRoomFilter,
    setRoomPage,
    openRoomModal,
    closeRoomModal,
    clearRoomError,
} = roomSlice.actions

export default roomSlice.reducer