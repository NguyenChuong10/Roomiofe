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



export function formatCurrency(amount?: number): string {
  if (amount == null) return '0 ₫'

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export function formatCurrencyShort(amount?: number): string {
  if (!amount) return '0đ'

  const format = (value: number, suffix: string) => {
    const result = value.toFixed(1)
    return result.endsWith('.0')
      ? `${parseInt(result)}${suffix}`
      : `${result}${suffix}`
  }

  if (amount >= 1_000_000_000) {
    return format(amount / 1_000_000_000, 'tỷ')
  }

  if (amount >= 1_000_000) {
    return format(amount / 1_000_000, 'tr')
  }

  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}k`
  }

  return `${amount}đ`
}



export function formatDate(date?: string): string {
  if (!date) return '—'

  const d = dayjs(date)
  return d.isValid() ? d.format('DD/MM/YYYY') : '—'
}

export function formatMonthYear(month: number, year: number): string {
  return dayjs()
    .month(Math.max(0, Math.min(11, month - 1)))
    .year(year)
    .format('MMMM, YYYY')
}

export function formatRelativeTime(date?: string): string {
  if (!date) return '—'

  const d = dayjs(date)
  return d.isValid() ? d.fromNow() : '—'
}

export function truncate(
  str: string,
  maxLength: number = 20
): string {
  if (!str) return ''
  if (str.length <= maxLength) return str

  const trimmed = str.slice(0, maxLength)
  return trimmed.slice(0, trimmed.lastIndexOf(' ')) + '...'
}



export function calcOccupancyRate(
  occupied: number,
  total: number
): number {
  if (total <= 0) return 0

  return Math.round((occupied / total) * 100)
}



export function getPageRange(
  currentPage: number,
  totalPages: number,
  delta: number = 2
): (number | '...')[] {
  const range: (number | '...')[] = []

  const start = Math.max(2, currentPage - delta)
  const end = Math.min(totalPages - 1, currentPage + delta)

  range.push(1)

  if (start > 2) {
    range.push('...')
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  if (end < totalPages - 1) {
    range.push('...')
  }

  if (totalPages > 1) {
    range.push(totalPages)
  }

  return range
}