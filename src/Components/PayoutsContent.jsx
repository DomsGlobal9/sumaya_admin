import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Dummy payout data matching the exact image
const payoutData = [
  {
    id: 'PO-001',
    seller: 'TechShare Solutions',
    amount: '₹2,847.5',
    status: 'completed',
    method: 'Bank Transfer',
    requestDate: '2024-06-20',
    completedDate: '2024-06-22',
    category: 'Electronics'
  },
  {
    id: 'PO-001',
    seller: 'Fashion Forward',
    amount: '₹2,847.5',
    status: 'processing',
    method: 'PayPal',
    requestDate: '2024-06-20',
    completedDate: '2024-06-22',
    category: 'Fashion'
  },
  {
    id: 'PO-001',
    seller: 'Sports Gear Pro',
    amount: '₹2,847.5',
    status: 'pending',
    method: 'Stripe',
    requestDate: '2024-06-20',
    completedDate: '2024-06-22',
    category: 'Sports'
  },
  {
    id: 'PO-001',
    seller: 'Book Haven',
    amount: '₹2,847.5',
    status: 'failed',
    method: 'Bank Transfer',
    requestDate: '2024-06-20',
    completedDate: '2024-06-22',
    category: 'Books'
  }
];

const PayoutStats = () => {
  const stats = [
    { 
      label: 'Total Payouts', 
      value: '₹12,044', 
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800'
    },
    { 
      label: 'Completed', 
      value: '₹12,560', 
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    { 
      label: 'Pending', 
      value: '45', 
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    { 
      label: 'Suspended', 
      value: '45', 
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} p-6 rounded-lg`}>
          <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

const PayoutTable = ({ payouts }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': 'bg-green-100 text-green-800',
      'processing': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800'
    };
    
    return `px-2 py-1 rounded text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Request Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completed Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payouts.map((payout, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.seller}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadge(payout.status)}>{payout.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.method}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.requestDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.completedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function PayoutsContent() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchPayouts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPayouts(payoutData);
      setLoading(false);
    };

    fetchPayouts();
  }, []);

  const filteredPayouts = payouts.filter(payout => 
    payout.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payout.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payout Management</h1>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
          Export
        </button>
      </div>

      {/* Stats */}
      <PayoutStats />

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by seller name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
          All status
        </button>
        <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
          Methods
        </button>
      </div>

      {/* Payout Table */}
      <PayoutTable payouts={filteredPayouts} />
    </div>
  );
}