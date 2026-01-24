import React, { useState, useEffect } from 'react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

interface CookiePreferences {
  analytics: boolean;
  preferences: boolean;
  advertising: boolean;
}

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    analytics: false,
    preferences: false,
    advertising: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleCheckboxChange = (key: keyof CookiePreferences) => {
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveConsent = (preferences: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    saveConsent(cookiePreferences);
  };

  const handleRefuseAll = () => {
    saveConsent({
      analytics: false,
      preferences: false,
      advertising: false,
    });
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      preferences: true,
      advertising: true,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-slate-100">Cookie settings</h2>
          
          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            Our website uses cookies which are necessary for running the website and for providing the services you request. We would also like to set the following optional cookies on your device. You can change these settings any time later by clicking "Change cookie settings" at the bottom of any page. For more information, please read our{' '}
            <a href="#" className="text-green-400 underline hover:text-green-300">
              Cookie Information.
            </a>
          </p>

          {/* Cookie Options */}
          <div className="space-y-5">
            {/* Analytics */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="analytics"
                checked={cookiePreferences.analytics}
                onCheckedChange={() => handleCheckboxChange('analytics')}
                className="mt-1 border-slate-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="space-y-1">
                <label htmlFor="analytics" className="text-sm font-medium text-slate-200 cursor-pointer">
                  Analytics
                </label>
                <p className="text-sm text-slate-400">
                  We collect statistics to understand how many visitors we have, how our visitors interact with the site and how we can improve it. The collected data does not directly identify anyone.
                </p>
              </div>
            </div>

            {/* Preferences */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="preferences"
                checked={cookiePreferences.preferences}
                onCheckedChange={() => handleCheckboxChange('preferences')}
                className="mt-1 border-slate-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="space-y-1">
                <label htmlFor="preferences" className="text-sm font-medium text-slate-200 cursor-pointer">
                  Preferences
                </label>
                <p className="text-sm text-slate-400">
                  We store choices you have made so that they are remembered across visits in order to provide you a more personalized experience.
                </p>
              </div>
            </div>

            {/* Advertising and tracking */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="advertising"
                checked={cookiePreferences.advertising}
                onCheckedChange={() => handleCheckboxChange('advertising')}
                className="mt-1 border-slate-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="space-y-1">
                <label htmlFor="advertising" className="text-sm font-medium text-slate-200 cursor-pointer">
                  Advertising and tracking
                </label>
                <p className="text-sm text-slate-400">
                  Your browsing behavior is tracked across websites by advertising and social network service providers. You may see tailored advertising and content on other websites based on your browsing profile.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={handleAcceptSelected}
              variant="outline"
              className="border-slate-500 text-slate-200 hover:bg-slate-700 hover:text-white rounded-full px-6"
            >
              Accept selected
            </Button>
            <Button
              onClick={handleRefuseAll}
              variant="outline"
              className="border-slate-500 text-slate-200 hover:bg-slate-700 hover:text-white rounded-full px-6"
            >
              Refuse all
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
