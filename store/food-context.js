import { createContext, Fragment, useEffect, useState } from "react";
// import SAVE_WEEKLY_SCHEDULE from "../Helpers/client_to_api_functions/SAVE_WEEKLY_SCHEDULE";
import { GENERATE_SCHEDULE } from "../Helpers/FOODCONTEXT/FOODCONTEXT";

const FoodContext = createContext({
  menuId: "",
  Breakfast: [],
  Lunch: [],
  Dinner: [],
  Snack: [],
  Dessert: [],
  WeeklySchedule: {},
  MainMeals: {
    list: [],
    ingredients: [],
  },
  OtherMeals: {
    list: [],
    ingredients: [],
  },
  scheduleId: "",
  hasScheduleIngredients: Boolean,
  getNew: () => {},
  reload: () => {},
  setReload: () => {},
});

export const FoodContextProvider = (props) => {
  const show = false;
  const show2 = true;

  const [menuId, setMenuId] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [snack, setSnack] = useState("");
  const [dessert, setDessert] = useState("");
  const [weeklyScheduleData, setWeeklyScheduleData] = useState({});
  const [scheduleId, setScheduleId] = useState("");
  const [reload, setReload] = useState(false);
  const updateReload = (bool) => {
    setReload(bool);
  };

  const getMenu = async () => {
    try {
      const data = await fetch("/api/get_full_menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const final = await data.json();
      // log("got the menu", show);
      const { _id, Breakfast, Lunch, Dinner, Snack, Dessert } = final;
      setBreakfast(Breakfast);
      setLunch(Lunch);
      setDinner(Dinner);
      setSnack(Snack);
      setDessert(Dessert);
      setMenuId(_id);
      return final;
    } catch (err) {
      console.log("There was an error receiving data from the server...");
      console.log(err);
    }
  };

  const update_weekly_schedule_fetch = async (schedule) => {
    const data = { previousId: scheduleId, newSchedule: schedule };
    const fixedData = JSON.stringify(data);
    // log((data, "data"), show);

    try {
      const retreival = await fetch("/api/update_weekly_schedule", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("UPDATE_WEEKLY_SCHEDULE: newData");
      const sendData = await retreival.json();

      return sendData;
    } catch (err) {
      console.log("There was an error sending schedule update info.");
      console.log(err);
    }
  };

  const GET_WEEKLY_SCHEDULE = async () => {
    // request to server to get the weekly shopping list etc.
    try {
      const retreival = await fetch("/api/get_weekly_schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sendData = await retreival.json();

      if (sendData) {
        // log(("sendData", sendData), show);

        setWeeklyScheduleData(sendData);
        setScheduleId(sendData._id);
        return true;
      } else {
        return false;
      }

      // return sendData;
    } catch (err) {
      console.log("There was an error retreiving the weekly schedule data");
      console.log(err);
      setWeeklyScheduleData(null);
      return null;
    }
  };
  // useEffect is called to avoid endless re-renders
  useEffect(() => {
    getMenu();
    GET_WEEKLY_SCHEDULE();
  }, []);

  // separate fullMeals and otherMeals so that they can be used easier.

  const fullMeals =
    breakfast !== undefined && breakfast !== "undefined"
      ? [breakfast, lunch, dinner]
      : [null];

  const otherMeals =
    snack !== undefined && snack !== "undefined" ? [snack, dessert] : [null];

  const UPDATE_WEEKLY_SCHEDULE = async () => {
    const newSchedule = GENERATE_SCHEDULE(fullMeals, otherMeals, false);

    try {
      const response = await update_weekly_schedule_fetch({
        _id: scheduleId,
        schedule: newSchedule,
      });

      const updated = response.lastErrorObject.updatedExisting;

      if (updated) {
        setWeeklyScheduleData(newSchedule);
        setReload(false);
        return response;
      } else {
        setReload(false);
        return response;
      }
    } catch (err) {
      console.log("There was an error sending updated info");
      console.log(err);
      return err;
    }
  };

  const MainMealsList =
    weeklyScheduleData &&
    weeklyScheduleData.Meals &&
    weeklyScheduleData.Meals.main
      ? weeklyScheduleData.Meals.main
      : [];

  let MainMealsIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.Ingredients &&
    weeklyScheduleData.Ingredients.main
      ? weeklyScheduleData.Ingredients.main
      : null;

  const OtherMealslist =
    weeklyScheduleData &&
    weeklyScheduleData.Meals &&
    weeklyScheduleData.Meals.other
      ? weeklyScheduleData.Meals.other
      : [];

  const OtherMealsIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.Ingredients &&
    weeklyScheduleData.Ingredients.other
      ? weeklyScheduleData.Ingredients.other
      : [];

  const hasScheduleIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.Ingredients &&
    weeklyScheduleData.Ingredients.main
      ? true
      : false;

  const contexValue = {
    menuId: menuId,
    Breakfast: breakfast,
    Lunch: lunch,
    Dinner: dinner,
    Snack: snack,
    Dessert: dessert,

    MainMeals: {
      list: MainMealsList,
      ingredients: MainMealsIngredients,
    },
    OtherMeals: {
      list: OtherMealslist,
      ingredients: OtherMealsIngredients,
    },
    WeeklySchedule: weeklyScheduleData,
    scheduleId: scheduleId,
    hasScheduleIngredients: hasScheduleIngredients,
    reload: reload,
    setReload: updateReload,
    getNew: UPDATE_WEEKLY_SCHEDULE,
  };

  // useEffect(() => {
  //   MainMealsIngredients =
  //     weeklyScheduleData &&
  //     weeklyScheduleData.Ingredients &&
  //     weeklyScheduleData.Ingredients.main
  //       ? weeklyScheduleData.Ingredients.main
  //       : null;
  // }, [MainMealsIngredients]);

  return (
    <FoodContext.Provider value={contexValue}>
      {contexValue.Breakfast && MainMealsIngredients && (
        <Fragment>{props.children}</Fragment>
      )}
      {!contexValue.Breakfast ||
        (contexValue.MainMeals.ingredients && <h1>...Loading</h1>)}
    </FoodContext.Provider>
  );
};

export default FoodContext;
