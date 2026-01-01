import React, { useState } from 'react';
import { Search, Filter, MoreVertical, UserCheck, UserX, Crown, Trash2, Edit, CreditCard } from 'lucide-react';
import { MOCK_USERS } from '../services/mockData';
import { User } from '../types';

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredUsers = users.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  // Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredUsers.map(u => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Bulk Action Logic
  const handleBulkAction = () => {
    if (selectedIds.size === 0) return;
    
    if (bulkAction === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedIds.size} users? This cannot be undone.`)) {
        setUsers(users.filter(u => !selectedIds.has(u.id)));
        setSelectedIds(new Set());
      }
    } else if (bulkAction === 'ban') {
      if (window.confirm(`Are you sure you want to BAN ${selectedIds.size} users?`)) {
        setUsers(users.map(u => selectedIds.has(u.id) ? { ...u, status: 'banned' } : u));
        setSelectedIds(new Set());
      }
    } else if (bulkAction === 'activate') {
      setUsers(users.map(u => selectedIds.has(u.id) ? { ...u, status: 'active' } : u));
      setSelectedIds(new Set());
    } else if (bulkAction === 'subscription') {
       const plan = window.prompt("Enter new subscription plan (free, premium, vip):", "premium");
       if (plan && ['free', 'premium', 'vip'].includes(plan.toLowerCase())) {
          setUsers(users.map(u => selectedIds.has(u.id) ? { ...u, subscription: plan.toLowerCase() as any } : u));
          setSelectedIds(new Set());
       }
    }
    
    setBulkAction('');
  };

  // Individual Action Logic
  const handleIndividualAction = (user: User, action: 'delete' | 'ban' | 'activate' | 'edit' | 'subscription') => {
      setActiveMenuId(null);
      if (action === 'delete') {
          if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
              setUsers(users.filter(u => u.id !== user.id));
              const newSelected = new Set(selectedIds);
              newSelected.delete(user.id);
              setSelectedIds(newSelected);
          }
      } else if (action === 'ban') {
          if (window.confirm('Are you sure you want to BAN this user?')) {
              setUsers(users.map(u => u.id === user.id ? { ...u, status: 'banned' } : u));
          }
      } else if (action === 'activate') {
           setUsers(users.map(u => u.id === user.id ? { ...u, status: 'active' } : u));
      } else if (action === 'subscription') {
           const plan = window.prompt("Enter new subscription plan (free, premium, vip):", user.subscription);
           if (plan && ['free', 'premium', 'vip'].includes(plan.toLowerCase())) {
               setUsers(users.map(u => u.id === user.id ? { ...u, subscription: plan.toLowerCase() as any } : u));
           }
      } else if (action === 'edit') {
           // Placeholder for edit modal
           console.log("Edit user", user.id);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500">Manage user accounts and subscriptions.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-medium flex items-center gap-2 hover:bg-slate-50">
                <Filter size={18} /> Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm shadow-blue-500/30">
                Export CSV
            </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
                <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md">{selectedIds.size} Selected</span>
                <span className="text-sm text-indigo-900 font-medium">Actions:</span>
            </div>
            <div className="flex items-center gap-2">
                <select 
                    value={bulkAction} 
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="text-sm border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="">Select Action...</option>
                    <option value="activate">Activate Selected</option>
                    <option value="ban">Ban Selected</option>
                    <option value="subscription">Change Subscription</option>
                    <option value="delete">Delete Selected</option>
                </select>
                <button 
                    onClick={handleBulkAction}
                    disabled={!bulkAction}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                    Apply
                </button>
            </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
        <div className="p-4 border-b border-slate-200">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search users by email..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="overflow-visible">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4 w-10">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={filteredUsers.length > 0 && selectedIds.size === filteredUsers.length}
                        onChange={handleSelectAll}
                    />
                </th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Subscription</th>
                <th className="px-6 py-4">Devices</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${selectedIds.has(user.id) ? 'bg-blue-50/50' : ''}`}>
                   <td className="px-6 py-4">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedIds.has(user.id)}
                        onChange={() => handleSelectOne(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                            {user.email[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                         user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                         user.status === 'banned' ? 'bg-red-50 text-red-700 border-red-200' :
                         'bg-gray-100 text-gray-600 border-gray-200'
                     }`}>
                         {user.status === 'active' ? <UserCheck size={12}/> : <UserX size={12}/>}
                         {user.status.toUpperCase()}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        {user.subscription !== 'free' && <Crown size={16} className="text-yellow-500" />}
                        <span className="capitalize">{user.subscription}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.deviceCount} / {user.subscription === 'vip' ? '10' : '3'}</td>
                  <td className="px-6 py-4 font-mono text-xs">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right overflow-visible">
                    <div className="relative">
                        <button 
                            onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                            className={`p-2 rounded-lg transition-colors ${activeMenuId === user.id ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                        >
                            <MoreVertical size={20} />
                        </button>

                        {activeMenuId === user.id && (
                             <>
                                 <div className="fixed inset-0 z-10 cursor-default" onClick={() => setActiveMenuId(null)}></div>
                                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-20 py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                     <button onClick={() => handleIndividualAction(user, 'edit')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                         <Edit size={16} /> Edit Details
                                     </button>
                                     <button onClick={() => handleIndividualAction(user, 'subscription')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                         <CreditCard size={16} /> Change Plan
                                     </button>
                                     <div className="h-px bg-slate-100 my-1"></div>
                                     {user.status === 'banned' ? (
                                         <button onClick={() => handleIndividualAction(user, 'activate')} className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                                             <UserCheck size={16} /> Activate User
                                         </button>
                                     ) : (
                                         <button onClick={() => handleIndividualAction(user, 'ban')} className="w-full text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-2">
                                             <UserX size={16} /> Ban User
                                         </button>
                                     )}
                                     <button onClick={() => handleIndividualAction(user, 'delete')} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                         <Trash2 size={16} /> Delete User
                                     </button>
                                 </div>
                             </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
            <span>Showing {filteredUsers.length} users</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;