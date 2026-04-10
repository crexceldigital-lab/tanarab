import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Properties from "./pages/Properties";
import MapSearch from "./pages/MapSearch";
import PropertyDetail from "./pages/PropertyDetail";
import Developers from "./pages/Developers";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import OwnerDashboard from "./pages/dashboards/OwnerDashboard";
import DeveloperDashboard from "./pages/dashboards/DeveloperDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AdminUsers from "./pages/dashboards/AdminUsers";
import AdminListings from "./pages/dashboards/AdminListings";
import AdminVerifications from "./pages/dashboards/AdminVerifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/map-search" element={<MapSearch />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Auth required */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/buyer/dashboard" element={<ProtectedRoute requiredRole="user"><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/buyer/*" element={<ProtectedRoute requiredRole="user"><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/owner/dashboard" element={<ProtectedRoute requiredRole="owner"><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/owner/*" element={<ProtectedRoute requiredRole="owner"><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/developer/dashboard" element={<ProtectedRoute requiredRole="developer"><DeveloperDashboard /></ProtectedRoute>} />
            <Route path="/developer/*" element={<ProtectedRoute requiredRole="developer"><DeveloperDashboard /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/listings" element={<ProtectedRoute requiredRole="admin"><AdminListings /></ProtectedRoute>} />
            <Route path="/admin/verifications" element={<ProtectedRoute requiredRole="admin"><AdminVerifications /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
