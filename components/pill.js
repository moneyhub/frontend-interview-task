import styled from "styled-components";

export const Pill = styled.div`
  background-color: ${(props) => props.theme.colors.success.default};
  color: ${(props) => props.theme.colors.success[700]};
  border-radius: ${(props) => props.theme.space.l};
  font-size: ${(props) => props.theme.typography.m.fontSize};
  font-weight: bold;
  padding: ${(props) => props.theme.space.xs} ${(props) => props.theme.space.l};
  border: none;
  text-align: center;
`;
