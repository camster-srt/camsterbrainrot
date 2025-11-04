import './globals.css'
import { ProductsProvider } from './context/ProductsContext'

export const metadata = {
  title: 'CamsterBrainrot',
  description: 'Official Brainrot Store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <ProductsProvider>
          <header className="bg-white shadow p-4">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">CamsterBrainrot</h1>
              <div className="space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/admin" className="text-gray-600 hover:text-gray-900">Admin</a>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto p-8">
              {children}
            </main>

            <footer className="bg-white shadow p-4 mt-12 text-center text-gray-500">
              © 2025 CamsterBrainrot. All rights reserved.
            </footer>
          </header>
        </ProductsProvider>
      </body>
    </html>
  )
}