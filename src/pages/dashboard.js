import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import MetricsCard from '../components/dashboard/MetricsCard';
import CustomLineChart from '../components/dashboard/LineChart';
import CustomBarChart from '../components/dashboard/BarChart';
import DonutChart from '../components/dashboard/DonutChart';
import DataTable from '../components/dashboard/DataTable';
import {
  getUsers,
  getSales,
  getSalesTrend,
  getUserGrowth,
  getRevenueByCategory,
  getSessions
} from '../lib/mockApi';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  // State for data
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [sessionsData, setSessionsData] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const { rememberMe } = useAuth();
  
  // Use the inactivity timer hook
  useInactivityTimer(60000, !rememberMe);
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel for better performance
        const [users, sales, sessions, trendData, growthData, categoryRevenue] = await Promise.all([
          getUsers(),
          getSales(),
          getSessions(),
          getSalesTrend(),
          getUserGrowth(),
          getRevenueByCategory()
        ]);
        
        // Update state with fetched data
        setUserData(users);
        setSalesData(sales);
        setSessionsData(sessions);
        setSalesTrend(trendData);
        setUserGrowth(growthData);
        setCategoryData(categoryRevenue);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // In a real app, you would handle errors properly, perhaps show toast notifications
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Format currency with proper locale
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Sales table columns configuration
  const salesColumns = [
    { key: 'id', label: 'ID' },
    { key: 'customer', label: 'Customer' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => formatCurrency(value)
    },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | BizInsight</title>
        <meta name="description" content="BizInsight Dashboard Overview" />
      </Head>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>
      
      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricsCard
          title="Total Users"
          value={userData?.total?.toLocaleString() || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          change="19.2%"
          changeType="increase"
          loading={loading}
        />
        
        <MetricsCard
          title="Active Sessions"
          value={sessionsData?.active?.toLocaleString() || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          change="2.3%"
          changeType="increase"
          loading={loading}
        />
        
        <MetricsCard
          title="Sales Revenue"
          value={formatCurrency(salesData?.thisMonth || 0)}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          change={`${salesData?.growth?.toFixed(1)}%` || "0%"}
          changeType={salesData?.growth > 0 ? "increase" : "decrease"}
          loading={loading}
        />
        
        <MetricsCard
          title="New Users"
          value={userData?.new?.toLocaleString() || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          }
          change="12.5%"
          changeType="increase"
          loading={loading}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CustomLineChart
          data={salesTrend}
          title="Sales Trend (12 Months)"
          dataKey="sales"
          loading={loading}
        />
        
        <CustomBarChart
          data={userGrowth}
          title="User Growth (12 Months)"
          dataKey="users"
          loading={loading}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DataTable
            data={salesData?.data || []}
            columns={salesColumns}
            title="Recent Sales"
            loading={loading}
          />
        </div>
        
        <div>
          <DonutChart
            data={categoryData}
            title="Revenue by Category"
            dataKey="value"
            nameKey="name"
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;