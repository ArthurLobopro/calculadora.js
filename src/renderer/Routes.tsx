import { Route, Routes, HashRouter as Router, useNavigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { BasesCalculator } from "../calculators/bases"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bases" element={<BasesCalculator />} />
            </Routes>
        </Router>
    )
}