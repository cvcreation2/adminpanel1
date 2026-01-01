import React, { useState } from 'react';
import { Save, Key, Globe, Shield, RefreshCw, Zap, Upload, Download } from 'lucide-react';

const Settings: React.FC = () => {
  const [bypassEnabled, setBypassEnabled] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
       <div>
          <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
          <p className="text-slate-500">Configure global application parameters and API keys.</p>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Key size={20} />
             </div>
             <h3 className="font-bold text-slate-800">API Access (For Mobile App)</h3>
        </div>
        <div className="p-6 space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <strong>Important:</strong> Use these credentials in your mobile application to connect to this admin panel securely.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Admin API Endpoint</label>
                    <div className="flex gap-2">
                        <input type="text" readOnly value="https://api.nexusvpn.com/v1/admin" className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-600 font-mono text-sm" />
                        <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><RefreshCw size={18}/></button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Secret Key</label>
                    <div className="flex gap-2">
                        <input type="password" value="sk_live_51M3Txxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-600 font-mono text-sm" />
                         <button className="px-3 py-1 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-300">Reveal</button>
                    </div>
                </div>
            </div>
        </div>
      </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
             <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Globe size={20} />
             </div>
             <h3 className="font-bold text-slate-800">General Configuration</h3>
        </div>
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Application Name</label>
                    <input type="text" defaultValue="Nexus VPN" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@nexusvpn.com" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Privacy Policy URL</label>
                    <input type="url" defaultValue="https://nexusvpn.com/privacy" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Terms of Service URL</label>
                    <input type="url" defaultValue="https://nexusvpn.com/terms" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            
            <div className="flex items-center gap-2 pt-4">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <Zap size={20} />
                </div>
                <h3 className="font-bold text-slate-800">ISP Bypass & Network</h3>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={bypassEnabled} onChange={(e) => setBypassEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
        </div>
        <div className={`p-6 space-y-6 ${!bypassEnabled ? 'opacity-50 pointer-events-none grayscale-[0.5]' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custom DNS Servers</label>
                    <input type="text" defaultValue="8.8.8.8, 1.1.1.1" placeholder="Primary DNS, Secondary DNS" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
                    <p className="text-xs text-slate-500 mt-1">Comma-separated list of DNS servers to override default ISP DNS.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Proxy Host (IP/Domain)</label>
                    <input type="text" placeholder="10.10.10.1" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Proxy Port</label>
                    <input type="number" placeholder="8080" className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
                </div>
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium">
                    <Upload size={16} /> Import Config
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium">
                    <Download size={16} /> Export Config
                </button>
                <div className="flex-1"></div>
                <button className="px-6 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 flex items-center gap-2">
                    <Save size={18} /> Update Network
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;