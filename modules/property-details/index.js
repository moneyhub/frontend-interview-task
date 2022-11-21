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

const FETCH_ACCOUNT_URL = 'http://localhost:3333/api/account';

const MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

const getYearsSincePurchase = (originalPurchasePriceDate) => {
  return new Date().getFullYear() - new Date(originalPurchasePriceDate).getFullYear();
};

const getSincePurchase = (recentValuation, originalPurchasePrice) => {
  return recentValuation.amount - originalPurchasePrice;
};

const getSincePurchasePercentage = (recentValuation, originalPurchasePrice) => {
  return (getSincePurchase(recentValuation, originalPurchasePrice) / originalPurchasePrice) * 100
};

const renderCustomAccountListItem = (originalPurchasePriceDate, originalPriceValue) => {
  return (<AccountList>
    <AccountListItem>
      <>
        <InfoText>{`Purchased for`}&nbsp;</InfoText>
        <InfoText><strong>{originalPriceValue}</strong></InfoText>
        <InfoText>&nbsp;{`in ${MONTH_NAMES[new Date(originalPurchasePriceDate).getMonth()-1]} ${new Date(originalPurchasePriceDate).getFullYear()}`}</InfoText>
      </>
    </AccountListItem>
    <AccountListItem><InfoText>Since Purchase</InfoText></AccountListItem>
    <AccountListItem><InfoText>Annual Appreciation</InfoText></AccountListItem>
  </AccountList>)
};

//this would be a more agnostic approach component in terms of business logic :)
const TitledList = ({labels, title, headLineInfo = null, handleClick = () => null}) => (
  <AccountSection>
    <AccountLabel>{title} </AccountLabel>
    {headLineInfo && <AccountHeadline>
      {headLineInfo}
    </AccountHeadline>}
    <RowContainer onClick={handleClick}>
      <AccountList>
        {labels.map((label, key) => <AccountListItem key={key}><InfoText>{label}</InfoText></AccountListItem>)}
      </AccountList>
    </RowContainer>
  </AccountSection>

);

const MortgageSection = ({currentBalance, name, handleClickMortgage}) => (
  <TitledList title='Mortgage' labels={[currentBalance, name]} handleClick={handleClickMortgage}/>
);

const ValuationChangeSection = (account)=> {
  const {recentValuation, originalPurchasePrice, originalPurchasePriceDate} = account;
  const yearsSincePurchase = getYearsSincePurchase(originalPurchasePriceDate);

  const sincePurchasePercentage = getSincePurchasePercentage(recentValuation, originalPurchasePrice);

  const originalPriceValue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3
  }).format(
    Math.abs(originalPurchasePrice)
  )

  const sincePurchaseValue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3
  }).format(
    Math.abs(getSincePurchase(recentValuation, originalPurchasePrice))
  )


  const sincePurchaseInfo = `${sincePurchaseValue} (${sincePurchasePercentage}%)`;
  return (
      <AccountSection>
        <AccountLabel>Valuation change</AccountLabel>
        <SectionWrapper>
          {renderCustomAccountListItem(originalPurchasePriceDate, originalPriceValue)}
          <div>
            <AccountList>
              <AccountListItem skipRow goRight><InfoText isBadge>{sincePurchaseInfo}</InfoText></AccountListItem>
              <AccountListItem goRight><InfoText isBadge>{`${sincePurchasePercentage / yearsSincePurchase}%`}</InfoText></AccountListItem>
            </AccountList>
          </div>
        </SectionWrapper>
      </AccountSection>
    )
}


const Detail = ({}) => {

  const [account, setAccount] = useState(null);

  useEffect(() => {
    axios.get(FETCH_ACCOUNT_URL).then((response) => {
      setAccount(response.data.account);
    });
  }, []);

  let lastUpdateRaw, currentBalance;
  let mortgages = [];
  if(account) {
    const { associatedMortgages, lastUpdate} = account;
    mortgages = associatedMortgages;
    lastUpdateRaw = new Date(lastUpdate);

    currentBalance = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(
      Math.abs(mortgages[0]?.currentBalance)
    );
  }


  return (
    <Inset>
      {account ? (
        <>
          <TitledList
            title={'Estimated Value'}
            labels={[`Last updated ${format(lastUpdateRaw, "do MMM yyyy")}`, `Next update ${format(
            add(lastUpdateRaw, { days: account.updateAfterDays }),
            "do MMM yyyy"
          )}`]}
            headLineInfo={new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(account.recentValuation.amount)} />

          <TitledList
            title={'Property details'}
            labels={[account.name, account.bankName, account.postcode]} />
          <ValuationChangeSection
            originalPurchasePrice={account.originalPurchasePrice}
            originalPurchasePriceDate={account.originalPurchasePriceDate}
            recentValuation={account.recentValuation}
          />
          {!!mortgages.length && (
            <MortgageSection handleClickMortgage={() => alert("You have navigated to the mortgage page")} currentBalance={currentBalance} name={mortgages[0].name}/>
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

renderCustomAccountListItem.propTypes = {
  originalPurchasePrice: PropTypes.number,
  originalPurchasePriceDate: PropTypes.string
};

TitledList.propTypes = {
  labels: PropTypes.array, // stirng[]
  title: PropTypes.string,
  headLineInfo: PropTypes.string,
  handleClick: PropTypes.func
};

export default Detail;
