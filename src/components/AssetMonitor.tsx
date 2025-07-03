
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Activity, Thermometer, Zap, Cpu, HardDrive, Wifi } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  metrics: {
    cpu: number;
    memory: number;
    temperature: number;
    power: number;
    network: number;
  };
  location: string;
  lastUpdate: Date;
}

export const AssetMonitor = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Manufacturing Line Alpha',
      type: 'Industrial Robot',
      status: 'online',
      metrics: { cpu: 78, memory: 65, temperature: 72, power: 850, network: 94 },
      location: 'Factory Floor A1',
      lastUpdate: new Date()
    },
    {
      id: '2',
      name: 'Quality Control System',
      type: 'Vision AI',
      status: 'online',
      metrics: { cpu: 92, memory: 88, temperature: 68, power: 420, network: 98 },
      location: 'QC Station 3',
      lastUpdate: new Date()
    },
    {
      id: '3',
      name: 'Autonomous Forklift #7',
      type: 'AGV',
      status: 'maintenance',
      metrics: { cpu: 23, memory: 45, temperature: 65, power: 0, network: 0 },
      location: 'Warehouse B2',
      lastUpdate: new Date(Date.now() - 300000)
    },
    {
      id: '4',
      name: 'Edge Computing Node',
      type: 'NVIDIA Jetson',
      status: 'online',
      metrics: { cpu: 56, memory: 72, temperature: 74, power: 75, network: 89 },
      location: 'Server Room',
      lastUpdate: new Date()
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets => 
        prevAssets.map(asset => {
          if (asset.status === 'online') {
            return {
              ...asset,
              metrics: {
                cpu: Math.max(20, Math.min(100, asset.metrics.cpu + (Math.random() - 0.5) * 10)),
                memory: Math.max(20, Math.min(100, asset.metrics.memory + (Math.random() - 0.5) * 8)),
                temperature: Math.max(60, Math.min(85, asset.metrics.temperature + (Math.random() - 0.5) * 4)),
                power: Math.max(0, Math.min(1000, asset.metrics.power + (Math.random() - 0.5) * 50)),
                network: Math.max(70, Math.min(100, asset.metrics.network + (Math.random() - 0.5) * 6))
              },
              lastUpdate: new Date()
            };
          }
          return asset;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getMetricColor = (value: number, type: string) => {
    if (type === 'temperature') {
      if (value > 80) return 'text-red-400';
      if (value > 75) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (value > 90) return 'text-red-400';
    if (value > 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {assets.filter(a => a.status === 'online').length}
              </div>
              <div className="text-sm text-slate-400">Assets Online</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Cpu className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(assets.reduce((sum, a) => sum + a.metrics.cpu, 0) / assets.length)}%
              </div>
              <div className="text-sm text-slate-400">Avg CPU Usage</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Thermometer className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(assets.reduce((sum, a) => sum + a.metrics.temperature, 0) / assets.length)}°F
              </div>
              <div className="text-sm text-slate-400">Avg Temperature</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(assets.reduce((sum, a) => sum + a.metrics.power, 0))}W
              </div>
              <div className="text-sm text-slate-400">Total Power</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Asset Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assets.map(asset => (
          <Card key={asset.id} className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                <p className="text-sm text-slate-400">{asset.type} • {asset.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(asset.status)}`}></div>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {asset.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {/* CPU Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">CPU Usage</span>
                  </div>
                  <span className={`text-sm font-medium ${getMetricColor(asset.metrics.cpu, 'cpu')}`}>
                    {asset.metrics.cpu}%
                  </span>
                </div>
                <Progress value={asset.metrics.cpu} className="h-2" />
              </div>

              {/* Memory Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Memory</span>
                  </div>
                  <span className={`text-sm font-medium ${getMetricColor(asset.metrics.memory, 'memory')}`}>
                    {asset.metrics.memory}%
                  </span>
                </div>
                <Progress value={asset.metrics.memory} className="h-2" />
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Temperature</span>
                  </div>
                  <span className={`text-sm font-medium ${getMetricColor(asset.metrics.temperature, 'temperature')}`}>
                    {asset.metrics.temperature}°F
                  </span>
                </div>
                <Progress value={(asset.metrics.temperature - 60) / 25 * 100} className="h-2" />
              </div>

              {/* Network */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Network</span>
                  </div>
                  <span className={`text-sm font-medium ${getMetricColor(asset.metrics.network, 'network')}`}>
                    {asset.metrics.network}%
                  </span>
                </div>
                <Progress value={asset.metrics.network} className="h-2" />
              </div>

              <div className="pt-3 border-t border-slate-600">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Power: {asset.metrics.power}W</span>
                  <span>Updated {formatLastUpdate(asset.lastUpdate)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
