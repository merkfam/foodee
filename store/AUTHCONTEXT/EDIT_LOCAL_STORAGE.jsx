export const CALCULATE_REMAINING_TIME = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedExpirationTime - currentTime;
  return remainingTime;
};

export const ADD_TOKEN_DATA_TO_STORAGE = async (
  token,
  userName,
  expirationTime,
  profile,
  mealData
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("userName", userName);
  localStorage.setItem("profile", JSON.stringify(profile));
  localStorage.setItem("mealData", JSON.stringify(mealData));
};

export const REMOVE_TOKEN_DATA_FROM_STORAGE = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userName");
  localStorage.removeItem("profile");
  localStorage.removeItem("mealData");
};

export const RETRIEVE_STORED_TOKEN = () => {
  let profile;
  let mealData;
  let storedToken = localStorage.getItem("token");
  let storedUserName = localStorage.getItem("userName");
  let storedExpirationTime = localStorage.getItem("expirationTime");
  // console.log("RETREIVING TOKEN DATA");

  try {
    // console.log("TRYING TO RETRIEVE");
    profile = localStorage.getItem("profile");
    mealData = localStorage.getItem("mealData");
    if (profile) {
      profile = JSON.parse(profile);
    } else {
      profile = {};
    }
    if (mealData) {
      mealData = JSON.parse(mealData);
    } else {
      mealData = {};
    }
  } catch (err) {
    console.log("RETREIVE FAILED ERR BELOW:");
    console.log(err);
    console.log("No profile Data Saved");
  }

  const remainingTime = CALCULATE_REMAINING_TIME(storedExpirationTime);

  if (remainingTime <= 60000) {
    console.log("Token Timed Out");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile");
    localStorage.removeItem("mealData");
    return null;
  }
  storedToken ? storedToken : "";
  storedUserName ? storedUserName : "";
  remainingTime ? remainingTime : 0;
  profile ? profile : {};
  mealData ? mealData : {};

  return {
    token: storedToken,
    userName: storedUserName,
    duration: remainingTime,
    profile: profile,
    mealData: mealData,
  };
};

export const UPDATE_ONE = (data, option, option_location) => {
  if (data) {
    const fixed = JSON.stringify(data);
    localStorage.removeItem(option_location);
    localStorage.setItem(option_location, fixed);
    try {
      const new_data = JSON.parse(localStorage.getItem(option_location));
      // console.log("NEW DATA: ", new_data);
      return new_data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};

export const UPDATE_STORED_DATA = (newProfile, mealData) => {
  const filter = newProfile;
  delete filter.funcs;
  const data = JSON.stringify(newProfile);
  const meals = JSON.stringify(mealData);

  let retreivedProfile = {};
  let retreivedMeals = {};

  localStorage.removeItem("profile");
  localStorage.removeItem("mealData");

  localStorage.setItem("profile", data);
  localStorage.setItem("mealData", meals);

  retreivedProfile = localStorage.getItem("profile");
  retreivedMeals = localStorage.getItem("mealData");

  try {
    retreivedProfile = JSON.parse(retreivedProfile);
    retreivedMeals = JSON.parse(retreivedMeals);
    const send = { profile: retreivedProfile, mealData: retreivedMeals };
    // console.log("UPDATE STORED DATA: ", send);
    return send;
  } catch (err) {
    console.log(err);
    retreivedProfile = {};
    retreivedMeals = {};
    return retreivedProfile;
  }
};

export const UPDATE_ALL = (newProfile, mealData) => {
  const data = JSON.stringify(newProfile);
  const meals = JSON.stringify(mealData);

  let retreivedProfile = {};
  let retreivedMeals = {};

  localStorage.removeItem("profile");
  localStorage.removeItem("mealData");

  localStorage.setItem("profile", data);
  localStorage.setItem("mealData", meals);

  retreivedProfile = localStorage.getItem("profile");
  retreivedMeals = localStorage.getItem("mealData");

  try {
    retreivedProfile = JSON.parse(retreivedProfile);
    retreivedMeals = JSON.parse(retreivedMeals);
    const send = { profile: retreivedProfile, mealData: retreivedMeals };
    console.log("UPDATE ALL DATA: ", send);
    return send;
  } catch (err) {
    console.log(err);
    retreivedProfile = {};
    retreivedMeals = {};
    return retreivedProfile;
  }
};

export const SAVE_LAST_MEAL = (mealData) => {
  if (mealData) {
    const to_save = JSON.stringify(mealData);
    localStorage.setItem("lastMeal", to_save);
  } else {
    console.log("THERE WAS NO LAST MEAL DATA TO SAVE>>>>");
  }
};

export const GET_LAST_MEAL = () => {
  const lastMeal = localStorage.getItem("lastMeal");
  try {
    const saved = JSON.parse(lastMeal);
    return saved;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const REMOVE_LAST_MEAL = () => {
  localStorage.removeItem("lastMeal");
};

export const UPDATE_LAST_MEAL = (new_meal) => {
  if (new_meal) {
    try {
      const to_save = JSON.stringify(new_meal);
      REMOVE_LAST_MEAL();

      SAVE_LAST_MEAL(to_save);
      let last_meal = GET_LAST_MEAL();
      last_meal = JSON.parse(last_meal);
    } catch (err) {
      console.log(err);
    }
  }
};

export const a_fake = () => {};

export const SAVE_LAST_PAGE = (page) => {
  if (typeof window !== "undefined") {
    try {
      const to_save = JSON.stringify(page);
      localStorage.setItem("page", to_save);
    } catch (err) {
      // console.log("THERE WAS NO LAST PAGE TO SAVE>>>>");
      console.log(err);
    }
  }
};

export const GET_LAST_PAGE = () => {
  try {
    const lastPage = localStorage.getItem("lastPage");
    const saved = JSON.parse(lastPage);
    return saved;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const UPDATE_LAST_PAGE = (page) => {
  try {
    localStorage.removeItem("lastPage");
    localStorage.setItem("lastPage", page);
    const saved = JSON.parse(lastPage);
    return saved;
  } catch (err) {
    console.log(err);
    return err;
  }
};
