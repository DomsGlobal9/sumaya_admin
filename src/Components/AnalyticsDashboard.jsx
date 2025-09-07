import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Dummy analytics data matching the image
const analyticsData = {
  stats: [
    {
      title: 'Total Revenue',
      value: '₹2,350.20',
      change: '+8% from last month',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      title: 'Active User',
      value: '₹12,350.20',
      change: '+5% from last Week',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '-2% from last Week',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    }
  ],
  monthlySalesData: [
    { month: 'Aug', value: 8000 },
    { month: 'Sep', value: 12000 },
    { month: 'Oct', value: 6000 },
    { month: 'Nov', value: 15000 },
    { month: 'Dec', value: 10000 },
    { month: 'Jan', value: 17500 }
  ],
  userActivityData: [
    { day: 'Jul', active: 150, new: 80 },
    { day: 'Aug', active: 180, new: 120 },
    { day: 'Sep', active: 220, new: 140 },
    { day: 'Oct', active: 280, new: 200 },
    { day: 'Nov', active: 250, new: 160 },
    { day: 'Dec', active: 320, new: 240 },
    { day: 'Jan', active: 380, new: 300 }
  ],
  salesByCategoryData: [
    { name: 'Cotton Kurti', value: 35, color: '#8b5cf6' },
    { name: 'Silk Saree', value: 25, color: '#f59e0b' },
    { name: 'Block Print', value: 20, color: '#ec4899' },
    { name: 'Georgette', value: 12, color: '#3b82f6' },
    { name: 'Others', value: 8, color: '#1f2937' }
  ],
  conversionFunnelData: [
    { name: 'Product views', value: 45, color: '#06b6d4' },
    { name: 'Add to cart', value: 25, color: '#f59e0b' },
    { name: 'Checkout', value: 15, color: '#8b5cf6' },
    { name: 'Purchase', value: 15, color: '#10b981' }
  ]
};

const StatsCard = ({ stat }) => {
  return (
    <div className={`${stat.bgColor} p-6 rounded-lg`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
      <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
      <p className="text-xs text-gray-600">{stat.change}</p>
    </div>
  );
};

const MonthlySalesChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Sales</h3>
        <p className="text-sm text-gray-600">Revenue and order trends</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#06b6d4" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const UserActivityChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
        <p className="text-sm text-gray-600">Daily active and new users</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="active" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="new" 
            stroke="#06b6d4" 
            strokeWidth={3}
            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const SalesByCategoryChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
        <p className="text-sm text-gray-600">Revenue distribution</p>
      </div>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={30}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConversionFunnelChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
        <p className="text-sm text-gray-600">User journey analysis</p>
      </div>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AnalyticsContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(analyticsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Analytics dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlySalesChart data={data.monthlySalesData} />
        <UserActivityChart data={data.userActivityData} />
        <SalesByCategoryChart data={data.salesByCategoryData} />
        <ConversionFunnelChart data={data.conversionFunnelData} />
      </div>
    </div>
  );
}