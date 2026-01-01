import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Servers from './pages/Servers';
import UsersPage from './pages/Users';
import Monetization from './pages/Monetization';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { Page } from './types';
import { Bell, Search, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('nexus_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (status: boolean) => {
    if (status) {
      setIsAuthenticated(true);
      localStorage.setItem('nexus_admin_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nexus_admin_auth');
    setCurrentPage(Page.DASHBOARD);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.SERVERS:
        return <Servers />;
      case Page.USERS:
        return <UsersPage />;
      case Page.MONETIZATION:
        return <Monetization />;
      case Page.AI_INSIGHTS:
        return <AIInsights />;
      case Page.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      
      <main className="flex-1 ml-64 flex flex-col h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4 text-slate-400">
                <Search size={20} />
                <input type="text" placeholder="Quick search..." className="bg-transparent outline-none text-slate-600 placeholder:text-slate-400 text-sm w-64" />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-slate-800">Admin User</div>
                        <div className="text-xs text-slate-500">Super Administrator</div>
                    </div>
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
                        <UserIcon size={20} />
                    </div>
                </div>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
            {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;