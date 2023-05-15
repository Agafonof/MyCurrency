import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SwapHorizontalCircleTwoTone } from '@mui/icons-material';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../features/redux/hooks';
import { setChoisenCurrency } from '../features/redux/slices/currencySlice';
import { loadConvertChoisenCurrencyThunk } from '../features/redux/slices/thunkCurrency';

export default function ConverterPage(): JSX.Element {
  const { allCurrencyList, choisenCurrency1, choisenCurrency2, convertedValues } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const currencyValue = `${Object.values(convertedValues)[1]} ${choisenCurrency2.name.toUpperCase()}`;

  const sortedCurrencyList = Object.entries(allCurrencyList)?.sort();

  const [tip, setTip] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const choisenName1 = sortedCurrencyList.find((el, index) => index === +formData.number1 - 1);
    const choisenName2 = sortedCurrencyList.find((el, index) => index === +formData.number2 - 1);

    if (choisenName1 && choisenName2) {
      setTip(false);
      dispatch(
        setChoisenCurrency([
          { number: formData.number1.toString(), name: choisenName1[0] },
          { number: formData.number2.toString(), name: choisenName2[0] },
        ])
      );
      dispatch(loadConvertChoisenCurrencyThunk([choisenCurrency1, choisenCurrency2]));
    } else {
      setTip(true);
    }
  };

  const fastChange = (): void => {
    dispatch(
      setChoisenCurrency([
        { number: choisenCurrency2.number, name: choisenCurrency2.name },
        { number: choisenCurrency1.number, name: choisenCurrency1.name },
      ])
    );
    dispatch(loadConvertChoisenCurrencyThunk([choisenCurrency1, choisenCurrency2]));
  };

  return (
    <>
      <Container>
        <Card className="text-center">
          <Card.Header>Конвертация</Card.Header>
          <Card.Body style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Card.Title>1 {choisenCurrency1.name.toUpperCase()}</Card.Title>
            <button onClick={fastChange} type="button">
              <SwapHorizontalCircleTwoTone />
            </button>
            <Card.Title>{convertedValues.date ? currencyValue : '0 USD'}</Card.Title>
          </Card.Body>
          <Card.Footer className="text-muted">{convertedValues?.date}</Card.Footer>
        </Card>
      </Container>

      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form onSubmit={submitHandler} style={{ margin: 20 }}>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <span>Введите номера валют</span>
              </Col>
              <Col>
                <Form.Control name="number1" placeholder="199" />
              </Col>
              <Col>
                <Form.Control name="number2" placeholder="237" />
              </Col>
              <Col>
                <Button variant="success" type="submit">
                  Конвертировать
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>

      <Container style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        {tip && <div style={{ color: 'red' }}>Введите корректные номера валют (например: 199 , 237)</div>}
      </Container>

      <Container>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Аббривиатура</th>
            </tr>
          </thead>
          <tbody>
            {allCurrencyList &&
              sortedCurrencyList.map((currency, index) => (
                <tr key={uuidv4()}>
                  <td>{index + 1}</td>
                  <td>{currency[1] ? currency[1].toUpperCase() : currency[0].toUpperCase()}</td>
                  <td>{currency[0].toUpperCase()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
