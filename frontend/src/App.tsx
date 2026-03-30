import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { RootProvider } from '@/app/providers/RootProvider';
import { Navbar } from '@/components/common/Navbar';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { DonationsListPage } from '@/features/donations/pages/DonationsListPage';
import { CreateDonationPage } from '@/features/donations/pages/CreateDonationPage';
import { DonationDetailPage } from '@/features/donations/pages/DonationDetailPage';
import { RequestsListPage } from '@/features/requests/pages/RequestsListPage';
import { CreateRequestPage } from '@/features/requests/pages/CreateRequestPage';
import { RequestDetailPage } from '@/features/requests/pages/RequestDetailPage';
import { ProfilePage } from '@/features/users/pages/ProfilePage';
import { useAuth } from '@/features/auth/hooks/useAuth';

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// Componente dinámico para DonationDetailPage
const DonationDetailPageWrapper = () => {
  const { id } = useParams();
  return <DonationDetailPage donationId={id || ''} />;
};

function App() {
  return (
    <RootProvider>
      <Router>
        <div className="relative min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rutas protegidas */}
              <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
              
              {/* Donaciones */}
              <Route path="/donations" element={<DonationsListPage />} />
              <Route path="/donations/new" element={<ProtectedRoute element={<CreateDonationPage />} />} />
              <Route path="/donations/:id" element={<DonationDetailPageWrapper />} />

              {/* Solicitudes */}
              <Route path="/requests" element={<RequestsListPage />} />
              <Route path="/requests/new" element={<ProtectedRoute element={<CreateRequestPage />} />} />
              <Route path="/requests/:id" element={<RequestDetailPage />} />

              {/* Perfil */}
              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RootProvider>
  );
}

export default App;
