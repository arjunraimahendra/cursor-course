'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/app/components/Toast';
import Cookies from 'js-cookie';

export default function ProtectedPage() {
  const router = useRouter();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    // Check if API key exists in cookies
    const apiKey = Cookies.get('apiKey');
    if (!apiKey) {
      router.push('/playground');
    }
  }, [router]);

  return (
    <div className="p-8">
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })} 
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Pages / Protected
          </div>
          <h1 className="text-2xl font-bold">Protected Page</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Protected Area</h2>
          <p className="text-gray-600">
            You have successfully authenticated with a valid API key.
          </p>
        </div>
      </div>
    </div>
  );
} 