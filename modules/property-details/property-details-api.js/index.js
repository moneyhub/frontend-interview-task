/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../../components/button";
import RowContainer from "../../../components/row-container";
import { formatPurchaseDate, getSinceInception, getSincePurchase, getSincePurchasePercentage, purchaseMonth } from "../helpers";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, AccountValuationItem, AccountValuationList, AccountValuationListInfo, InfoRectangularBox, InfoText, InfoTextCurrency, Inset
} from "../style";
import {useQuery} from 'react-query';

const DetailFromAPI = ({}) => {

	const getAccountData = async () => {
		const res = await fetch('/api/account');
		return res.json();
	};
	// Using the hook
	const {data, error, isLoading} = useQuery('accountData', getAccountData);
	if (error) return <div>Request Failed</div>;
	if (isLoading) return <div>Loading...</div>;
	console.log(data.accountData, 'data');

  let mortgage;
  const lastUpdate = new Date(data.account.lastUpdate);
  if (data.account.associatedMortgages.length) {
    mortgage = data.account.associatedMortgages[0];
  }

  return (
    <Inset>
      <AccountSection>
        <AccountLabel>Estimated Value</AccountLabel>
        <AccountHeadline>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(data.account.recentValuation.amount)}
        </AccountHeadline>
        <AccountList>
          <AccountListItem><InfoText>
            {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
          </InfoText></AccountListItem>
          <AccountListItem><InfoText>
            {`Next update ${format(
              add(lastUpdate, { days: data.account.updateAfterDays }),
              "do MMM yyyy"
            )}`}
          </InfoText></AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>{data.account.name}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{data.account.bankName}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{data.account.postcode}</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Valuation Changes</AccountLabel>
          <AccountList>
            <InfoText> 
                Purchased for
                <InfoTextCurrency>
                  {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  minimumFractionDigits: 0,
                }).format(data.account.originalPurchasePrice)}
              </InfoTextCurrency>   
              <span> in { purchaseMonth(data.account.originalPurchasePriceDate)} {`\t`}
                {formatPurchaseDate(data.account.originalPurchasePriceDate)}
              </span>
            </InfoText>
            <AccountValuationItem>
              <AccountValuationList>
                Since Purchase
              </AccountValuationList>
              <AccountValuationListInfo>
                <InfoRectangularBox>
                  {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  minimumFractionDigits: 0,
                }).format(getSincePurchase(data.account.recentValuation.amount, data.account.originalPurchasePrice))+
                '('+ getSincePurchasePercentage(data.account.recentValuation.amount, data.account.originalPurchasePrice)+ '%)'} 
                </InfoRectangularBox>
              </AccountValuationListInfo>
              <AccountValuationList>
                Annual Appreciation
              </AccountValuationList>
              <AccountValuationListInfo>
                <InfoRectangularBox> 
                  {getSincePurchasePercentage(data.account.recentValuation.amount, data.account.originalPurchasePrice)/getSinceInception(data.account.originalPurchasePriceDate)}% 
                </InfoRectangularBox>
              </AccountValuationListInfo>
            </AccountValuationItem>
        </AccountList>
      </AccountSection>
      {mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem><InfoText>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(data.account.associatedMortgages[0].currentBalance)
                )}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{data.account.associatedMortgages[0].name}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )}
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default DetailFromAPI;
