import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import FoodContext from "../../store/food-context";

const AuthGuard = (props) => {
  const foodCtx = useContext(FoodContext);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const lastMeal = authCtx.lastMeal;
  const currentPage = authCtx.saveLastSite;
  useEffect(() => {
    const pageData = currentPage();
    const query = pageData.path.query;

    if (pageData.subPath) {
      if (foodCtx.currentMeal && !foodCtx.currentMeal.dish) {
        const savedMeal = lastMeal.get();
      } else {
        lastMeal.save({ meal: query.meal, dish: props.currentMeal });
      }
    }

    if (!authCtx.isLoggedIn) {
      router.push("/login");
    }
  }, [authCtx.isLoggedIn]);

  if (authCtx.isLoggedIn) {
    return props.children;
  }
};
export default AuthGuard;
