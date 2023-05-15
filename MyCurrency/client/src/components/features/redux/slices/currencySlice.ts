import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BaseCurrencyListType, ChoisenCurrencyType, ConvertedValuesType, CurrencySliceType, CurrencyType } from '../../../../types/currencyType';

const initialState: CurrencySliceType = {
  baseCurrency: 'rub',
  baseCurrencyList: { data: '' },
  baseCurrencyListFilter: 'All',
  choisenCurrency1: { name: 'rub', number: '199' },
  choisenCurrency2: { name: 'usd', number: '237' },
  convertedValues: { usd: 0 },
  allCurrencyList: {},
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setChoisenCurrency: (state, action: PayloadAction<ChoisenCurrencyType[]>) => {
      [state.choisenCurrency1, state.choisenCurrency2] = action.payload;
    },
    setConvertedValues: (state, action: PayloadAction<ConvertedValuesType>) => {
      state.convertedValues = action.payload;
    },
    setAllCurrencyList: (state, action: PayloadAction<CurrencyType>) => {
      state.allCurrencyList = action.payload;
    },
    setBaseCurrencyList: (state, action: PayloadAction<BaseCurrencyListType>) => {
      state.baseCurrencyList = action.payload;
    },
    setBaseCurrencyListFilter: (state, action: PayloadAction<string>) => {
      state.baseCurrencyListFilter = action.payload;
    },
  },
});

export const { setBaseCurrency, setChoisenCurrency, setAllCurrencyList, setBaseCurrencyList, setBaseCurrencyListFilter, setConvertedValues } =
  currencySlice.actions;

export default currencySlice.reducer;
