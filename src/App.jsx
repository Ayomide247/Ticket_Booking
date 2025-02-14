import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TicketProvider } from "./components/TicketContext";
import { TicketPage } from "./pages";

function App() {
  return (
    <TicketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TicketPage />} />
          {/* <Route path="*" element={<NotFound />} /> For undefined routes */}
        </Routes>
      </Router>
    </TicketProvider>
  );
}

export default App;
