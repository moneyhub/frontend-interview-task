// sincePurchase = `recentValuation - originalPurchasePrice`
// sincePurchasePercentage = `sincePurchase / originalPurchasePrice * 100`
// annualAppreciation =`sincePurchasePercentage / number of years since purchase`

export const formatPurchaseDate = (date) => {
  let dateObj = new Date(date);
  return dateObj.getFullYear();
}

export const purchaseMonth = (date) => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dateObj = new Date(date);
    return month[dateObj.getMonth()];
}