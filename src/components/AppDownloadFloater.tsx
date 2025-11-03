import React from 'react';
import { X } from 'lucide-react';

export const AppDownloadFloater = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl p-4 min-w-[280px]">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full p-1 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">Download the App</h3>
          
          <div className="space-y-2">
            <a
              href="#"
              className="block transition-transform hover:scale-105"
              aria-label="Get it on Google Play"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 w-auto"
              />
            </a>
            
            <a
              href="#"
              className="block transition-transform hover:scale-105"
              aria-label="Download on the App Store"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
