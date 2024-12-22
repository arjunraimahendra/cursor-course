'use client';
import { useState, useEffect } from 'react';
import { apiKeyService } from '@/app/services/apiKeyService';
import { generateApiKey } from '@/app/utils/apiKeyUtils';
import Toast from '@/app/components/Toast';
import CreateApiKeyModal from '@/app/components/CreateApiKeyModal';
import ApiKeysTable from '@/app/components/ApiKeysTable';
import UsageCard from '@/app/components/UsageCard';

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (err) {
      setError('Failed to fetch API keys');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = async ({ newKeyName, monthlyLimit }) => {
    try {
      const newKeyValue = generateApiKey(newKeyName);
      const data = await apiKeyService.createApiKey({
        name: newKeyName,
        key: newKeyValue,
        monthly_limit: monthlyLimit,
      });

      setApiKeys([data, ...apiKeys]);
      setIsCreating(false);
      showToast('API Key created successfully');
    } catch (err) {
      showToast('Failed to create API key', 'error');
      console.error('Error:', err);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleDeleteKey = async (id) => {
    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showToast('API Key deleted successfully', 'warning');
    } catch (err) {
      showToast('Failed to delete API key', 'error');
      console.error('Error:', err);
    }
  };

  const handleUpdateKeyName = async (id, name) => {
    try {
      await apiKeyService.updateApiKeyName(id, name);
      setApiKeys(apiKeys.map(key => {
        if (key.id === id) {
          return { ...key, name: name.trim() };
        }
        return key;
      }));
      showToast('API Key name updated successfully');
    } catch (err) {
      showToast('Failed to update API key name', 'error');
      console.error('Error:', err);
    }
  };

  const handleToggleKeyVisibility = (id) => {
    setApiKeys(apiKeys.map(key => {
      if (key.id === id) {
        return { ...key, isVisible: !key.isVisible };
      }
      return key;
    }));
  };

  if (isLoading) return <div className="p-8 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>;
  if (error) return <div className="p-8 flex items-center justify-center"><div className="text-red-500">{error}</div></div>;

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
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Pages / Overview
          </div>
          <h1 className="text-2xl font-bold">Overview</h1>
        </div>

        <UsageCard />
        
        {/* API Keys Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span>+</span>
              <span>New API Key</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </p>
        </div>

        {isCreating && (
          <CreateApiKeyModal
            onClose={() => setIsCreating(false)}
            onCreateKey={handleCreateKey}
          />
        )}

        <ApiKeysTable
          apiKeys={apiKeys}
          onDeleteKey={handleDeleteKey}
          onUpdateKeyName={handleUpdateKeyName}
          onToggleVisibility={handleToggleKeyVisibility}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
