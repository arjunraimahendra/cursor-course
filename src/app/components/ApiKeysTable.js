'use client';
import { useState } from 'react';
import { maskApiKey } from '@/app/utils/apiKeyUtils';

export default function ApiKeysTable({ 
  apiKeys, 
  onDeleteKey, 
  onUpdateKeyName,
  onToggleVisibility,
  onShowToast
}) {
  const [editingKey, setEditingKey] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (key, id) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedId(id);
      onShowToast('API Key copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      onShowToast('Failed to copy API key', 'error');
      console.error('Failed to copy:', err);
    }
  };

  const startEditing = (apiKey) => {
    setEditingKey(apiKey.id);
    setEditingName(apiKey.name);
  };

  const saveEdit = () => {
    if (!editingName.trim()) return;
    onUpdateKeyName(editingKey, editingName);
    setEditingKey(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditingName('');
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-gray-600 w-[200px]">NAME</th>
            <th className="text-left p-4 text-gray-600 w-[100px]">USAGE</th>
            <th className="text-left p-4 text-gray-600">KEY</th>
            <th className="text-right p-4 text-gray-600 w-[160px]">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((apiKey) => (
            <tr key={apiKey.id} className="border-b last:border-b-0">
              <td className="p-4 w-[200px]">
                {editingKey === apiKey.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                    <button
                      onClick={saveEdit}
                      className="p-1 hover:bg-gray-100 rounded-lg text-green-600"
                      title="Save"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 hover:bg-gray-100 rounded-lg text-red-600"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  apiKey.name
                )}
              </td>
              <td className="p-4 w-[100px]">{apiKey.usage || 0}</td>
              <td className="p-4 font-mono text-sm">
                {maskApiKey(apiKey.key, apiKey.isVisible)}
              </td>
              <td className="p-4 text-right w-[160px]">
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => onToggleVisibility(apiKey.id)}
                    className={`p-2 hover:bg-gray-100 rounded-lg ${apiKey.isVisible ? 'text-blue-500' : ''}`}
                    title={apiKey.isVisible ? "Hide API Key" : "Show API Key"}
                  >
                    {apiKey.isVisible ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                    className={`p-2 hover:bg-gray-100 rounded-lg ${copiedId === apiKey.id ? 'text-green-500' : ''}`}
                    title="Copy to clipboard"
                  >
                    {copiedId === apiKey.id ? '✓' : '📋'}
                  </button>
                  <button
                    onClick={() => startEditing(apiKey)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Edit name"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDeleteKey(apiKey.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                    title="Delete key"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 