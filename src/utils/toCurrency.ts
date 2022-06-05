const toCurrency = (number: number | null, maxDigits = 3): string | undefined => {
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
