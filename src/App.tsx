import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ProtectedRoute } from './app/hooks/ProtectRoutes';
import Dashboard from './app/dashboard/App';
import { Login } from './app/login/Login';
import { DomainManagement } from './app/dashboard/configuration/domain-management/DomainManagement';
import { WebHooks } from './app/dashboard/configuration/event-webhooks/WebHooks';
import { EditServer } from './app/dashboard/configuration/edit-server/EditServer';
import Campaign from './app/dashboard/campaign/Campaign';
import { ReportsByCampaign } from './app/dashboard/reports/reports-by-campaign/ReportsByCampaign';
import { TotalReports } from './app/dashboard/reports/total-reports/TotalReports';
import { Unsubscribe } from './app/unsubscribe/Unsuscribe';
import { SuppressionList } from './app/dashboard/supressionList/SupressionList';
import Notification from './app/dashboard/notifications/Notification.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/campaign" element={<Campaign />} />
          <Route
            path="/dashboard/configuration/domain-management"
            element={<DomainManagement />}
          />
          <Route
            path="/dashboard/configuration/event-webhooks"
            element={<WebHooks />}
          />
          <Route
            path="/dashboard/supressionList"
            element={<SuppressionList />}
          />
          <Route
            path="/dashboard/configuration/edit-server"
            element={<EditServer />}
          />
          <Route
            path="/dashboard/reports/reports-by-campaign"
            element={<ReportsByCampaign />}
          />
          <Route
            path="/dashboard/reports/total-reports"
            element={<TotalReports />}
          />
          <Route path="/dashboard/notifications" element={<Notification />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
