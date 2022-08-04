import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ADD_TOKEN_DATA_TO_STORAGE,
  REMOVE_TOKEN_DATA_FROM_STORAGE,
  RETRIEVE_STORED_TOKEN,
  CALCULATE_REMAINING_TIME,
  UPDATE_STORED_DATA,
  UPDATE_ALL,
  UPDATE_ONE,
  SAVE_LAST_MEAL,
  GET_LAST_MEAL,
  REMOVE_LAST_MEAL,
  UPDATE_LAST_MEAL,
} from "./AUTHCONTEXT/EDIT_LOCAL_STORAGE";
import { FETCH } from "./FOODCONTEXT/FETCH_API";
import css from "./auth-context.module.css";

let logoutTimeout;
let remainingTime;

const AuthContext = createContext({
  token: "",
  userName: "",
  isLoggedIn: false,
  mealData: {},
  ingredients: [],
  lastMeal: {
    save: () => {},
    update: () => {},
    remove: () => {},
    get: () => {},
  },
  lastSite: () => {},
  setMealData: () => {},
  getIngredients: () => {},
  getDbUpdate: () => {},
  updateUserInfo: () => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const router = useRouter();
  let tokenData;
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [mealData, setMealData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const userIsLoggedIn = !!token;

  // console.log("LOGGED IN? ", userIsLoggedIn);

  const saveLatest = (mealData) => {
    SAVE_LAST_MEAL(mealData);
  };

  const updateLatest = (new_meal) => {
    UPDATE_LAST_MEAL(new_meal);
  };

  const updateProfile = (newProfileData) => {
    let updated;
    if (userIsLoggedIn) {
      updated = UPDATE_STORED_DATA(newProfileData);
      setUserInfo(updated);
    } else {
      updated = UPDATE_STORED_DATA(newProfileData);
      setUserInfo(updated);
    }
  };

  const getSite = () => {
    const path = router.pathname;
    const query = router.query;
    const send = { path: path, query: query };
    if (path === "/menu/[meal]/[dish]") {
      return { path: send, subPath: true };
    } else {
      return { path: send, subPath: false };
    }
  };

  const GET_DB_UPDATE = async (option = "", option_location = "") => {
    console.log("UPDATING DATA BASE...");
    if (userIsLoggedIn) {
      const userId = userInfo.userId;
      const r = await FETCH(userId, "/api/get_all");
      console.log("GET DB UPDATE RESPONSE: ", r);
      if (r.displayName) {
        if (option === "") {
          const mealData = {
            fullMenu: r.fullMenu,
            ingredients: r.ingredients,
            weeklyList: r.weeklyList,
          };
          setToken(r.token);
          setUserName(r.profile["User Data"]["User Name"]);
          setUserInfo({ ...r.profile, userId: r._id });
          setMealData(mealData);
          const update_data = UPDATE_ALL(r.profile, mealData);
          // console.log("LOCAL STORAGE UPDATE DATA: ", update_data);
        } else if (option === "profile") {
          setUserInfo(r.profile);
        } else {
          const data = mealData[option];
          setMealData((prev) => {
            return { ...prev, [option]: data };
          });
          const final = UPDATE_ONE(data, option, option_location);
          if (final) {
          }
        }
      }
    }
  };

  useEffect(() => {
    setUserInfo((prev) => {
      return prev;
    });
  }, [userInfo]);

  useEffect(() => {
    tokenData = RETRIEVE_STORED_TOKEN();
    if (tokenData) {
      const initialToken = tokenData.token;
      const initialUserName = tokenData.userName;
      const profile = tokenData.profile;
      const mealData = tokenData.mealData;

      setIngredients(tokenData.mealData.ingredients);
      setToken(initialToken);
      setUserName(initialUserName);
      setUserInfo(profile);
      setMealData(mealData);
    } else {
      console.log("NO TOKEN DATA WAS THERE TO RETREIVE");
    }
  }, []);

  const logoutHandler = async (function_that_called, time) => {
    console.log("LOGGING OUT...");
    console.log(`Function: ${function_that_called} called logoutHandler`);
    setToken(null);
    setUserName(null);
    REMOVE_TOKEN_DATA_FROM_STORAGE();
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    router.push("/login");
  };

  const loginHandler = (token, userName, expirationTime, profile, mealData) => {
    if (token) {
      setToken(token);
      // console.log("TOKEN: ", token);
    }
    if (userName) {
      setUserName(userName);
      // console.log("USERNAME: ", userName);
    }
    if (profile) {
      setUserInfo(profile);
      // console.log("PROFILE DATA: ", profile);
    }

    if (mealData) {
      setMealData({ ...mealData });
      if (mealData.ingredients) {
        setIngredients(mealData.ingredients);
      }
      // console.log("MEAL DATA: ", mealData);
    }
    saveLatest({ dish: {}, meal: "" });

    ADD_TOKEN_DATA_TO_STORAGE(
      token,
      userName,
      expirationTime,
      profile,
      mealData
    );

    remainingTime = CALCULATE_REMAINING_TIME(expirationTime);
    router.push("/login");
  };

  useEffect(() => {
    // console.log(ingredients);
    const expirationTime = localStorage.getItem("expirationTime");
    remainingTime = CALCULATE_REMAINING_TIME(expirationTime);

    if (remainingTime < 600) {
      clearTimeout(logoutTimeout);

      personalSetTimeout("Use Effect", remainingTime);
      logoutTimeout = setTimeout(logoutDealer, remainingTime);
    }
  }, []);

  const contextValue = {
    token: token,
    userName: userName,
    isLoggedIn: userIsLoggedIn,
    userInfo: userInfo,
    mealData: mealData,
    lastMeal: {
      save: saveLatest,
      update: updateLatest,
      remove: REMOVE_LAST_MEAL,
      get: GET_LAST_MEAL,
    },
    ingredients: ingredients,
    saveLastSite: getSite,
    getDbUpdate: GET_DB_UPDATE,
    setMealData: setMealData,
    updateUserInfo: updateProfile,
    login: loginHandler,
    logout: logoutHandler,
  };

  const logoutDealer = async (what_called) => {
    console.log("In Logout Dealer");
    console.log(
      `logoutDealer: Function ${what_called} was called with ${remainingTime} seconds left.`
    );
    logoutHandler();
  };

  const personalSetTimeout = (who, time) => {
    console.log(
      `personalSetTimeout: Function ${who} was called with ${time} seconds left.`
    );
    logoutTimeout = setTimeout(logoutDealer, time);
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <div className={css.height}>
        {userInfo !== {} ? props.children : <h1>Waiting for user info</h1>}
      </div>
    </AuthContext.Provider>
  );
};

export default AuthContext;
