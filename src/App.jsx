import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContributionGuide from './pages/ContributionGuide'
import BestPractices from './pages/BestPractices'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="guia-contribuicao" element={<ContributionGuide />} />
        <Route path="boas-praticas" element={<BestPractices />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
