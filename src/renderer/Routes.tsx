import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { BasesCalculator } from "./pages/bases"
import { DataCalculator } from "./pages/data"
import { EquationCalculator } from "./pages/equacao"
import { PACalculator } from "./pages/pa"
import { DefaultCalculator } from "./pages/padrao"
import { PGCalculator } from "./pages/pg"
import { TimeCalculator } from "./pages/time"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/padrao" element={<DefaultCalculator />} />
                <Route path="/bases" element={<BasesCalculator />} />
                <Route path="/pg" element={<PGCalculator />} />
                <Route path="/pa" element={<PACalculator />} />
                <Route path="/time" element={<TimeCalculator />} />
                <Route path="/data" element={<DataCalculator />} />
                <Route path="/equacao" element={<EquationCalculator />} />
            </Routes>
        </Router>
    )
}