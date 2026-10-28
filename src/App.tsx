import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import { ScrollToTop } from './utils/ScrollToTop';

// The Strict Six Pages
import { Home } from './pages/Home';
import { Memories } from './pages/Memories';
import { FunZone } from './pages/FunZone';
import { LittleThings } from './pages/LittleThings';
import { Letter } from './pages/Letter';
import { Surprise } from './pages/Surprise';

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#F8C8DC] selection:text-[#553047]">
        {/* Floating background decorative hearts & stars */}
        <FloatingElements />

        {/* Global Navigation Header (6 main routes) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/fun-zone" element={<FunZone />} />
            <Route path="/little-things" element={<LittleThings />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="/surprise" element={<Surprise />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Scrapbook Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
