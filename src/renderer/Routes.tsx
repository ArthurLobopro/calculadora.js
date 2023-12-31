import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { BasesCalculator } from "./pages/bases"
import { DataCalculator } from "./pages/data"
import { EquationCalculator } from "./pages/equacao"
import { PACalculator } from "./pages/pa"
import { DefaultCalculator } from "./pages/padrao"
import { PGCalculator } from "./pages/pg"
import { TimeCalculator } from "./pages/time"

const changeTitle = (title: string) => document.title = title

const commonProps = { changeTitle }

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/padrao" element={<DefaultCalculator {...commonProps} />} />
                <Route path="/bases" element={<BasesCalculator {...commonProps} />} />
                <Route path="/pg" element={<PGCalculator {...commonProps} />} />
                <Route path="/pa" element={<PACalculator {...commonProps} />} />
                <Route path="/time" element={<TimeCalculator {...commonProps} />} />
                <Route path="/data" element={<DataCalculator {...commonProps} />} />
                <Route path="/equacao" element={<EquationCalculator {...commonProps} />} />
            </Routes>
        </Router>
    )
}