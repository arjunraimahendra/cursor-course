import './globals.css';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className={`flex-1 ml-64 transition-all duration-300`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
