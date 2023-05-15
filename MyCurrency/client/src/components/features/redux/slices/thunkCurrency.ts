/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import type { APIResponseList, APIResponseBaseType, APIResponseConvertedType, ChoisenCurrencyType } from '../../../../types/currencyType';
import type { ThunkActionCreater } from '../store';
import { setAllCurrencyList, setBaseCurrencyList, setConvertedValues } from './currencySlice';

export const loadCurrencyListThunk: ThunkActionCreater = () => (dispatch) => {
  axios(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`)
    .then(({ data }: APIResponseList) => {
      dispatch(setAllCurrencyList(data));
    })
    .catch(console.log);
};

export const loadConvertForBaseCurrencyThunk: ThunkActionCreater<string> = (currency) => (dispatch) => {
  axios<APIResponseBaseType>(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
    .then(({ data }) => {
      dispatch(setBaseCurrencyList(data));
    })
    .catch(console.log);
};

export const loadConvertChoisenCurrencyThunk: ThunkActionCreater<ChoisenCurrencyType[]> =
  ([currency1, currency2]) =>
  (dispatch) => {
    axios<APIResponseConvertedType>(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1.name}/${currency2.name}.json`
    )
      .then(({ data }) => {
        dispatch(setConvertedValues(data));
      })
      .catch(console.log);
  };
