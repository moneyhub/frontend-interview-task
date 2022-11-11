/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import { Inset } from "./style";
import { PropertyDetailSection } from './property-detail-section';
import { PropertyDetailInfoTag } from './property-detail-info-tag';
import { AccountValuationHelper } from '../../helpers/account-valuation-helper';
import { formatToPounds } from '../../helpers/currency-helper';

const account = {
  uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
  deleted: false,
  dateCreated: "2020-12-03T08:55:33.421Z",
  currency: "GBP",
  name: "15 Temple Way",
  bankName: "Residential",
  type: "properties",
  subType: "residential",
  originalPurchasePrice: 250000,
  originalPurchasePriceDate: "2017-09-03",
  recentValuation: { amount: 310000, status: "good" },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-01T08:55:33.421Z",
  updateAfterDays: 30,
};

const Detail = ({}) => {
  let mortgage;
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }
  const lastUpdate = new Date(account.lastUpdate);
  const accountValuation = new AccountValuationHelper(account);

  return (
    <Inset>
      <PropertyDetailSection
        label="Estimated Value"
        headline={formatToPounds(account.recentValuation.amount)}
        listItems={[
          `Last updated ${format(lastUpdate, "do MMM yyyy")}`,
          `Next update ${format(
            add(lastUpdate, { days: account.updateAfterDays }),
            "do MMM yyyy"
          )}`
        ]}
      />
      <PropertyDetailSection
        label="Property details"
        listItems={[
          account.name,
          account.bankName,
          account.postcode
        ]}
      />
      <PropertyDetailSection
        label="Valuation changes"
        listItems={[
          <>
            {"Purchased for "}
            <b>{formatToPounds(account.originalPurchasePrice)}</b>
            {" in "}
            {format(new Date(account.originalPurchasePriceDate), "MMMM yyyy")}
          </>,
          <PropertyDetailInfoTag
            label="Since purchase"
            value={accountValuation.formattedValuationDifference()}
          />,
          <PropertyDetailInfoTag
            label="Annual appreciation"
            value={accountValuation.formattedAnnualAppreciation()}
          />
        ]}
      />
      {
        mortgage && (
          <PropertyDetailSection
            label="Mortgage"
            onClick={() => alert("You have navigated to the mortgage page")}
            listItems={[
              formatToPounds(account.associatedMortgages[0].currentBalance),
              account.associatedMortgages[0].name
            ]}
          />
        )
      }
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default Detail;
