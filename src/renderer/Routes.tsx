import { Route, Routes, HashRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { BasesCalculator } from "./pages/bases"
import { PGCalculator } from "./pg"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bases" element={<BasesCalculator />} />
                <Route path="/pg" element={<PGCalculator />} />
            </Routes>
        </Router>
    )
}