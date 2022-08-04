import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import FoodContext from "../../store/food-context";
import {
  SAVE_LAST_PAGE,
  GET_LAST_PAGE,
  UPDATE_LAST_PAGE,
} from "../../store/AUTHCONTEXT/EDIT_LOCAL_STORAGE";
import LoginPage from "../../oComponents/LoginPage/LoginPage";

const AuthGuard = (props) => {
  let timer;
  const [count, setCount] = useState(0);
  const foodCtx = useContext(FoodContext);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const loggingIn = authCtx.loggingIn;

  const lastMeal = authCtx.lastMeal;
  const currentPage = authCtx.saveLastSite;

  const loggedIn = authCtx.isLoggedIn;

  const goToLastPage = () => {
    router.push(GET_LAST_PAGE());
  };

  // const resetTimer = () => {
  //   clearTimeout(timer);
  //   setTimer(() => {});
  // };
  // let timer;

  useEffect(() => {
    console.log("LOGGED IN: ", loggedIn);
    if (loggingIn) {
      console.log(loggingIn);
    } else {
      const pageData = currentPage();
      console.log("PAGE DATA: ", pageData);
      const query = pageData.path.query;
      const lastPage = GET_LAST_PAGE();

      if (lastPage) {
        if (pageData.path.path !== "/login") {
          UPDATE_LAST_PAGE(router.asPath);
        }
      } else {
        if (pageData.path.path !== "/login") {
          SAVE_LAST_PAGE(router.asPath);
        }
      }

      if (pageData.subPath) {
        if (foodCtx.currentMeal && !foodCtx.currentMeal.dish) {
        } else {
          lastMeal.save({ meal: query.meal, dish: props.currentMeal });
        }
      }

      if (count === 3) {
        router.push("/login");
      }

      if (!authCtx.isLoggedIn) {
        timer = setTimeout(() => {
          setCount((prev) => prev + 1);
        }, 10);
      }
      if (authCtx.isLoggedIn) {
        setCount(0);
        return () => {
          clearTimeout(timer), props.children;
        };
      }
    }
  }, [authCtx.isLoggedIn, count]);

  if (authCtx.isLoggedIn) {
    return props.children;
  } else {
    return <h1>...</h1>;
  }
};
export default AuthGuard;
