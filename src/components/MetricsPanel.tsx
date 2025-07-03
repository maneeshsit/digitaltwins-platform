
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Thermometer, Cpu } from 'lucide-react';

interface MetricData {
  timestamp: string;
  cpu: number;
  memory: number;
  temperature: number;
  power: number;
  efficiency: number;
}

interface AssetPerformance {
  name: string;
  efficiency: number;
  uptime: number;
  errors: number;
  color: string;
}

export const MetricsPanel = () => {
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  // Generate mock historical data
  const generateMockData = (hours: number) => {
    const data: MetricData[] = [];
    const now = new Date();
    
    for (let i = hours * 12; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 5 * 60000); // 5-minute intervals
      data.push({
        timestamp: timestamp.toLocaleTimeString(),
        cpu: 60 + Math.random() * 30,
        memory: 50 + Math.random() * 40,
        temperature: 68 + Math.random() * 12,
        power: 400 + Math.random() * 300,
        efficiency: 85 + Math.random() * 10
      });
    }
    return data;
  };

  const assetPerformance: AssetPerformance[] = [
    { name: 'Manufacturing Line Alpha', efficiency: 94, uptime: 99.2, errors: 2, color: '#10b981' },
    { name: 'Quality Control System', efficiency: 87, uptime: 98.5, errors: 5, color: '#3b82f6' },
    { name: 'Autonomous Forklift #7', efficiency: 76, uptime: 95.1, errors: 8, color: '#f59e0b' },
    { name: 'Edge Computing Node', efficiency: 91, uptime: 99.8, errors: 1, color: '#8b5cf6' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected on Manufacturing Line Alpha', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Predictive maintenance scheduled for Forklift #7', time: '15 min ago' },
    { id: 3, type: 'success', message: 'System backup completed successfully', time: '1 hour ago' },
    { id: 4, type: 'error', message: 'Network connectivity issue resolved', time: '2 hours ago' }
  ];

  useEffect(() => {
    // Initialize with historical data
    const timeRangeHours = selectedTimeRange === '1h' ? 1 : selectedTimeRange === '6h' ? 6 : 24;
    setRealTimeData(generateMockData(timeRangeHours));

    // Simulate real-time updates
    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint: MetricData = {
        timestamp: now.toLocaleTimeString(),
        cpu: 60 + Math.random() * 30,
        memory: 50 + Math.random() * 40,
        temperature: 68 + Math.random() * 12,
        power: 400 + Math.random() * 300,
        efficiency: 85 + Math.random() * 10
      };

      setRealTimeData(prev => {
        const updated = [...prev.slice(1), newDataPoint];
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return '🔴';
      case 'warning': return '🟡';
      case 'success': return '🟢';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const getCurrentValue = (metric: keyof MetricData) => {
    if (realTimeData.length === 0) return 0;
    const latest = realTimeData[realTimeData.length - 1];
    return typeof latest[metric] === 'number' ? latest[metric] : 0;
  };

  const getTrend = (metric: keyof MetricData) => {
    if (realTimeData.length < 2) return 0;
    const latest = realTimeData[realTimeData.length - 1];
    const previous = realTimeData[realTimeData.length - 2];
    
    const latestValue = typeof latest[metric] === 'number' ? latest[metric] : 0;
    const previousValue = typeof previous[metric] === 'number' ? previous[metric] : 0;
    
    return latestValue - previousValue;
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">CPU Usage</h3>
              <p className="text-2xl font-bold text-white">{getCurrentValue('cpu').toFixed(1)}%</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrend('cpu') >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
                <span className={`text-xs ${getTrend('cpu') >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(getTrend('cpu')).toFixed(1)}%
                </span>
              </div>
            </div>
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Memory Usage</h3>
              <p className="text-2xl font-bold text-white">{getCurrentValue('memory').toFixed(1)}%</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrend('memory') >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
                <span className={`text-xs ${getTrend('memory') >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(getTrend('memory')).toFixed(1)}%
                </span>
              </div>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Temperature</h3>
              <p className="text-2xl font-bold text-white">{getCurrentValue('temperature').toFixed(1)}°F</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrend('temperature') >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
                <span className={`text-xs ${getTrend('temperature') >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(getTrend('temperature')).toFixed(1)}°F
                </span>
              </div>
            </div>
            <Thermometer className="w-8 h-8 text-orange-400" />
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Power Usage</h3>
              <p className="text-2xl font-bold text-white">{getCurrentValue('power').toFixed(0)}W</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrend('power') >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
                <span className={`text-xs ${getTrend('power') >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(getTrend('power')).toFixed(0)}W
                </span>
              </div>
            </div>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
          <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">Performance</TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-slate-700">Efficiency</TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-slate-700">Assets</TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">System Performance</h3>
              <div className="flex space-x-2">
                {['1h', '6h', '24h'].map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 text-xs rounded ${
                      selectedTimeRange === range
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="timestamp" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#10b981" name="Memory %" />
                <Line type="monotone" dataKey="temperature" stroke="#f59e0b" name="Temperature °F" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">System Efficiency Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="timestamp" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="Efficiency %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Asset Efficiency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assetPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="efficiency" fill="#10b981" name="Efficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Asset Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="efficiency"
                    label={(entry) => `${entry.name}: ${entry.efficiency}%`}
                  >
                    {assetPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">System Alerts & Notifications</h3>
            <div className="space-y-4">
              {systemAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className="flex items-start space-x-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                >
                  <span className="text-lg">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <p className="text-white">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
