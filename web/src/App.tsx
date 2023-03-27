import { AppProvider } from './providers/AppProvider';
import { ContentLayout } from './components/Layout/ContentLayout';
import { AFilter } from './components/pages/AFilter';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Home } from 'components/pages/Home';
import { Factor, IUniversity } from 'types';
import { useAsync } from 'hooks/useAsync';
import { getIdealSuburb } from 'features/core/api';
import { Results } from 'components/Results/Results';
import { getQuickSearchWeightage } from 'utils';
import { useSuburbFilters } from 'providers/SuburbFilterProvider';

function App() {
  return (
    <AppProvider>
      <ContentLayout
        leftChild={
          <Routes>
            <Route path="/filter" element={<AFilter />} />
            <Route path="/" element={<Home />} />
          </Routes>
        }
        rightChild={<Results />}
      ></ContentLayout>
    </AppProvider>
  );
}

export default App;
