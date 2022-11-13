/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React, {useEffect, useState} from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset, SectionWrapper
} from "./style";
import axios from 'axios';
import PropTypes from 'prop-types'; // ES6

  //TO.DO: create a defs file
const MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];



const ValuationChangeSection = (account)=> {
  //TO.DO: Not sure about the calculations. the business logic is not quite clear. might need changes
  //TO.DO: Might move bellow computations in utils files or helpers
  //TO.DO: It feels like the jsx tree/code is to verbose the components can be simplified and can we can reduce the code duplication by creating some section components like <PropertyDetails /> <ValuationChange/> and <Mortgage/>
  //TO.DO: Instead of using the AccountList and AccountListItem I would create something more general and not business related components like only a Layout and a LayoutItem component and based on that create multy dimentional matrix layout
  //TO.DO  For more minimized layout you could grop the data in structures like array and loop over them to minimize the code in the jsx. it would require to many changes now for this component since you have that price bolded, and i developed the code in the weekend. sorry, I don't have so much time now
  //TO.DO  Use some useEffects and create loaders idk and load data only call is done, maybe use https://www.npmjs.com/package/react-loading-skeleton or similar packages.
  //etc...
  const yearsSincePurchase = new Date().getFullYear() - new Date(account.originalPurchasePriceDate).getFullYear();
  const sincePurchase = account.recentValuation.amount - account.originalPurchasePrice;
  const sincePurchasePercentage = (sincePurchase / account.originalPurchasePrice) * 100;
  const annualAppreciationInfo =  `${sincePurchasePercentage / yearsSincePurchase}%`

  const originalPriceValue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3
  }).format(
    Math.abs(account.originalPurchasePrice)
  )

  const sincePurchaseValue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3
  }).format(
    Math.abs(sincePurchase)
  )

  const sincePurchaseInfo = `${sincePurchaseValue} (${sincePurchasePercentage}%)`;
  return (
    <>
      <AccountSection>
        <AccountLabel>Valuation change</AccountLabel>
        <SectionWrapper>
          <AccountList>
            <AccountListItem>
              <InfoText>{`Purchased for`}&nbsp;</InfoText>
              <InfoText><strong>{originalPriceValue}</strong></InfoText>
              <InfoText>&nbsp;{`in ${MONTH_NAMES[new Date(account.originalPurchasePriceDate).getMonth()-1]} ${new Date(account.originalPurchasePriceDate).getFullYear()}`}</InfoText>
            </AccountListItem>
            <AccountListItem><InfoText>Since Purchase</InfoText></AccountListItem>
            <AccountListItem><InfoText>Annual Appreciation</InfoText></AccountListItem>
          </AccountList>
          <div>
            <AccountList>
              <AccountListItem skipRow goRight><InfoText isBadge>{sincePurchaseInfo}</InfoText></AccountListItem>
              <AccountListItem goRight><InfoText isBadge>{annualAppreciationInfo}</InfoText></AccountListItem>
            </AccountList>
          </div>
        </SectionWrapper>
      </AccountSection>
    </>
    )
}


const Detail = ({}) => {

  const [account, setAccount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3333/api/account').then((response) => {
      setAccount(response.data.account);
    });
  }, []);

  let mortgage;
  const lastUpdate = new Date(account?.lastUpdate);
  if (account?.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }
  return (
    <Inset>
      {account ? (
        <>
          <AccountSection>
            <AccountLabel>Estimated Value</AccountLabel>
            <AccountHeadline>
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(account.recentValuation.amount)}
            </AccountHeadline>
            <AccountList>
              <AccountListItem><InfoText>
                {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>
                {`Next update ${format(
                  add(lastUpdate, { days: account.updateAfterDays }),
                  "do MMM yyyy"
                )}`}
              </InfoText></AccountListItem>
            </AccountList>
          </AccountSection>
          <AccountSection>
            <AccountLabel>Property details</AccountLabel>
            <RowContainer>
              <AccountList>
                <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
              </AccountList>
            </RowContainer>
          </AccountSection>
          {account && <ValuationChangeSection
            originalPurchasePrice={account.originalPurchasePrice}
            originalPurchasePriceDate={account.originalPurchasePriceDate}
            recentValuation={account.recentValuation}
          />}
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
                      Math.abs(account.associatedMortgages[0].currentBalance)
                    )}
                  </InfoText></AccountListItem>
                  <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
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
        </>
      ) : (<InfoText>loading...</InfoText>)}

    </Inset>
  );
};
ValuationChangeSection.propTypes = {
  originalPurchasePrice: PropTypes.number,
  originalPurchasePriceDate: PropTypes.string,
  recentValuation: PropTypes.object,
};

export default Detail;
