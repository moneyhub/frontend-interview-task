import styled, {ThemeProvider} from "styled-components"

import {theme} from "../theme"
import "../styles/reset.css"
import "../styles/globals.css"

const Body = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  height: 100vh;
`
const NavBar = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  height: 58px;
  margin-top: auto;
  box-shadow: 0 -4px 4px ${(props) => props.theme.colors.neutral[200]};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`
const Sidebar = styled.div`
  background-color: ${(props) => props.theme.colors.neutral[900]};
  width: 25%;
  display: none;
`
const Page = styled.div`
  box-shadow: 0 -4px 4px ${(props) => props.theme.colors.neutral[200]};
  position: relative;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width:  ${(props) => props.theme.breakpoints.l}px) {
    flex-direction: row;

    ${Sidebar} {
      display: block;
    }

    ${NavBar} {
      display: none;
    }
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 100px;
  overflow-y: auto;
`

function App({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <Body>
      <Page>
        <Sidebar />
        <Content>
        <Component {...pageProps} />
        </Content>
        <NavBar />
      </Page>
    </Body>
    </ThemeProvider>
  )
}

export default App
