import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.locale('vi')


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}


export function formatCurrencyShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}tỷ`
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}tr`
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}k`
  }
  return `${amount}đ`
}
export function formatDate(date: string | undefined): string {
  if (!date) return '—'
  return dayjs(date).format('DD/MM/YYYY')
}

export function formatMonthYear(month: number, year: number): string {
  return dayjs().month(month - 1).year(year).format('MMMM, YYYY')
}


export function formatRelativeTime(date: string): string {
  return dayjs(date).fromNow()
}




export function truncate(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}


export function calcOccupancyRate(occupied: number, total: number): number {
  if (total === 0) return 0
  return Math.round((occupied / total) * 100)
}

export function getPageRange(
  currentPage: number,
  totalPages: number,
  delta: number = 2
): (number | '...')[] {
  const range: (number | '...')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }

  return range
}