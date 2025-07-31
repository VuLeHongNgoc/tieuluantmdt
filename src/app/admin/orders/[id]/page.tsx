'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface OrderItem {
  _id: string
  productId: string
  productName: string
  color: string
  size?: string
  quantity: number
  unitPrice: number
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

interface Order {
  _id: string
  userId: string
  status: 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED'
  paymentMethod: 'VNPAY' | 'PAYPAL' | 'COD'
  total: number
  items: OrderItem[]
  customerInfo: CustomerInfo
  createdAt: string
  updatedAt: string
}

const statusOptions = [
  { value: 'PENDING', label: 'Pending', color: 'text-yellow-800 bg-yellow-100' },
  { value: 'PREPARING', label: 'Preparing', color: 'text-blue-800 bg-blue-100' },
  { value: 'SHIPPING', label: 'Shipping', color: 'text-purple-800 bg-purple-100' },
  { value: 'DELIVERED', label: 'Delivered', color: 'text-green-800 bg-green-100' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'text-red-800 bg-red-100' },
]

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Unwrap params using React.use()
  const { id } = use(params)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/orders/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order')
        }
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchOrder()
    }
  }, [session, id])

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    try {
      setUpdating(true)
      console.log('Sending status update request:', { orderId: id, newStatus })
      
      const response = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Update successful:', result)
        setOrder(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null)
      } else {
        const error = await response.json()
        console.error('Update failed:', error)
        alert(`Failed to update order status: ${error.message}`)
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusBadge = (status: Order['status']) => {
    const config = statusOptions.find(option => option.value === status)
    return (
      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config?.color || 'bg-gray-100 text-gray-800'}`}>
        {config?.label || status}
      </span>
    )
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need to be logged in as an admin to access this page.</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600">The order you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                     <p className="text-gray-600 mt-2">Order #{order._id}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Back to Orders
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
              {getStatusBadge(order.status)}
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Update Status</label>
              <select
                onChange={(e) => handleStatusUpdate(e.target.value as Order['status'])}
                disabled={updating}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue=""
              >
                <option value="" disabled>Select new status</option>
                {statusOptions
                  .filter(option => option.value !== order.status)
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
              {updating && (
                <p className="text-sm text-blue-600">Updating status...</p>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
                             {order.items.map((item) => (
                 <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                   <div className="flex-shrink-0">
                     <img
                       src="/images/product-placeholder.jpg"
                       alt={item.productName}
                       className="w-16 h-16 object-cover rounded-lg"
                     />
                   </div>
                   <div className="flex-1">
                     <h3 className="text-sm font-medium text-gray-900">{item.productName}</h3>
                     <p className="text-sm text-gray-500">Color: {item.color} {item.size && `| Size: ${item.size}`}</p>
                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-medium text-gray-900">${item.unitPrice.toLocaleString()}</p>
                     <p className="text-sm text-gray-500">${(item.unitPrice * item.quantity).toLocaleString()}</p>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-3">
                             <div>
                 <label className="block text-sm font-medium text-gray-700">Name</label>
                 <p className="text-sm text-gray-900">{order.customerInfo.name}</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">Email</label>
                 <p className="text-sm text-gray-900">{order.customerInfo.email}</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">Phone</label>
                 <p className="text-sm text-gray-900">{order.customerInfo.phone}</p>
               </div>
            </div>
          </div>

                     {/* Shipping Address */}
           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
             <div className="space-y-3">
               <div>
                 <label className="block text-sm font-medium text-gray-700">Address</label>
                 <p className="text-sm text-gray-900">{order.customerInfo.address}</p>
               </div>
             </div>
           </div>

                     {/* Payment Method */}
           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
             <div className="space-y-3">
               <div>
                 <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                 <p className="text-sm text-gray-900">{order.paymentMethod}</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                 <p className="text-sm text-gray-900">${order.total.toLocaleString()}</p>
               </div>
             </div>
           </div>

           {/* Order Timeline */}
           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Timeline</h2>
             <div className="space-y-3">
               <div>
                 <label className="block text-sm font-medium text-gray-700">Order Date</label>
                 <p className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                 <p className="text-sm text-gray-900">{new Date(order.updatedAt).toLocaleDateString()}</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
} 