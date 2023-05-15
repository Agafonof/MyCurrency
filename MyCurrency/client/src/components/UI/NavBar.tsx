import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../features/redux/hooks';
import { setBaseCurrency, setBaseCurrencyListFilter } from '../features/redux/slices/currencySlice';
import { loadCurrencyListThunk } from '../features/redux/slices/thunkCurrency';

export default function NavBar(): JSX.Element {
  const [clicked, setClicked] = useState<boolean>(false);
  const { baseCurrency } = useAppSelector((state) => state.currency);
  const { allCurrencyList } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrencyListThunk());
  }, []);

  return (
    <Navbar bg="success " variant="dark" className="mb-3" style={{ height: 100, fontSize: 24 }}>
      <Container>
        <Navbar.Brand style={{ fontSize: 28 }}>Курс валют</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink tag={Link} to="/">
            Главная
          </NavLink>
          <NavLink tag={Link} to="/converter">
            Конвертация
          </NavLink>
        </Nav>
      </Container>
      <Container style={{ justifyContent: 'end', marginRight: 10 }}>
        <div>Базовая валюта</div>
        {!clicked ? (
          <Button style={{ marginLeft: 5 }} type="button" variant="light" onClick={() => setClicked(!clicked)}>
            {baseCurrency.toUpperCase()}
          </Button>
        ) : (
          <select
            onChange={(event) => {
              dispatch(setBaseCurrencyListFilter('All'));
              dispatch(setBaseCurrency(event.target.value));
              setClicked(!clicked);
            }}
            className="form-select"
            aria-label="Default select example"
            value={baseCurrency}
          >
            <option value={baseCurrency}>{baseCurrency.toUpperCase()}</option>
            {allCurrencyList &&
              Object.entries(allCurrencyList)
                ?.sort()
                .map((currency) => (
                  <option key={uuidv4()} value={currency[0]}>
                    {currency[1] ? currency[1].toUpperCase() : currency[0].toUpperCase()}
                  </option>
                ))}
          </select>
        )}
      </Container>
    </Navbar>
  );
}
