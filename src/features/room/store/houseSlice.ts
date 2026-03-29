import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { houseService } from "@/services/roomService"
import type { House, HouseFormData, ModalState } from "@/shared/types"

interface HouseState {
    items: House[]
    selected: House | null
    pagination: { page: number; limit: number; total: number; totalPages: number }
    modal: ModalState
    isLoading: boolean
    isSubmitting: boolean
    error: string | null
}

const initialState: HouseState = {
    items: [],
    selected: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    modal: { isOpen: false, mode: 'add', selectedId: undefined },
    isLoading: false,
    isSubmitting: false,
    error: null,
}

export const fetchHouses = createAsyncThunk(
    'house/fetchAll',
    async ({ page, limit }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
        try { return await houseService.getAll(page, limit) }
        catch { return rejectWithValue('Không thể tải danh sách nhà') }
    }
)

export const createHouse = createAsyncThunk(
    'house/create',
    async (data: HouseFormData, { rejectWithValue }) => {
        try { return await houseService.create(data) }
        catch { return rejectWithValue('Không thể thêm nhà') }
    }
)

export const updateHouse = createAsyncThunk(
    'house/update',
    async ({ id, data }: { id: string; data: HouseFormData }, { rejectWithValue }) => {
        try { return await houseService.update(id, data) }
        catch { return rejectWithValue('Không thể cập nhật nhà') }
    }
)

export const deleteHouse = createAsyncThunk(
    'house/delete',
    async (id: string, { rejectWithValue }) => {
        try { await houseService.delete(id); return id }
        catch { return rejectWithValue('Không thể xoá nhà') }
    }
)

const houseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {
        setSelectedHouse: (state, action: PayloadAction<House | null>) => {
            state.selected = action.payload
        },
        setHousePage: (state, action: PayloadAction<number>) => {
            state.pagination.page = action.payload
        },
        openHouseModal: (state, action: PayloadAction<{ mode: ModalState['mode']; selectedId?: string }>) => {
            state.modal = { isOpen: true, ...action.payload }
        },
        closeHouseModal: (state) => {
            state.modal = { isOpen: false, mode: 'add', selectedId: undefined }
        },
        clearHouseError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.data
                state.pagination = action.payload.meta
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(createHouse.pending, (state) => {
                state.isSubmitting = true
            })
            .addCase(createHouse.fulfilled, (state, action) => {
                state.isSubmitting = false
                state.items.unshift(action.payload)
            })
            .addCase(createHouse.rejected, (state, action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
            .addCase(updateHouse.pending, (state) => {
                state.isSubmitting = true
            })
            .addCase(updateHouse.fulfilled, (state, action) => {
                state.isSubmitting = false
                const idx = state.items.findIndex(h => h.id === action.payload.id)
                if (idx !== -1) state.items[idx] = action.payload
            })
            .addCase(updateHouse.rejected, (state, action) => {
                state.isSubmitting = false
                state.error = action.payload as string
            })
            .addCase(deleteHouse.fulfilled, (state, action) => {
                state.items = state.items.filter(h => h.id !== action.payload)
            })
    },
})

export const {
    setSelectedHouse,
    setHousePage,
    openHouseModal,
    closeHouseModal,
    clearHouseError,
} = houseSlice.actions

export default houseSlice.reducer