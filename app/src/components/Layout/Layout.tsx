import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import { Link } from "react-router-dom";
const Container = styled.div({
  display: "flex",
  backgroundColor: "white",
  position: "relative",
  minHeight: "100vh",
  width: "100%",
});

const Aside = styled.div<{ open: boolean }>(({ open }) => ({
  display: open ? "flex" : "none",
  overflow: "hidden",
  height: "100vh",
  top: 0,
  position: "sticky",
  flexDirection: "column",
  background:
    "linear-gradient(90deg, rgba(125,211,252,1) 0%, rgba(186,230,253,1) 100%)",
  width: "250px",
  borderRight: "1px solid #e5e5e5",

  "& > header": {
    background: "inherit",
  },
}));

const Header = styled.header({
  position: "sticky",
  backgroundColor: "#fafafa",
  display: "flex",
  alignItems: "center",
  top: 0,
  padding: "0 16px",
  height: "64px",
  borderBottom: "1px solid #e5e5e5",
});

const ContainerDiv = styled.div({
  display: "flex",
  background: "#fafafa",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",
});

const Main = styled.main({
  padding: "16px",
  minHeight: "calc(100vh - 128px)",
});

const Footer = styled.footer({
  display: "flex",
  padding: "16px",
  height: "64px",
  borderTop: "1px solid black",
});

const MenuLinks = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledLink = styled.li({
  padding: "8px 16px",
  cursor: "pointer",
  margin: "4px 4px",
  transition: "background 0.3s",
  "& > a": {
    color: "black",
    textDecoration: "none",
  },
  "&:hover": {
    borderRadius: "4px",
    backgroundColor: "white",
    "& > a": {
      color: "#0ea5e9",
    },
  },
});

const LINKS = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Документы",
    path: "/userdocs",
  },
  {
    title: "Выйти",
    path: "",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [asideOpen, setAsideOpen] = useState<boolean>(true);

  const toggleAside = () => {
    setAsideOpen((prev) => !prev);
  };

  const OpenIcon = asideOpen ? MenuOpenSharpIcon : MenuIcon;
  return (
    <Container>
      <Aside open={asideOpen}>
        <Header>Logo</Header>
        <MenuLinks>
          {LINKS.map((link) => (
            <StyledLink key={link.path}>
              <Link to={link.path}>{link.title}</Link>
            </StyledLink>
          ))}
        </MenuLinks>
      </Aside>
      <ContainerDiv>
        <Header>
          <IconButton onClick={toggleAside}>
            <OpenIcon />
          </IconButton>
        </Header>
        <Main>{children}</Main>
        <Footer>Автор: Timur </Footer>
      </ContainerDiv>
    </Container>
  );
};

export default Layout;
