const toCurrency = (number: number, maxDigits = 3) => {
  if (!number) {
    return;
  }

  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: maxDigits,
  });
};

export default toCurrency;
