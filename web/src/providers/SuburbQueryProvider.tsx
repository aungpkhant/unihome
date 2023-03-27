import { getIdealSuburb, TGetIdealSuburbDTO } from 'features/core/api';
import { useAsync } from 'hooks/useAsync';
import { createContext, useContext } from 'react';
import { getQuickSearchWeightage } from 'utils';
import { useSuburbFilters } from './SuburbFilterProvider';

/*
Basically trying to wrap useAsync to provide suburb results with a Provider
*/

type SuburbQuery = {
  setData: (data: { status: string }) => void;
  setError: (error: any) => void;
  error: any;
  status: any;
  data: any;
  fetch: (payload: TGetIdealSuburbDTO) => void;
};

const SuburbQueryContext = createContext<SuburbQuery>(null as any);

export function SuburbQueryProvider({ children }: { children: React.ReactNode }) {
  const result = useAsync();

  const getSuburbs = (payload: TGetIdealSuburbDTO) => {
    result.run(getIdealSuburb(payload));
  };

  const { run, ...queryStates } = result;

  const value = {
    fetch: getSuburbs,
    ...queryStates,
  };

  return <SuburbQueryContext.Provider value={value}>{children}</SuburbQueryContext.Provider>;
}

export function useSuburbQuery() {
  return useContext(SuburbQueryContext);
}
