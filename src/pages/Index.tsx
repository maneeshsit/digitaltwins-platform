
import React, { useState } from 'react';
import { MapContainer } from '../components/MapContainer';
import { AssetMonitor } from '../components/AssetMonitor';
import { ControlPanel } from '../components/ControlPanel';
import { MetricsPanel } from '../components/MetricsPanel';
import { AppDownloadFloater } from '../components/AppDownloadFloater';
import { Activity, Map, Settings, BarChart3, Cpu, Satellite } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState('map');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-8 h-8 text-green-400" />
                <h1 className="text-2xl font-bold text-white">Digital Twins Platform</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Satellite className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-300">Real-time Sync Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'map', label: 'Digital Map', icon: Map },
              { id: 'assets', label: 'Asset Monitor', icon: Activity },
              { id: 'control', label: 'Control Center', icon: Settings },
              { id: 'metrics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all ${
                  activeView === id
                    ? 'border-green-400 text-green-400'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        {activeView === 'map' && <MapContainer />}
        {activeView === 'assets' && <AssetMonitor />}
        {activeView === 'control' && <ControlPanel />}
        {activeView === 'metrics' && <MetricsPanel />}
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6 text-slate-400">
            <span>GPU Utilization: 78%</span>
            <span>Memory: 12.4/32 GB</span>
            <span>Network: 1.2 Gbps</span>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Omniverse Connected</span>
          </div>
        </div>
      </div>

      {/* App Download Floater */}
      <AppDownloadFloater />
    </div>
  );
};

export default Index;
