import { getUniversities } from 'features/core/api';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUniversity, QueryState, RequestStatus } from 'types';
import { useAsync } from './useAsync';

type UniversityContextState = QueryState<IUniversity[]> | undefined;

const universityContext = createContext<UniversityContextState>(undefined);

export function UniversityProvider({ children }: { children: React.ReactNode }) {
  const query = useProvideUniversity();

  return <universityContext.Provider value={query}>{children}</universityContext.Provider>;
}

export function useProvideUniversity() {
  const query = useAsync({ status: 'pending' });

  useEffect(() => {
    query.run(getUniversities());
  }, []);

  return {
    data: query.data as IUniversity[],
    status: query.status as RequestStatus,
    error: query.error,
  };
}

export function useUniversities() {
  return useContext(universityContext);
}
