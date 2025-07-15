import { PaymentStatus } from '@/@types/payment-status'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

export const getStatusConfig = (status: PaymentStatus) => {
  switch (status) {
    case 'PAID':
      return {
        label: 'Pago',
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-green-100 text-green-800 border-green-200',
      }
    case 'PENDING':
      return {
        label: 'Pendente',
        variant: 'secondary' as const,
        icon: Clock,
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      }
    case 'CANCELLED':
      return {
        label: 'Cancelado',
        variant: 'destructive' as const,
        icon: XCircle,
        className: 'bg-red-100 text-red-800 border-red-200',
      }
    default:
      return {
        label: status,
        variant: 'outline' as const,
        icon: Clock,
        className: '',
      }
  }
}

export const getPaymentMethodLabel = (method: string | null) => {
  switch (method) {
    case 'PIX':
      return 'PIX'
    case 'CARD':
      return 'Cartão'
    default:
      return 'Não informado'
  }
}
