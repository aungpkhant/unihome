import { useUniversities } from 'hooks/useUniversity';
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Factor, IFactorWeightages, IUniversity, WeightageValues } from 'types';

type TSuburbFilterContextState = {
  university: IUniversity | '';
  quickSearchFactor: Factor | '';
  factorWeightages: IFactorWeightages;
};

type TSuburbFilterActionType =
  | {
      type: 'reset';
    }
  | { type: 'university_changed'; payload: TSuburbFilterContextState['university'] }
  | { type: 'quicksearch_factor_changed'; payload: TSuburbFilterContextState['quickSearchFactor'] }
  | {
      type: 'factor_weightages_changed';
      payload: {
        factor: Factor;
        weightage: WeightageValues;
      };
    };

const initialValue: TSuburbFilterContextState = {
  university: '',
  quickSearchFactor: '',
  factorWeightages: {
    rent: 2,
    crime_rate: 2,
    distance: 2,
  },
};

// @ts-ignore
const SuburbFilterContext = createContext<TSuburbFilterContextState>(null);
// @ts-ignore
const SuburbFilterDispatchContext = createContext<Dispatch<TSuburbFilterActionType>>(null);

function withLogs<TState, TAction>(reducer: (state: TState, action: TAction) => TState) {
  // Wrapper func
  return function (state: TState, action: TAction) {
    // Logic pre
    // console.log('action', action);

    const result = reducer(state, action);

    console.log('result', result);

    return result;
  };
}

const suburbFilterReducer = (
  state: TSuburbFilterContextState,
  action: TSuburbFilterActionType
): TSuburbFilterContextState => {
  switch (action.type) {
    case 'reset':
      return initialValue;
    case 'university_changed':
      return {
        ...state,
        university: action.payload,
      };
    case 'quicksearch_factor_changed':
      return {
        ...state,
        quickSearchFactor: action.payload,
      };
    case 'factor_weightages_changed':
      return {
        ...state,
        factorWeightages: {
          ...state.factorWeightages,
          [action.payload.factor]: action.payload.weightage,
        },
      };
    default:
      throw new Error('Invalid Action Type In SuburbFilterReducer');
  }
};

export const SuburbFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const uniQuery = useUniversities();
  const [filters, dispatch] = useReducer(withLogs(suburbFilterReducer), initialValue);

  return (
    <SuburbFilterContext.Provider value={filters}>
      <SuburbFilterDispatchContext.Provider value={dispatch}>
        {children}
      </SuburbFilterDispatchContext.Provider>
    </SuburbFilterContext.Provider>
  );
};

export function useSuburbFilters() {
  return useContext(SuburbFilterContext);
}

export function useSuburbFiltersDispatch() {
  return useContext(SuburbFilterDispatchContext);
}
