import Header from "./Header/Header";
import css from "./AppWrapper.module.css";
import Footer from "./Footer/Footer";
import { useRouter } from "next/router";
import { ThemeProvider } from "react-bootstrap";
import { NavigationContextProvider } from "../../../store/navigation-context";

function Layout(props) {
  const router = useRouter();
  return (
    // <ThemeProvider breakpoints={["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}>
    <NavigationContextProvider>
      <Header className={`${css.general} general`} />
      <main className={css.main}>{props.children}</main>
      <Footer className={`${css.general} general`} />
    </NavigationContextProvider>
    // </ThemeProvider>
  );
}

export default Layout;
