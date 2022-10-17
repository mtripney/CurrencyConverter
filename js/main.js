import { requestOptions } from './headers';

const form = document.querySelector('.main-form');
const fromAmount = document.querySelector('[name="from-amount"]');
const fromSelect = document.querySelector('[name="from-currency"]');
const toSelect = document.querySelector('[name="to-currency"]');
const toAmount = document.querySelector('.to-amount');
const ratesByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BRL: 'Brazilian Real',
  GBP: 'British Pound Sterling',
  BGN: 'Bulgarian Lev',
  CAD: 'Canadian Dollar',
  CNY: 'Chinese Yuan',
  HRK: 'Croatian Kuna',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  INR: 'Indian Rupee',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  JPY: 'Japanese Yen',
  MYR: 'Malaysian Ringgit',
  MXN: 'Mexican Peso',
  NZD: 'New Zealand Dollar',
  NOK: 'Norwegian Krone',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SGD: 'Singapore Dollar',
  ZAR: 'South African Rand',
  KRW: 'South Korean Won',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
};

const fetchRates = async (from) => {
  const res = await fetch(
    `https://api.apilayer.com/exchangerates_data/latest?base=${from}`,
    requestOptions
  );
  const rates = await res.json();
  return rates;
};

const convertRates = async (amount, from, to) => {
  if (!ratesByBase[from]) {
    // If the 'from' currency hssn't already been queried, fetch it...
    const rates = await fetchRates(from);
    // ... and store it for future use.
    ratesByBase[from] = rates;
  }
  return ratesByBase[from].rates[to] * amount;
};

const generateOptions = (options) =>
  Object.entries(options)
    .map(
      ([code, name]) =>
        `<option value="${code}">${code} - ${name}</option>`
    )
    .join('');

const optionsHTML = generateOptions(currencies);

// Populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

const formatFinalAmount = (amount, currency) => {
  return Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
};

const handleInput = async (e) => {
  const rawAmount = await convertRates(
    fromAmount.value,
    fromSelect.value,
    toSelect.value
  );
  toAmount.textContent = formatFinalAmount(rawAmount, toSelect.value);
};

// Listen for form inputs
form.addEventListener('input', handleInput);
