import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaChartLine, FaClipboardList, FaUserCircle, FaCog, FaSignOutAlt, FaBell, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Sample data for demo purposes
  const recentActivities = [
    { id: 1, type: 'analysis', title: 'Quarterly Sales Analysis', date: '2 hours ago' },
    { id: 2, type: 'document', title: 'Marketing Strategy Document', date: '5 hours ago' },
    { id: 3, type: 'analysis', title: 'Customer Behavior Report', date: 'Yesterday' },
    { id: 4, type: 'document', title: 'Product Launch Plan', date: '2 days ago' },
  ];

  const statsData = [
    { id: 1, title: 'Reports Generated', value: '148', change: '+12%', isUp: true },
    { id: 2, title: 'Time Saved', value: '28 hrs', change: '+18%', isUp: true },
    { id: 3, title: 'Doc. Analyzed', value: '64', change: '+7%', isUp: true },
    { id: 4, title: 'Insights Found', value: '243', change: '+22%', isUp: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0 hidden md:block">
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <FaBrain className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-blue-400">RE-ASSIST</span>
          </div>
          
          <nav className="space-y-1">
            <SidebarLink 
              icon={<FaChartLine />} 
              text="Dashboard" 
              isActive={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <SidebarLink 
              icon={<FaClipboardList />} 
              text="Projects" 
              isActive={activeTab === 'projects'} 
              onClick={() => setActiveTab('projects')} 
            />
            <SidebarLink 
              icon={<FaUserCircle />} 
              text="Profile" 
              isActive={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')} 
            />
            <SidebarLink 
              icon={<FaCog />} 
              text="Settings" 
              isActive={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </nav>
        </div>
        
        <div className="border-t border-gray-700 p-4 mt-8">
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-400 hover:text-white w-full"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
                <FaBrain className="text-white text-sm" />
              </div>
              <span className="text-lg font-bold text-blue-400">RE-ASSIST</span>
            </div>
            
            <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-700 relative">
                <FaBell className="text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <span className="ml-2 text-sm font-medium hidden md:block">John Doe</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-gray-400">Here's what's happening with your projects today.</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map(stat => (
              <div key={stat.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-gray-400 font-medium mb-2">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${stat.isUp ? 'bg-green-900 bg-opacity-20 text-green-400' : 'bg-red-900 bg-opacity-20 text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start p-4 hover:bg-gray-700 rounded-lg transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${activity.type === 'analysis' ? 'bg-blue-900 bg-opacity-50' : 'bg-purple-900 bg-opacity-50'}`}>
                    {activity.type === 'analysis' ? (
                      <FaChartLine className="text-blue-400" />
                    ) : (
                      <FaClipboardList className="text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                  <button className="text-gray-400 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Start New Task */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold mb-2">Ready to start a new task?</h2>
                <p className="text-blue-200">Let our AI assistant help you work more efficiently.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start New Task
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar link component
const SidebarLink = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-blue-900 bg-opacity-50 text-blue-400' 
        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </button>
);

export default Dashboard;