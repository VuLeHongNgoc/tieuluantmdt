'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PREPARING', label: 'Preparing' },
  { value: 'SHIPPING', label: 'Shipping' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

export default function AdminOrdersPage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/orders/admin')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data.orders || [])
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchOrders()
    }
  }, [session])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order._id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (order.customerInfo?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (order.customerInfo?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setOrders(orders.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        ))
      } else {
        alert('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      PROCESSING: { bg: 'bg-blue-100', text: 'text-blue-800' },
      SHIPPED: { bg: 'bg-purple-100', text: 'text-purple-800' },
      DELIVERED: { bg: 'bg-green-100', text: 'text-green-800' },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-800' },
    }

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {status || 'UNKNOWN'}
      </span>
    )
  }

  const getStatusOptions = (currentStatus: Order['status']) => {
    return statusOptions.filter(option => option.value !== '' && option.value !== currentStatus)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Manage customer orders and track their status</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Search by order number, customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedStatus('')
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order._id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerInfo?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{order.customerInfo?.email || 'No email'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.slice(0, 2).map(item => item.productName || 'Unknown').join(', ')}
                      {order.items.length > 2 && '...'}
                    </div>
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     ${(order.total || 0).toLocaleString()}
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                         <div className="flex justify-end space-x-2">
                       <Link
                         href={`/admin/orders/${order._id}`}
                         className="text-blue-600 hover:text-blue-900"
                       >
                         View Details
                       </Link>
                      <select
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value as Order['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        {getStatusOptions(order.status).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            {searchTerm || selectedStatus ? 'No orders match your filters.' : 'No orders found.'}
          </div>
        )}
      </div>

                    {/* Summary */}
       <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
           <div>
             <p className="text-sm font-medium text-gray-600">Total Orders</p>
             <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
           </div>
           <div>
             <p className="text-sm font-medium text-gray-600">Pending</p>
             <p className="text-2xl font-bold text-yellow-600">
               {orders.filter(o => o.status === 'PENDING').length}
             </p>
           </div>
           <div>
             <p className="text-sm font-medium text-gray-600">Preparing</p>
             <p className="text-2xl font-bold text-blue-600">
               {orders.filter(o => o.status === 'PREPARING').length}
             </p>
           </div>
           <div>
             <p className="text-sm font-medium text-gray-600">Shipping</p>
             <p className="text-2xl font-bold text-purple-600">
               {orders.filter(o => o.status === 'SHIPPING').length}
             </p>
           </div>
           <div>
             <p className="text-sm font-medium text-gray-600">Delivered</p>
             <p className="text-2xl font-bold text-green-600">
               {orders.filter(o => o.status === 'DELIVERED').length}
             </p>
           </div>
         </div>
       </div>
    </div>
  )
} 