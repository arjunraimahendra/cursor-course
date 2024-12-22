'use client';

export default function UsageCard() {
  return (
    <div className="mb-8 p-8 rounded-xl bg-gradient-to-r from-rose-200 via-purple-300 to-blue-300">
      <div className="text-sm text-white/90 mb-2">CURRENT PLAN</div>
      <h2 className="text-3xl font-bold text-white mb-6">Project</h2>
      
      <div className="text-white mb-2">
        API Limit
      </div>
      <div className="bg-white/20 rounded-full h-2 mb-2">
        <div className="bg-white rounded-full h-2" style={{width: '28%'}}></div>
      </div>
      <div className="text-white/90 text-sm">
        1,132 / 4,000 Requests
      </div>
    </div>
  );
} 