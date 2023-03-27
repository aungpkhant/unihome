import { BACKEND_URL } from 'config';
import { IFactorWeightages, ISuburb, IUniversity, QueryListResult } from 'types';

export function getUniversities() {
  return fetch(`${BACKEND_URL}/universities`)
    .then((res) => res.json())
    .then((res: IUniversity[]) => res);
}

export type TGetIdealSuburbDTO = IFactorWeightages & {
  uni_code: string;
};

export function getIdealSuburb(getIdealSuburbDTO: TGetIdealSuburbDTO) {
  return fetch(
    `${BACKEND_URL}/ideal-suburb?` +
      new URLSearchParams(getIdealSuburbDTO as unknown as Record<string, string>)
  )
    .then((res) => res.json())
    .then((res: QueryListResult<ISuburb>) => res);
}
