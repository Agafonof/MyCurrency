export type CurrencyType = {
  [key: string]: string;
};

export type CurrencySliceType = {
  baseCurrency: string;
  baseCurrencyList: BaseCurrencyListType;
  baseCurrencyListFilter: string;
  choisenCurrency1: ChoisenCurrencyType;
  choisenCurrency2: ChoisenCurrencyType;
  convertedValues: ConvertedValuesType;
  allCurrencyList: CurrencyType;
};

export type ChoisenCurrencyType = {
  name: string;
  number: string;
};

export type ConvertedValuesType = {
  [key: string]: number | string;
};

export type BaseCurrencyListType = {
  [key: string]: CurrencyType | string;
};

export type InputFormType = {
  title: string;
};

export type APIResponseList = {
  data: CurrencyType;
};

export type APIResponseBaseType = {
  [key: string]: CurrencyType | string;
};

export type APIResponseConvertedType = {
  [key: string]: number | string;
};
