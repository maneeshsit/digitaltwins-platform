
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { 
  Power, 
  Settings, 
  AlertTriangle, 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Shield,
  Cpu,
  Database,
  Network
} from 'lucide-react';

interface SystemControl {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value?: number;
  type: 'toggle' | 'slider' | 'button';
  category: 'system' | 'simulation' | 'security' | 'performance';
}

export const ControlPanel = () => {
  const [controls, setControls] = useState<SystemControl[]>([
    {
      id: 'auto-sync',
      name: 'Auto Synchronization',
      description: 'Automatically sync digital twin with physical assets',
      enabled: true,
      type: 'toggle',
      category: 'system'
    },
    {
      id: 'gpu-acceleration',
      name: 'GPU Acceleration',
      description: 'Enable NVIDIA GPU acceleration for rendering',
      enabled: true,
      type: 'toggle',
      category: 'performance'
    },
    {
      id: 'ai-prediction',
      name: 'AI Predictive Analytics',
      description: 'Use AI to predict system failures and maintenance needs',
      enabled: true,
      type: 'toggle',
      category: 'system'
    },
    {
      id: 'security-monitoring',
      name: 'Security Monitoring',
      description: 'Real-time security threat detection',
      enabled: true,
      type: 'toggle',
      category: 'security'
    },
    {
      id: 'simulation-quality',
      name: 'Simulation Quality',
      description: 'Adjust rendering quality vs performance',
      enabled: true,
      value: 85,
      type: 'slider',
      category: 'simulation'
    },
    {
      id: 'data-retention',
      name: 'Data Retention Period',
      description: 'Historical data retention in days',
      enabled: true,
      value: 30,
      type: 'slider',
      category: 'system'
    }
  ]);

  const [systemStatus, setSystemStatus] = useState({
    omniverseConnected: true,
    simulationRunning: true,
    dataStreaming: true,
    securityActive: true
  });

  const handleToggleControl = (id: string) => {
    setControls(prev => 
      prev.map(control => 
        control.id === id 
          ? { ...control, enabled: !control.enabled }
          : control
      )
    );
  };

  const handleSliderChange = (id: string, value: number[]) => {
    setControls(prev => 
      prev.map(control => 
        control.id === id 
          ? { ...control, value: value[0] }
          : control
      )
    );
  };

  const handleSystemAction = (action: string) => {
    console.log(`Executing system action: ${action}`);
    // Simulate system actions
    switch (action) {
      case 'restart-simulation':
        setSystemStatus(prev => ({ ...prev, simulationRunning: false }));
        setTimeout(() => {
          setSystemStatus(prev => ({ ...prev, simulationRunning: true }));
        }, 2000);
        break;
      case 'emergency-stop':
        setSystemStatus(prev => ({ 
          ...prev, 
          simulationRunning: false, 
          dataStreaming: false 
        }));
        break;
      case 'reset-system':
        // Reset all controls to default
        window.location.reload();
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return Database;
      case 'simulation': return Cpu;
      case 'security': return Shield;
      case 'performance': return Network;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'text-blue-400';
      case 'simulation': return 'text-green-400';
      case 'security': return 'text-red-400';
      case 'performance': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

  const categories = ['system', 'simulation', 'security', 'performance'];

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Omniverse</h3>
              <p className="text-lg font-semibold text-white">
                {systemStatus.omniverseConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${systemStatus.omniverseConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Simulation</h3>
              <p className="text-lg font-semibold text-white">
                {systemStatus.simulationRunning ? 'Running' : 'Stopped'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${systemStatus.simulationRunning ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Data Stream</h3>
              <p className="text-lg font-semibold text-white">
                {systemStatus.dataStreaming ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${systemStatus.dataStreaming ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-300">Security</h3>
              <p className="text-lg font-semibold text-white">
                {systemStatus.securityActive ? 'Protected' : 'Vulnerable'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${systemStatus.securityActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">System Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleSystemAction('restart-simulation')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Simulation
          </Button>
          
          <Button
            onClick={() => handleSystemAction('emergency-stop')}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            <Square className="w-4 h-4 mr-2" />
            Emergency Stop
          </Button>
          
          <Button
            onClick={() => handleSystemAction('reset-system')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Power className="w-4 h-4 mr-2" />
            Reset System
          </Button>
        </div>
      </Card>

      {/* Control Categories */}
      {categories.map(category => {
        const categoryControls = controls.filter(control => control.category === category);
        const CategoryIcon = getCategoryIcon(category);
        
        return (
          <Card key={category} className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <CategoryIcon className={`w-5 h-5 ${getCategoryColor(category)}`} />
              <h2 className="text-xl font-semibold text-white capitalize">{category} Controls</h2>
            </div>
            
            <div className="space-y-6">
              {categoryControls.map(control => (
                <div key={control.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{control.name}</h3>
                    <p className="text-sm text-slate-400">{control.description}</p>
                  </div>
                  
                  <div className="ml-4">
                    {control.type === 'toggle' && (
                      <Switch
                        checked={control.enabled}
                        onCheckedChange={() => handleToggleControl(control.id)}
                      />
                    )}
                    
                    {control.type === 'slider' && (
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">0</span>
                          <span className="text-xs text-white font-medium">{control.value}</span>
                          <span className="text-xs text-slate-400">100</span>
                        </div>
                        <Slider
                          value={[control.value || 0]}
                          onValueChange={(value) => handleSliderChange(control.id, value)}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {/* Warning Panel */}
      <Card className="p-6 bg-slate-800 border-yellow-500/50">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <div>
            <h3 className="text-white font-semibold">System Advisory</h3>
            <p className="text-sm text-slate-300">
              High GPU utilization detected. Consider reducing simulation quality for optimal performance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
