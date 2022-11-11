export function AccountValuationHelper(account) {
  const getValuationDifference = () => {
    return account.recentValuation.amount - account.originalPurchasePrice
  }

  const getValuationDifferencePercentage = () => {
    return getValuationDifference() / account.originalPurchasePrice * 100
  }

  const formattedValuationDifference = () => {
    const priceValuation = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(
        getValuationDifference()
      )

    return `${priceValuation} (${getValuationDifferencePercentage()}%)`
  }

  const getAnnualAppreciation = () => {
    const yearsSincePurchase = new Date().getFullYear() - new Date(account.originalPurchasePriceDate).getFullYear()
    return getValuationDifferencePercentage() / yearsSincePurchase
  }

  const formattedAnnualAppreciation = () => {
    return `${getAnnualAppreciation()}%`
  }

  return {
    getValuationDifference,
    getValuationDifferencePercentage,
    getAnnualAppreciation,
    formattedValuationDifference,
    formattedAnnualAppreciation
  }
}
