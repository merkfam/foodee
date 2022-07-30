import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./auth-context";
import BusinessContext from "./business-context";
import { useRouter } from "next/router";
import { FETCH } from "./FOODCONTEXT/FETCH_API";

const UserContext = createContext({
  "User Data": {
    "User Name": "",
    "First Name": "",
    "Last Name": "",
    "Main Meals": "",
    "Optional Meals": "",
    Currency: "",
  },
  "Personal Data": {
    address: "",
    sex: "",
    gender: "",
  },

  "Regional Information": {
    country: "",
    currency: "",
  },
  "Theme Options": {
    theme: "",
  },
  others: {
    funcs: {
      updateUserInfo: () => {},
    },
    _id: "",
  },
});

export const UserContextProvider = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const busiCtx = useContext(BusinessContext);
  const [userInfo, setUserInfo] = useState(authCtx.userInfo);
  const isLoggedIn = authCtx.isLoggedIn;

  const updateProfile = async () => {
    console.log("UPDATE PROFILE INFO: ", userInfo);
    delete userInfo.others;
    const d = {
      ...userInfo,
    };
    console.log("UPDATE INFO: ", d);
    const r = await FETCH(d, "/api/update_profile");
    console.log("UPDATE USER RESPONSE: ", r);
  };

  const update = () => {
    updateProfile();
  };

  useEffect(() => {
    setUserInfo(authCtx.userInfo);
  }, [authCtx.userInfo]);

  const decide = (data) => {
    return data ? data : "";
  };

  // console.log("USER INFO: ", userInfo);

  let contextValue =
    userInfo && userInfo["User Data"]
      ? {
          ...userInfo,
          others: {
            funcs: {
              updateUserInfo: authCtx.updateUserInfo,
              update: update,
            },
          },
        }
      : {};

  // console.log("USER CONTEXT CONTEXT VALUE: ", contextValue);

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
