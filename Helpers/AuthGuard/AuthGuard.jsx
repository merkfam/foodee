import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import FoodContext from "../../store/food-context";
import {
  SAVE_LAST_PAGE,
  GET_LAST_PAGE,
  UPDATE_LAST_PAGE,
} from "../../store/AUTHCONTEXT/EDIT_LOCAL_STORAGE";
import LoginPage from "../../oComponents/LoginPage/LoginPage";

const AuthGuard = (props) => {
  const foodCtx = useContext(FoodContext);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const lastMeal = authCtx.lastMeal;
  const currentPage = authCtx.saveLastSite;

  const loggedIn = authCtx.isLoggedIn;

  const goToLastPage = () => {
    router.push(GET_LAST_PAGE());
  };

  useEffect(() => {
    const pageData = currentPage();
    const query = pageData.path.query;
    if (GET_LAST_PAGE()) {
      UPDATE_LAST_PAGE(router.asPath);
    } else {
      SAVE_LAST_PAGE(router.asPath);
    }

    if (pageData.subPath) {
      if (foodCtx.currentMeal && !foodCtx.currentMeal.dish) {
      } else {
        lastMeal.save({ meal: query.meal, dish: props.currentMeal });
      }
    }

    if (!loggedIn) {
      // setTimeout(() => {
      //   if (loggedIn) {
      //     console.log("TIMEOUT SAYS IS LOGGED IN");
      //     // goToLastPage();
      //   } else {
      //     console.log("TIMEOUT SAYS IS NOT LOGGED IN");
      //     router.push("/login");
      //   }
      // }, 500);
    }
  }, [loggedIn]);

  if (loggedIn) {
    return props.children;
  } else {
    return <LoginPage />;
  }
};
export default AuthGuard;
