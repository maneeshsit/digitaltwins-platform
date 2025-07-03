/// <reference path="../types/google-maps.d.ts" />

import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Layers, ZoomIn, ZoomOut, RotateCcw, Satellite } from 'lucide-react';

interface DigitalAsset {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'factory' | 'warehouse' | 'vehicle' | 'sensor';
  status: 'active' | 'maintenance' | 'offline';
  data: {
    temperature?: number;
    efficiency?: number;
    lastUpdate: string;
  };
}

export const MapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapApiKey, setMapApiKey] = useState('');
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<DigitalAsset | null>(null);

  const digitalAssets: DigitalAsset[] = [
    {
      id: '1',
      name: 'Manufacturing Plant A',
      lat: 37.7749,
      lng: -122.4194,
      type: 'factory',
      status: 'active',
      data: { temperature: 72, efficiency: 94, lastUpdate: '2 min ago' }
    },
    {
      id: '2',
      name: 'Distribution Center B',
      lat: 37.7849,
      lng: -122.4094,
      type: 'warehouse',
      status: 'active',
      data: { temperature: 68, efficiency: 87, lastUpdate: '1 min ago' }
    },
    {
      id: '3',
      name: 'Autonomous Vehicle Fleet',
      lat: 37.7649,
      lng: -122.4294,
      type: 'vehicle',
      status: 'active',
      data: { efficiency: 91, lastUpdate: '30 sec ago' }
    },
    {
      id: '4',
      name: 'IoT Sensor Network',
      lat: 37.7549,
      lng: -122.4394,
      type: 'sensor',
      status: 'maintenance',
      data: { temperature: 75, lastUpdate: '5 min ago' }
    }
  ];

  const loadGoogleMaps = (apiKey: string) => {
    if ((window as any).google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    (window as any).initMap = () => {
      setIsApiLoaded(true);
      initializeMap();
    };

    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).google) return;

    const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1e293b' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#94a3b8' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#64748b' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#0f172a' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#374151' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#4b5563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0f172a' }]
        }
      ]
    });

    setMap(mapInstance);

    // Add markers for digital assets
    digitalAssets.forEach(asset => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: asset.lat, lng: asset.lng },
        map: mapInstance,
        title: asset.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: asset.status === 'active' ? '#10b981' : asset.status === 'maintenance' ? '#f59e0b' : '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      marker.addListener('click', () => {
        setSelectedAsset(asset);
      });
    });
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapApiKey.trim()) {
      loadGoogleMaps(mapApiKey);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'factory': return '🏭';
      case 'warehouse': return '🏢';
      case 'vehicle': return '🚛';
      case 'sensor': return '📡';
      default: return '📍';
    }
  };

  if (!isApiLoaded && !(window as any).google) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Google Maps Integration</h2>
          <p className="text-slate-300 mb-4">
            Enter your Google Maps API key to enable the Digital Twin map visualization.
            Get your API key from the Google Cloud Console.
          </p>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <input
              type="text"
              value={mapApiKey}
              onChange={(e) => setMapApiKey(e.target.value)}
              placeholder="Enter Google Maps API Key"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-green-400 focus:outline-none"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Load Map
            </Button>
          </form>
        </Card>

        {/* Mock 3D Visualization */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">3D Digital Twin Preview</h3>
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="text-6xl">🏭</div>
              <h4 className="text-xl text-white">NVIDIA Omniverse Integration</h4>
              <p className="text-slate-300">Real-time 3D visualization and simulation</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-600 p-4 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-slate-300">GPU Accelerated</div>
                </div>
                <div className="bg-slate-600 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="text-sm text-slate-300">Real-time Sync</div>
                </div>
                <div className="bg-slate-600 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="text-sm text-slate-300">AI Powered</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Digital Twin Map</h2>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Satellite className="w-4 h-4 mr-2" />
                3D View
              </Button>
            </div>
          </div>
          <div ref={mapRef} className="w-full h-96 rounded-lg bg-slate-700"></div>
        </Card>
      </div>

      {/* Asset Panel */}
      <div className="space-y-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Digital Assets</h3>
          <div className="space-y-3">
            {digitalAssets.map(asset => (
              <div
                key={asset.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAsset?.id === asset.id
                    ? 'border-green-400 bg-slate-700'
                    : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(asset.type)}</span>
                    <span className="text-sm font-medium text-white">{asset.name}</span>
                  </div>
                  <span className={`text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Last update: {asset.data.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {selectedAsset && (
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Asset Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(selectedAsset.type)}</span>
                <span className="text-white font-medium">{selectedAsset.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {selectedAsset.data.temperature && (
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">Temperature</div>
                    <div className="text-lg font-bold text-white">{selectedAsset.data.temperature}°F</div>
                  </div>
                )}
                {selectedAsset.data.efficiency && (
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">Efficiency</div>
                    <div className="text-lg font-bold text-green-400">{selectedAsset.data.efficiency}%</div>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-slate-600">
                <div className="text-xs text-slate-400">Coordinates</div>
                <div className="text-sm text-white">{selectedAsset.lat}, {selectedAsset.lng}</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
