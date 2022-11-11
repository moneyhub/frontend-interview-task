/* eslint-disable max-statements */
import React from "react";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText
} from "./style";
import PropTypes from "prop-types";

export const PropertyDetailSection = ({ label, headline, onClick, listItems = [] }) => {
  return (
    <AccountSection>
      {
        label && <AccountLabel>{label}</AccountLabel>
      }
      {
        headline && <AccountHeadline>{headline}</AccountHeadline>
      }
      <RowContainer onClick={onClick}>
        <AccountList>
          {listItems.map((item, idx) => {
            return (
              <AccountListItem key={idx}><InfoText>{item}</InfoText></AccountListItem>
            )
          })}
        </AccountList>
      </RowContainer>
    </AccountSection>
  )
}

PropertyDetailSection.propTypes = {
  label: PropTypes.string,
  listItems: PropTypes.array,
  onClick: PropTypes.func,
  headline: PropTypes.string
}
