import styled, { css } from "styled-components";

export const AccountList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const AccountLabel = styled.div`
  font-size: ${(props) => props.theme.typography.xl.fontSize};
  line-height: ${(props) => props.theme.typography.xl.lineHeight};
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.s};
`;

export const AccountHeadline = styled.h2`
  font-size: ${(props) => props.theme.typography["3xl"].fontSize};
  line-height: ${(props) => props.theme.typography["3xl"].lineHeight};
  font-weight: normal;
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.m};
`;

export const InfoText = styled.div`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  color: ${(props) => props.theme.colors.neutral[600]};
`;

export const AccountSection = styled.div`
  padding: ${(props) => props.theme.space.m} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
  }
}
`;

export const AccountValuationItem = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: 16px;
`;

export const AccountValuationList = styled.div`
  width: 50%;
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  color: ${(props) => props.theme.colors.neutral[600]};
  margin-bottom: ${(props) => props.theme.space.m};
  text-align: left;
`;

export const AccountListItem = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.space.m};
  }
`;

export const Inset = styled.div`
  padding: 0 ${(props) => props.theme.space.m};
`;

export const InfoTextCurrency = styled.span`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  font-weight: bold;
  margin: 0 2px;
  color: ${(props) => props.theme.colors.neutral[900]};
`;


export const InfoRectangularBox = styled.div`
  border-radius: 20px;
  background: ${(props) => props.theme.colors.green[100]};
  color: ${(props) => props.theme.colors.green[500]};
  font-weight: bold;
  text-align: center;
  padding: 12px 10px;
  width: 200px;
`;