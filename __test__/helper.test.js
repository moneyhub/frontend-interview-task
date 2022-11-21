import {formatPurchaseDate, purchaseMonth , getSincePurchase, getSincePurchasePercentage} from '../modules/property-details/helpers';

test('Returns year for date', () => {
    expect(formatPurchaseDate('2017-09-03')).toBe(2017);
  });

test('Returns month for date', () => {
    expect(purchaseMonth('2017-09-03')).toBe('September');
});

test('returns Since purchase price change percentage ', () => {
    expect(getSincePurchasePercentage(310000,250000)).toBe(24);
});

test('returns Since purchase price change', () => {
    expect(getSincePurchase(310000,250000)).toBe(60000);
});





