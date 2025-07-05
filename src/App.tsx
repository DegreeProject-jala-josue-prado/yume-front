import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './/pages/LoginPage';
import HomePage from './/pages/HomePage';
import SalesPage from './pages/SalesPage';
import PurchasePage from './pages/PurchasePage';
import ReportPage from './pages/ReportPage';
import StockPage from './pages/StockPage';
import NewPurchaseWizardFormik from './pages/NewPurchaseWizardFormik';
import ClientsPage from './pages/ClientsPage';
import WoodTypesPage from './pages/WoodTypesPage';
import TransportPage from './pages/TransportPage';
import ProvidersPage from './pages/ProvidersPage';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Navigate to="sales" replace />} /> 
          <Route path="sales" element={<SalesPage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="purchase/new" element={<NewPurchaseWizardFormik />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="wood-types" element={<WoodTypesPage />} />
          <Route path="transport" element={<TransportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
