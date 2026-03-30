import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootProvider } from '@/app/providers/RootProvider';
import { Navbar } from '@/components/common/Navbar';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { DonationsPage } from '@/features/donations/pages/DonationsPage';
import { DonationDetailPage } from '@/features/donations/pages/DonationDetailPage';
import { CreateDonationPage } from '@/features/donations/pages/CreateDonationPage';
import { EditDonationPage } from '@/features/donations/pages/EditDonationPage';
import { MyRequestsPage } from '@/features/requests/pages/MyRequestsPage';

function App() {
  return (
    <RootProvider>
      <Router>
        <div className="relative">
          <Navbar />
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/donations" element={<DonationsPage />} />
              <Route path="/donations/:id" element={<DonationDetailPage />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/donations/new" element={<ProtectedRoute allowedRoles={['DONANTE', 'ADMIN']}><CreateDonationPage /></ProtectedRoute>} />
              <Route path="/donations/:id/edit" element={<ProtectedRoute allowedRoles={['DONANTE', 'ADMIN']}><EditDonationPage /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><MyRequestsPage /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </RootProvider>
  );
}

export default App;
