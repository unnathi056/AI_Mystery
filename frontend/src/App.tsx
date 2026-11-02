import { Link, Route, Routes } from "react-router-dom";
import { CreateMystery } from "./pages/CreateMystery";
import { Landing } from "./pages/Landing";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="AI Mystery Room home">
          <span className="brand-mark">✳</span>
          <span>CASE<span className="brand-muted">FILE</span></span>
        </Link>
        <nav>
          <Link to="/create" className="nav-link">Create a case <span>↗</span></Link>
          <span className="status">CASE ROOM OPEN</span>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateMystery />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <footer className="footer">
        <span>CASEFILE / AI MYSTERY ROOM</span>
        <span>FICTIONAL CASES. REAL DEDUCTION.</span>
      </footer>
    </div>
  );
}