import {RoomStatus , PaymentStatus , UserRole} from '@/shared/types'


export const ROUTES = {
    DASHBOARD : '/',
    ROOMS : '/room',
    TENANTS : '/tenant',
    PAYMENT : '/payment',
} as const

export const ROOM_STATUS_LABEL : Record<RoomStatus , string> = {
    [RoomStatus.AVAILABlE] : 'còn trống',
    [RoomStatus.OCCUPIED] : 'đã thuê',
    [RoomStatus.MAINTENANCE] : 'bảo trì',
}
export const ROOM_STATUS_COLOR : Record<RoomStatus , string> = {
    [RoomStatus.AVAILABlE] : 'bg-green-100 text-green-700 border-green-200',
    [RoomStatus.OCCUPIED] : 'bg-red-100 text-red-700 border-red-200',
    [RoomStatus.MAINTENANCE] : 'be-yellow-100 text-yellow-700 border-yellow-200',
}
export const ROOM_STATUS_OPTIONS = [
    {label : 'tất cả', value:undefined },
    {label : 'còn trống', value:RoomStatus.AVAILABlE},
    {label : 'đã thuê ', value:RoomStatus.OCCUPIED},
    {label : 'bảo trì', value:RoomStatus.MAINTENANCE},
]

export const PAYMENT_STATUS_LABEL : Record<PaymentStatus,string> = {
    [PaymentStatus.PAID] : 'Đã thanh toán',
    [PaymentStatus.UNPAID] : ' Chưa thanh toán',
    [PaymentStatus.OVERDUE] : ' Quá hạn ',
}

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, string> = {
  [PaymentStatus.PAID]:    'bg-green-100 text-green-700 border-green-200',
  [PaymentStatus.UNPAID]:  'bg-gray-100 text-gray-600 border-gray-200',
  [PaymentStatus.OVERDUE]: 'bg-red-100 text-red-700 border-red-200',
}

export const USER_ROLE_LABEL : Record<UserRole,string> = {
    [UserRole.ADMIN] : 'quản trị viên',
    [UserRole.LANDLORD] : 'chủ nhà',
    [UserRole.TENANT] : 'người thuê',
}

export const PAGINATION = {
    DEFAULT_PAGE : 1,
    DEFAULT_LIMITS :10,
} as const

export const MONTHS = [
    {label:'tháng 1' , value :1},
    {label:'tháng 2' , value :2},
    {label:'tháng 3' , value :3},
    {label:'tháng 4' , value :4},
    {label:'tháng 5' , value :5},
    {label:'tháng 6' , value :6},
    {label:'tháng 7' , value :7},
    {label:'tháng 8' , value :8},
    {label:'tháng 9' , value :9},
    {label:'tháng 10' , value :10},
    {label:'tháng 11' , value :11},
    {label:'tháng 12' , value :12}
] as const

export const SIDEBAR_MENU = [
    {
        label: 'Tổng quan',
        path:  ROUTES.DASHBOARD,
        icon:  'LayoutDashboard',
    },
    {
        label: 'Quản lý phòng',
        path:  ROUTES.ROOMS,
        icon:  'DoorOpen',
    },
    {
        label: 'Người thuê',
        path:  ROUTES.TENANTS,
        icon:  'User',
    },
    {
        label: 'Thanh toán',
        path:  ROUTES.PAYMENT,
        icon:  'CreditCard',
    },
] as const