import { createContext, useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

let logoutTimeout;

const AuthContext = createContext({
  token: "",
  userName: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedExpirationTime - currentTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserName = localStorage.getItem("userName");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userName");
    return null;
  }
  return {
    token: storedToken,
    userName: storedUserName,
    duration: remainingTime,
  };
};

const addTokenDataToStorage = (token, userName, expirationTime) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("userName", userName);
};

const removeTokenDataFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userName");
};

export const AuthContextProvider = (props) => {
  const router = useRouter();
  let tokenData;
  let initialToken;
  let initialUserName;

  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialUserName);
  const userIsLoggedIn = !!token;

  useEffect(() => {
    tokenData = retrieveStoredToken();
    if (tokenData) {
      initialToken = tokenData.token;
      initialUserName = tokenData.userName;
      setToken(initialToken);
      setUserName(initialUserName);
    }
  }, []);

  const logoutHandler = () => {
    setToken(null);
    setUserName(null);
    removeTokenDataFromStorage();
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    // sendToLogin();
    router.push("/login");
  };

  const loginHandler = (token, userName, expirationTime) => {
    console.log("logging in...");
    router.push("/community");
    setToken(token);
    setUserName(userName);
    addTokenDataToStorage(token, userName, expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimeout = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimeout = setTimeout(logoutHandler, tokenData.duration);
    }
  });

  const contextValue = {
    token: token,
    userName: userName,
    isLoggedIn: userIsLoggedIn,

    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
