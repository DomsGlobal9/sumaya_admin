import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertTriangle } from 'lucide-react';

// Dummy user data matching the exact image
const userData = [
  {
    id: 1,
    user: 'John Smith',
    email: 'john.smith@email.com',
    role: 'seller',
    status: 'active',
    registration: '2025-01-15',
    lastActive: '2025-06-26',
    orders: 45,
    totalSpent: '₹2,847.5',
    verified: true
  },
  {
    id: 2,
    user: 'John Smith',
    email: 'john.smith@email.com',
    role: 'customer',
    status: 'pending',
    registration: '2025-01-15',
    lastActive: '2025-06-26',
    orders: 45,
    totalSpent: '₹2,847.5',
    verified: false
  },
  {
    id: 3,
    user: 'John Smith',
    email: 'john.smith@email.com',
    role: 'admin',
    status: 'suspended',
    registration: '2025-01-15',
    lastActive: '2025-06-26',
    orders: 45,
    totalSpent: '₹2,847.5',
    verified: true
  },
  {
    id: 4,
    user: 'John Smith',
    email: 'john.smith@email.com',
    role: 'moderator',
    status: 'inactive',
    registration: '2025-01-15',
    lastActive: '2025-06-26',
    orders: 45,
    totalSpent: '₹2,847.5',
    verified: true
  }
];

const UserManagementStats = () => {
  const stats = [
    { 
      label: 'Total Users', 
      value: '1204', 
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800'
    },
    { 
      label: 'Active Users', 
      value: '120', 
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    { 
      label: 'New this Month', 
      value: '345', 
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

const UserTable = ({ users }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-red-100 text-red-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };
    
    return `px-2 py-1 rounded text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      'seller': 'bg-blue-100 text-blue-800',
      'customer': 'bg-purple-100 text-purple-800',
      'admin': 'bg-orange-100 text-orange-800',
      'moderator': 'bg-indigo-100 text-indigo-800'
    };
    
    return `px-2 py-1 rounded text-xs font-medium ${roleConfig[role] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Active
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Spent
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verified
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.user}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getRoleBadge(user.role)}>{user.role}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadge(user.status)}>{user.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.registration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.lastActive}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.orders}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.totalSpent}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  {user.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function UserManagementContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(userData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h1 className="text-2xl font-bold text-gray-900">User management</h1>

      {/* Stats */}
      <UserManagementStats />

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
          All Roles
        </button>
        <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
          All Status
        </button>
      </div>

      {/* User Table */}
      <UserTable users={filteredUsers} />
    </div>
  );
}