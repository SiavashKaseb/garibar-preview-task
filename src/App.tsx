import { BrowserRouter, Routes, Route } from "react-router";
import DashboardView from "@/features/admin/dashboard/ui/DashboardView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        {/* because we make a test project, we just use DashboardView as a public route */}
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
