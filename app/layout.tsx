import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EU Software Alternatives",
  description: "Discover EU-based alternatives to popular US tools with enhanced GDPR compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white min-h-screen flex flex-col antialiased">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold">EU Clones</span>
                </Link>
                <nav className="hidden md:ml-10 md:flex md:space-x-8">
                  <Link href="/" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/tools" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                    Tools
                  </Link>
                  <Link href="/pricing" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                    Pricing
                  </Link>
                  <Link href="/case-studies" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                    Case Studies
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/contact" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Contact Sales
                </Link>
                <Link 
                  href="/login" 
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign in
                </Link>
                <Link 
                  href="/get-started" 
                  className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">EU Clones</h3>
                <p className="text-gray-600">Your one-stop directory for EU-based alternatives to popular US tools.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Products</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">All Tools</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">GDPR Compliance</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">EU Hosting</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Case Studies</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
              <p>© {new Date().getFullYear()} EU Clones. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}