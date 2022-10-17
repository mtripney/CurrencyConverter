const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');

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

const generateOptions = (options) =>
  Object.entries(options)
    .map(([code, name]) => `<option value="${code}">${name}</option>`)
    .join('');

const optionsHTML = generateOptions(currencies);

// Populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;
