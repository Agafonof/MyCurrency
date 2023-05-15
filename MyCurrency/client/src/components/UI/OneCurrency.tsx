import React from "react";
import Card from "react-bootstrap/Card";

type OneCurrencyProps = {
  currency: [string, string];
  stateCurrency: string;
};

function OneCurrency({
  currency,
  stateCurrency,
}: OneCurrencyProps): JSX.Element {
  return (
    <Card bg="secondary" border="black" className="mt-2">
      <Card.Body>
        <Card.Title style={{color: 'white'}}>
          {" "}
          1 {currency[0].toUpperCase()} = {(1 / +currency[1]).toFixed(2)}{" "}
          {stateCurrency.toUpperCase()}{" "}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default React.memo(OneCurrency);
