export enum UserRole {
    ADMIN = 'admin',
    LANDLORD = 'landlord',
    TENANT = 'tenant',
}

export enum RoomStatus {
    AVAILABlE = 'available',
    OCCUPIED = 'occupied',
    MAINTENANCE = 'maintenance',
}

export enum PaymentStatus {
    PAID = 'paid',
    UNPAID = 'unpaid',
    OVERDUE = 'overdue',
}

export enum PaymentMethod {
    CASH = 'cash',
    TRANSFER = 'TRANSFER',
}

export interface User {
    id : string,
    name : string,
    phone : string,
    email : string,
    role : UserRole,
    createdAt : string,
}

export interface  LoginCredentials {
    email :string,
    password : string,
}

export interface AuthState {
    user : User | null ,
    token : string | null , 
    isAuthenticated : boolean ,
    isLoading : boolean , 
    error : string | null
}

export interface House {
    id : string,
    name : string,
    address : string,
    landlordId : string,
    totalFloors : number,
    totalRooms : number,
    availableRooms : number,
    occupiedRooms : number ,   
}

export type HouseFormData = Pick<House,'name'| 'address'>

export interface Floor {
    id:string,
    houseId:string,
    floorNo : number,
    createdAt : string,
    updateAt : string,
}

export interface Room {
    id: string,
    floorId : string,
    name : string,
    price : string,
    capacity : number,
    status : RoomStatus,
    area? : number,
    note? : string,
    tenant? : Tenant,
    moveInDate?: string,
    createAt? : string,
    upDateAt? : string,
}

export type RoomFormData = Pick<Room, 'name'| 'price' | 'capacity' | 'status' | 'area'| 'note' >

export interface Tenant {
    id : string,
    name : string,
    phone : string,
    email? : string,
    idCard? : string,
    address? : string,
    roomId : string,
    moveInDate : string,
    moveOutDate : string,
    createdAt? : string,
    updateAt? : string,
}

export type TenantFormData = Pick<Tenant,'name'|'phone'| 'email'| 'idCard'| 'address' | 'moveInDate' | 'roomId'>

export interface Payment {
    id: string,
    roomId : string,
    tenantId : string,
    tenant? : Tenant,
    room? : Room,
    amount : number,
    month : number,
    year : number,
    status : PaymentStatus,
    method? : PaymentMethod,
    paidAt : string,
    note? : string,
    createdAt? : string,
    updateAt? : string,
}

export type PaymentFormData = Pick<Payment,'roomId'| 'tenantId' | 'amount' | 'month' | 'year' | 'method' | 'note' >


export interface DashboardStatus {
  totalHouses: number
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  maintenanceRooms: number
  totalTenants: number        // Cập nhật sau khi có JSON tenants
  revenueThisMonth: number    // Cập nhật sau khi có JSON payments
  revenueLastMonth: number    // Cập nhật sau khi có JSON payments
  overduePayments: number     // Cập nhật sau khi có JSON payments
}
 
// ============================================================
// FILTERS
// ============================================================
 
export interface RoomFilter {
  houseId?: string
  floorId?: string
  status?: RoomStatus
  search?: string
}
 
export interface TenantFilter {
  search?: string
  roomId?: string
}
 
export interface PaymentFilter {
  month?: number
  year?: number
  status?: PaymentStatus
  search?: string
}
 
// ============================================================
// API RESPONSE
// Dựa theo JSON houses: { data: [...], meta: { page, limit, total, totalPages } }
// ============================================================
 
export interface ApiResponse<T> {
  data: T
  message?: string
  success?: boolean
}
 
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
 
// ============================================================
// UI STATE
// ============================================================
 
export interface ModalState {
  isOpen: boolean
  mode: 'add' | 'edit' | 'view' | 'delete'
  selectedId?: string
}
 