'use strict';

let array=["USD","INR"]

class Freecurrencyapi {
    baseUrl = 'https://api.freecurrencyapi.com/v1/';

    constructor(apiKey = '') {
        this.headers = {
            apikey: apiKey
        };
    }

    call(endpoint, params = {}) {
        const paramString = new URLSearchParams({
            ...params
        }).toString();

        return fetch(`${this.baseUrl}${endpoint}?${paramString}`, { headers: this.headers })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    status() {
        return this.call('status');
    }

    currencies(params) {
        return this.call('currencies', params);
    }

    latest(params) {
        return this.call('latest', params);
    }

    historical(params) {
        return this.call('historical', params);
    }
}

// Initialize the Freecurrencyapi class with your API key
const apiKey = 'fca_live_ybX58T5qHc65LWKOzx2frs99Mrt5TAF1MbbvaLg3';
const freeCurrencyApi = new Freecurrencyapi(apiKey);

// Fetch the conversion rate from USD to INR
freeCurrencyApi.latest({ base_currency: 'USD', currencies: 'INR' })
    .then(data => {
        const conversionRate = data.data.INR;
        console.log(`Conversion Rate (USD to INR): ${conversionRate}`);
    })
    .catch(error => {
        console.error('Failed to fetch conversion rate:', error);
    });
