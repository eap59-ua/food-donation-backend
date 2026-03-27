import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootProvider } from '@/app/providers/RootProvider';
import { Navbar } from '@/components/common/Navbar';
import { LandingPage } from '@/features/landing/pages/LandingPage';
// Placeholder imports (will be implemented next)
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';

function App() {
  return (
    <RootProvider>
      <Router>
        <div className="relative">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RootProvider>
  );
}

export default App;
