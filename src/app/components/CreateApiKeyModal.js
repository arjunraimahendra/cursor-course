'use client';
import { useState } from 'react';

export default function CreateApiKeyModal({ onClose, onCreateKey }) {
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(4000);

  const handleSubmit = () => {
    onCreateKey({ newKeyName, monthlyLimit });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-semibold mb-4">Create a new API key</h2>
        <p className="text-gray-600 mb-6">
          Enter a name and limit for the new API key.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block mb-2">
              Key Name — <span className="text-gray-500">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              placeholder="Key Name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Limit monthly usage*
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>

          <div className="flex gap-3 justify-end mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 