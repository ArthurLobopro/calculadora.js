import { Route, Routes, HashRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { PACalculator } from "./pages/pa"
import { BasesCalculator } from "./pages/bases"
import { PGCalculator } from "./pages/pg"
import { DataCalculator } from "./pages/data"
import { EquationCalculator } from "./pages/equacao"
import { DefaultCalculator } from "./pages/padrao"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/padrao" element={<DefaultCalculator />} />
                <Route path="/bases" element={<BasesCalculator />} />
                <Route path="/pg" element={<PGCalculator />} />
                <Route path="/pa" element={<PACalculator />} />
                <Route path="/data" element={<DataCalculator />} />
                <Route path="/equacao" element={<EquationCalculator />} />
            </Routes>
        </Router>
    )
}