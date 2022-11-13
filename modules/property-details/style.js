import styled, { css } from "styled-components";

export const SectionWrapper = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:space-between; 
`

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

const BADGE_COLOR = '#006b57';
const BG_BADGE_COLOR = '#c2f7e1';

export const InfoText = styled.div`
  line-height: 1.6;
  color: ${(props) => props.theme.colors.neutral[600]};
  font-size: ${(props) => props.theme.typography.m.fontSize};
  ${({ isBadge }) =>
  isBadge &&
  css`
  padding: 0px 20px 0px 20px;
  color: ${BADGE_COLOR};
  background: ${BG_BADGE_COLOR};
  border-radius: 20px;
    `}
`;

export const AccountSection = styled.div`
  padding: ${(props) => props.theme.space.m} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
  }
}
`;

export const AccountListItem = styled.div`
${({ skipRow }) =>
  skipRow &&
  css`
  margin-top: 60px;
    `}
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.space.m};
  }
   justify-content: ${({goRight}) => goRight ? 'flex-end': ''};
`;

export const Inset = styled.div`
  padding: 0 ${(props) => props.theme.space.m};
`;
