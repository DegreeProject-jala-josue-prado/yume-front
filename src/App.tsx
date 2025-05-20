import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './/pages/LoginPage';
import HomePage from './/pages/HomePage';
import SalesPage from './pages/SalesPage';
import PurchasePage from './pages/PurchasePage';
import ReportPage from './pages/ReportPage';
import StockPage from './pages/StockPage';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Navigate to="sales" replace />} /> 
          <Route path="sales" element={<SalesPage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
