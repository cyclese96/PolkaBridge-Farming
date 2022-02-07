export const formatCurrency = (value, precision = 1) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision,
  })

  //for currency format with $Symbol
  if (!value) {
    return formatter.format(0).slice(1)
  }
  return convertToInternationalCurrencySystem(value, formatter)
}

function convertToInternationalCurrencySystem(labelValue, formatter) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2))
        .slice(1) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2))
        .slice(1) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2))
        .slice(1) + 'K'
    : formatter.format(Math.abs(Number(labelValue))).slice(1)
}

export const isMetaMaskInstalled = () => {
  return typeof window.web3 !== 'undefined'
}
