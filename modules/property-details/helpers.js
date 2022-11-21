export const formatPurchaseDate = (date) => {
  let dateObj = new Date(date);
  return dateObj.getFullYear();
}

export const purchaseMonth = (date) => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dateObj = new Date(date);
    return month[dateObj.getMonth()];
}

export const getSincePurchase =(recentValuation , originalPurchasePrice) => {
   return recentValuation - originalPurchasePrice;
}

export const getSincePurchasePercentage = (recentValuation, originalPurchasePrice) => {
  return parseFloat(getSincePurchase(recentValuation,originalPurchasePrice)/originalPurchasePrice) * 100; 
}

export const getSinceInception=(originalPurchasePriceDate) => {
  const diffDate = Date.now() - new Date(originalPurchasePriceDate).getTime();;
  const  difference = new Date(diffDate); 
  return Math.abs(difference.getUTCFullYear() - 1970);
}