import React, { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/SharedUI/Loader.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Collections = lazy(() => import('./pages/Collections.jsx'))
const Author = lazy(() => import('./pages/About.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeToggle />
      <Navbar />
      <main className="flex-1 pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <Suspense fallback={<div className="mt-20 flex justify-center"><Loader /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/author" element={<Author />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<Navigate to="/author" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
