import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../features/redux/hooks';
import { setBaseCurrencyListFilter } from '../features/redux/slices/currencySlice';
import { loadConvertForBaseCurrencyThunk } from '../features/redux/slices/thunkCurrency';
import OneCurrency from '../UI/OneCurrency';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const { baseCurrencyListFilter } = useAppSelector((state) => state.currency);
  const { baseCurrencyList } = useAppSelector((state) => state.currency);

  useEffect(() => {
    dispatch(loadConvertForBaseCurrencyThunk(baseCurrency));
  }, [baseCurrency]);

  useEffect(() => {
    setInterval(() => {
      console.log('currency updated');
      // обновление курса валют раз в минуту:
      // dispatch(loadConvertForBaseCurrencyThunk(baseCurrency));
    }, 60000);
  }, []);

  return (
    <Container>
      <select
        onChange={(event) => dispatch(setBaseCurrencyListFilter(event.target.value))}
        className="form-select"
        aria-label="Default select example"
        value={baseCurrencyListFilter}
      >
        <option value="All">Все валюты</option>
        {baseCurrencyList[baseCurrency] &&
          Object.entries(baseCurrencyList[baseCurrency])?.map((currency) => (
            <option key={uuidv4()} value={currency[0]}>
              {currency[0].toUpperCase()}
            </option>
          ))}
      </select>

      <Row>
        {baseCurrencyList[baseCurrency] &&
          baseCurrencyListFilter === 'All' &&
          Object.entries(baseCurrencyList[baseCurrency]).map((currency) => (
            <Col sm={4} key={uuidv4()}>
              <OneCurrency currency={currency} stateCurrency={baseCurrency} />
            </Col>
          ))}

        {baseCurrencyList[baseCurrency] &&
          baseCurrencyListFilter !== 'All' &&
          Object.entries(baseCurrencyList[baseCurrency])
            .filter((currency) => currency[0] === baseCurrencyListFilter)
            .map((currency) => (
              <Col sm={4} key={uuidv4()}>
                <OneCurrency currency={currency} stateCurrency={baseCurrency} />
              </Col>
            ))}
      </Row>
    </Container>
  );
}
