import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { floorService } from "@/services/roomService"
import type { Floor } from "@/shared/types"

interface FloorState {
    items: Floor[]
    selected: Floor | null
    isLoading: boolean
    error: string | null
}

const initialState: FloorState = {
    items: [],
    selected: null,
    isLoading: false,
    error: null,
}

export const fetchFloorsByHouse = createAsyncThunk(
    'floor/fetchByHouse',
    async (houseId: string, { rejectWithValue }) => {
        try { return await floorService.getByHouse(houseId) }
        catch { return rejectWithValue('Không thể tải danh sách tầng') }
    }
)

export const createFloor = createAsyncThunk(
    'floor/create',
    async ({ houseId, floorNo }: { houseId: string; floorNo: number }, { rejectWithValue }) => {
        try { return await floorService.create(houseId, floorNo) }
        catch { return rejectWithValue('Không thể thêm tầng') }
    }
)

export const deleteFloor = createAsyncThunk(
    'floor/delete',
    async (id: string, { rejectWithValue }) => {
        try { await floorService.delete(id); return id }
        catch { return rejectWithValue('Không thể xoá tầng') }
    }
)

const floorSlice = createSlice({
    name: 'floor',
    initialState,
    reducers: {
        setSelectedFloor: (state, action: PayloadAction<Floor | null>) => {
            state.selected = action.payload
        },
        clearFloorError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFloorsByHouse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchFloorsByHouse.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
            })
            .addCase(fetchFloorsByHouse.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(createFloor.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(deleteFloor.fulfilled, (state, action) => {
                state.items = state.items.filter(f => f.id !== action.payload)
            })
    },
})

export const {
    setSelectedFloor,
    clearFloorError,
} = floorSlice.actions

export default floorSlice.reducer