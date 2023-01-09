import { Route, Routes, HashRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { PACalculator } from "./pages/pa"
import { BasesCalculator } from "./pages/bases"
import { PGCalculator } from "./pages/pg"
import { DataCalculator } from "./pages/data"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bases" element={<BasesCalculator />} />
                <Route path="/pg" element={<PGCalculator />} />
                <Route path="/pa" element={<PACalculator />} />
                <Route path="/data" element={<DataCalculator />} />
            </Routes>
        </Router>
    )
}