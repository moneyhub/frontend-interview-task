import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Pill } from "../../components/pill";

const TagLabel = styled.div`
  width: 60%;
`

const TagPill = styled(Pill)`
  width: 40%;
`

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width:  ${(props) => props.theme.breakpoints.m}px) {
    ${TagLabel} {
      width: auto;
    }
    ${TagPill} {
      width: auto;
    }
  }
`;


export const PropertyDetailInfoTag = ({ label, value }) => (
  <TagContainer>
    <TagLabel>{label}</TagLabel>
    <TagPill>{value}</TagPill>
  </TagContainer>
)

PropertyDetailInfoTag.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
