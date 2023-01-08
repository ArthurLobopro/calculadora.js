import { Route, Routes, HashRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { PACalculator } from "./pages/pa"
import { BasesCalculator } from "./pages/bases"
import { PGCalculator } from "./pages/pg"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bases" element={<BasesCalculator />} />
                <Route path="/pg" element={<PGCalculator />} />
                <Route path="/pa" element={<PACalculator />} />
            </Routes>
        </Router>
    )
}