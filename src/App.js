import { useState } from "react";
import './App.css';
import { mockedResponse } from './dataArrey.js'

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState({});

    const getRates = () => delay(2000)
        .then(() => Promise.resolve(mockedResponse))
        .then((data) => setServerResponse(data));

    const handleButtonClick = () => {
        setLoading(true);
        getRates().then(() => {
            setLoading(false)
        })
    };

    const ratesList = serverResponse.rates && Object.entries(serverResponse.rates);

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div className="App">
            <button className="button" onClick={handleButtonClick}>Click Here</button>
          <div className="currency-section">
            {ratesList?.length && ratesList.map(([currency, amount]) => (
                <div className="currency-row" key={currency}>
                    <div>{currency}</div>
                    <div>{amount}</div>
                </div>
            ))}
          </div>
            <h2>Finish</h2>
        </div>
    );
}

