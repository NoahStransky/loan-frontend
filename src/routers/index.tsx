import { Routes, Route } from 'react-router-dom';

import LoanApp from '../views/loan';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoanApp />} />
    </Routes>
  );
}
