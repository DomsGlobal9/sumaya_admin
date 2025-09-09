import React, { useState } from "react";
import { Search, HelpCircle, Bell, User, LogOut } from "lucide-react";
import sumayalogo from "../assets/Logo (1).svg";
import AnalyticsDashboard from "../Components/AnalyticsDashboard";
import UserManagement from "../Components/UserManagement";
import PayoutsContent from "../Components/PayoutsContent";
import ProductsContent from "../Components/ProductsContent";
import AddProductContent from "../Components/AddProductContent";
import { Link, useNavigate } from "react-router-dom";
// Dummy data for moderation queue
const moderationData = [
  {
    id: 1,
    title: "Anarkali Cotton Kurti - Pink Floral",
    description:
      "Elegant hand-stitched Anarkali kurti in soft cotton, perfect for festive wear.",
    submitter: "Stylellilah Tailors",
    timeAgo: "2 hours ago",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Embroidered Georgette Kurti - Mint Green",
    description:
      "Delicate hand embroidery on lightweight georgette, perfect for casual or office wear.",
    submitter: "Meera's Boutique",
    timeAgo: "1 hours ago",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Cotton Kurta - Indigo Print",
    description:
      "Handblock printed cotton kurta with a relaxed fit and wooden buttons.",
    submitter: "Ubhandkala Tailoring",
    timeAgo: "30 mins ago",
    priority: "Low",
    status: "Pending",
  },
  {
    id: 4,
    title: "Anarkali Kurti - Peach Mirror Work",
    description: "Heavy floor-length kurti with intricate mirror embroidery.",
    submitter: "Meera's Stitch Studio",
    timeAgo: "1 hours ago",
    priority: "High",
    status: "Pending",
  },
  {
    id: 5,
    title: "Straight Kurti - Indigo Block Print",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
    submitter: "TechShare Solutions",
    timeAgo: "2 hours ago",
    priority: "High",
    status: "Pending",
  },
  {
    id: 6,
    title: "Wireless Bluetooth Headphones Pro Max",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
    submitter: "TechShare Solutions",
    timeAgo: "2 hours ago",
    priority: "High",
    status: "Pending",
  },
];

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "marketplace", label: "Marketplace", active: true },
    { id: "analytics", label: "Analytics", active: false },
    { id: "user-management", label: "User Management", active: false },
    { id: "payouts", label: "Payouts", active: false },
    { id: "products", label: "Products", active: false },
    { id: "add-product", label: "Add Product", active: false },
  ];

  return (
    <div
      className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={sumayalogo} alt="logo" />
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full  px-4 py-3 rounded-lg text-center transition-colors ${
                activeTab === item.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <Link to="/">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

// Top Navigation Component
const TopNavbar = () => {
    const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ clear token on logout
    localStorage.removeItem("adminToken");
    setOpen(false);
    navigate("/", { replace: true }); // redirect to login
  };
  return (
    <div className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 z-30 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <div className="relative inline-block">
            <button
              onClick={() => setOpen(!open)}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              aria-label="Toggle menu"
            >
              
              <User className="w-5 h-5 text-gray-600" />
              
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Moderation Queue Card Component
const ModerationCard = ({ item, onAccept, onReject }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {item.title}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
              item.priority
            )}`}
          >
            {item.priority}
          </span>
          <span className="px-2 py-1 rounded text-xs font-medium text-blue-600 bg-blue-50">
            {item.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {item.description}
      </p>

      {/* Metadata */}
      <div className="text-xs text-gray-500 mb-4">
        <p>Submitted by: {item.submitter}</p>
        <p>Time: {item.timeAgo}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => onAccept(item.id)}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(item.id)}
          className="flex-1 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

// Main Marketplace Component
const MarketplaceContent = () => {
  const [items, setItems] = useState(moderationData);

  const handleAccept = (id) => {
    setItems(items.filter((item) => item.id !== id));
    console.log(`Accepted item with id: ${id}`);
  };

  const handleReject = (id) => {
    setItems(items.filter((item) => item.id !== id));
    console.log(`Rejected item with id: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Moderation Queue
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <ModerationCard
            key={item.id}
            item={item}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items in moderation queue</p>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("marketplace");

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <MarketplaceContent />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "user-management":
        return <UserManagement />;
      case "payouts":
        return <PayoutsContent />;
      case "products":
        return <ProductsContent />;
      case "add-product":
        return <AddProductContent />;
      default:
        return <MarketplaceContent />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">{renderContent()}</main>

      {/* Mobile Sidebar Overlay - Hidden by default, can be toggled */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
