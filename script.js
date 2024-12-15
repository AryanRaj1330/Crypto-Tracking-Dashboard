'use strict';

class Freecurrencyapi {
    baseUrl = 'https://api.freecurrencyapi.com/v1/';

    constructor(apiKey = '') {
        this.headers = {
            apikey: apiKey
        };
    }

    async call(endpoint, params = {}) {
        const paramString = new URLSearchParams(params).toString();
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}?${paramString}`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    latest(params) {
        return this.call('latest', params);
    }
}

// Initialize the Freecurrencyapi class with your API key
const apiKey = 'fca_live_ybX58T5qHc65LWKOzx2frs99Mrt5TAF1MbbvaLg3';
const freeCurrencyApi = new Freecurrencyapi(apiKey);

async function fetchCurrencyData() {
    const currencies = ["USD", "EUR", "GBP", "INR", "JPY"]; // Add your desired currencies
    const baseCurrency = "USD";

    for (let currency of currencies) {
        try {
            // Fetch the latest conversion rate
            const data = await freeCurrencyApi.latest({ base_currency: baseCurrency, currencies: currency });

            // Update the DOM with the fetched data
            const rate = data.data[currency];
            if (!rate) throw new Error(`No rate found for ${currency}`);

            let currencyRate = document.getElementById(currency);
            currencyRate.textContent = `${baseCurrency} to ${currency}: ${rate.toFixed(2)}`;
        } catch (error) {
            console.error(`Error fetching data for ${currency}:`, error);

            let currencyRate = document.getElementById(currency);
            currencyRate.textContent = "Error fetching data";
        }
    }
}

// Call the function to fetch and display the data
fetchCurrencyData();
