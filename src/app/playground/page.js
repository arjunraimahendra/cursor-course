'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/app/components/Toast';
import Cookies from 'js-cookie';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        Cookies.set('apiKey', apiKey, { expires: 7 });
        showToast('Valid API Key', 'success');
        
        setTimeout(() => {
          router.push('/protected');
          router.refresh();
        }, 1500);
      } else {
        showToast('Invalid API Key', 'error');
      }
    } catch (error) {
      showToast('Error validating API key', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })} 
        />
      )}

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Pages / API Playground
          </div>
          <h1 className="text-2xl font-bold">API Playground</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tvly-live-xxxxxxxxxxxxxxxx"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Validating...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 