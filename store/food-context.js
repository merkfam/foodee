import { createContext, Fragment, useEffect, useState } from "react";
import { GENERATE_SCHEDULE } from "../Helpers/FOODCONTEXT/FOODCONTEXT";

const FoodContext = createContext({
  menuId: "",
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  dessert: [],
  weeklySchedule: {},
  mainMeals: {
    list: [],
    ingredients: [],
  },
  otherMeals: {
    list: [],
    ingredients: [],
  },
  scheduleId: "",
  allIngredients: [],
  hasScheduleIngredients: Boolean,
  setBreakfast: () => {},
  setLunch: () => {},
  setDinner: () => {},
  setSnack: () => {},
  setDessert: () => {},
  getNew: () => {},
  reload: () => {},
  setReload: () => {},
  deleteDish: () => {},
  updateDish: () => {},
  updateIngredient: () => {},
  deleteIngredient: () => {},
  addNewIngredient: () => {},
});

export const FoodContextProvider = (props) => {
  const [menuId, setMenuId] = useState("");
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snack, setSnack] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [weeklyScheduleData, setWeeklyScheduleData] = useState({});
  const [scheduleId, setScheduleId] = useState("");
  const [reload, setReload] = useState(false);
  const [currentMeal, setCurrentMeal] = useState({});
  const [hasWeeklySchedule, setHasWeeklySchedule] = useState(false);
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [listOfIngredientsId, setListOfIngredientsId] = useState("");

  // console.log("currentMeal,", currentMeal);
  const getListOfIngredients = async () => {
    try {
      const data = await fetch("/api/get_ingredient_list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const list_data = await data.json();
      list_data && list_data.ingredients
        ? setListOfIngredients(list_data.ingredients)
        : setListOfIngredients([]);

      list_data && list_data._id
        ? setListOfIngredientsId(list_data._id)
        : setListOfIngredientsId("");
      return data;
    } catch (err) {
      console.log("There was an error receiving data from the server...");
      console.log(err);
    }
  };

  const addNewIngredient = async (newIngredient) => {
    console.log("listId,", listOfIngredientsId);
    newIngredient = {
      name: newIngredient.ingredient,
      price: newIngredient.price,
      listId: listOfIngredientsId,
    };

    const fixedData = JSON.stringify(newIngredient);

    try {
      const retreival = await fetch("/api/add_ingredient", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sendData = await retreival.json();
      return sendData;
    } catch (err) {
      console.log("There Was An Error Adding The New Ingredient");
      console.log(err);
      return err;
    }
  };

  const updateIngredient = async (newIngredient) => {
    newIngredient = {
      ...newIngredient,
      list_id: listOfIngredientsId,
    };

    const fixedData = JSON.stringify(newIngredient);

    try {
      const retreival = await fetch("/api/update_ingredient", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sendData = await retreival.json();
      return sendData;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const deleteIngredient = async (theIngredient) => {
    // console.log("listId,", listOfIngredientsId);
    const ingredient = {
      ...theIngredient,
      listId: listOfIngredientsId,
    };

    const fixedData = JSON.stringify(ingredient);

    try {
      const retreival = await fetch("/api/delete_ingredient", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await retreival.json();
      setCurrentMeal(sendData);
      return sendData;
    } catch (err) {
      console.log("There was an error sending ingredient data for deletion.");
      console.log(err);
    }
  };

  const updateReload = (bool) => {
    setReload(bool);
  };

  const updateDish = async (id) => {
    // console.log("sending to server...");
    // console.log("id,", id);
    const data = {
      menuId: menuId,
      _id: id._id,
      meal: id.meal,
      dishType: id.dishType,
      dish: id.dish,
      ingredients: id.ingredients,
      instructions: id.instructions,
    };

    const fixedData = JSON.stringify(data);

    try {
      const retreival = await fetch("/api/update_dish", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await retreival.json();
      return sendData;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const deleteDish = async (id) => {
    // console.log("id,", id.dishType);
    const data = {
      menuId: menuId,
      _id: id.id,
      meal: id.meal,
      dishType: id.dishType,
      name: id.name,
    };
    const fixedData = JSON.stringify(data);

    try {
      const retreival = await fetch("/api/delete_dish", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await retreival.json();
      setCurrentMeal(data);
      return sendData;
    } catch (err) {
      console.log("There was an error sending schedule update info.");
      console.log(err);
    }
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
      // console.log("final", final);
      const { _id, breakfast, lunch, dinner, snack, dessert } = final;
      setBreakfast(breakfast);
      setLunch(lunch);
      setDinner(dinner);
      setSnack(snack);
      setDessert(dessert);
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
    // console.log("data,", data);

    try {
      const retreival = await fetch("/api/update_weekly_schedule", {
        body: fixedData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await retreival.json();
      // console.log("sendData", sendData);
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
      // console.log("weekly schedule data below:");
      const sendData = await retreival.json();
      // console.log(sendData);
      if (sendData) {
        setWeeklyScheduleData(sendData);
        setScheduleId(sendData._id);
        setHasWeeklySchedule(true);
        return true;
      } else {
        setHasWeeklySchedule(false);
        return false;
      }

      // return sendData;
    } catch (err) {
      console.log("There was an error retreiving the weekly schedule data");
      console.log(err);
      return null;
    }
  };
  // useEffect is called to avoid endless re-renders

  let hasSchedule;
  useEffect(() => {
    const md = getMenu();

    hasSchedule = GET_WEEKLY_SCHEDULE();
    getListOfIngredients();

    setHasWeeklySchedule(hasSchedule);
  }, []);

  // separate fullMeals and otherMeals so that they can be used easier.

  const fullMeals =
    breakfast !== undefined && breakfast !== "undefined"
      ? [breakfast, lunch, dinner]
      : [null];

  // console.log("brakfast,", breakfast);
  // console.log("fullMeals,", fullMeals);

  const otherMeals =
    snack !== undefined && snack !== "undefined" ? [snack, dessert] : [null];

  const UPDATE_WEEKLY_SCHEDULE = async () => {
    const newSchedule = GENERATE_SCHEDULE(fullMeals, otherMeals, false);
    // console.log("newSchedule,", newSchedule);

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

  const mainMealsList =
    weeklyScheduleData &&
    weeklyScheduleData.meals &&
    weeklyScheduleData.meals.main
      ? weeklyScheduleData.meals.main.sort((a, b) => {
          var textA = a.ingredient;
          var textB = b.ingredient;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
      : [];

  const mainMealsIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.ingredients &&
    weeklyScheduleData.ingredients.main
      ? weeklyScheduleData.ingredients.main.sort((a, b) => {
          var textA = a.ingredient;
          var textB = b.ingredient;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
      : [];

  const otherMealsList =
    weeklyScheduleData &&
    weeklyScheduleData.meals &&
    weeklyScheduleData.meals.other
      ? weeklyScheduleData.meals.other
      : [];

  const otherMealsIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.ingredients &&
    weeklyScheduleData.ingredients.other
      ? weeklyScheduleData.ingredients.other.sort((a, b) => {
          var textA = a.ingredient;
          var textB = b.ingredient;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
      : [];

  const hasScheduleIngredients =
    weeklyScheduleData &&
    weeklyScheduleData.ingredients &&
    weeklyScheduleData.ingredients.main.sort((a, b) => {
      var textA = a.ingredient;
      var textB = b.ingredient;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
      ? true
      : false;

  const contexValue = {
    menuId: menuId,
    breakfast: breakfast,
    lunch: lunch,
    dinner: dinner,
    snack: snack,
    dessert: dessert,

    mainMeals: {
      list: mainMealsList,
      ingredients: mainMealsIngredients,
    },
    otherMeals: {
      list: otherMealsList,
      ingredients: otherMealsIngredients,
    },
    weeklySchedule: weeklyScheduleData,
    scheduleId: scheduleId,
    hasScheduleIngredients: hasScheduleIngredients,
    reload: reload,
    currentMeal: currentMeal === "undefined" ? [] : currentMeal,
    allIngredients: listOfIngredients,
    setCurrentMeal: setCurrentMeal,
    setReload: updateReload,
    getNew: UPDATE_WEEKLY_SCHEDULE,
    deleteDish: deleteDish,
    updateDish: updateDish,
    addNewIngredient: addNewIngredient,
    updateIngredient: updateIngredient,
    deleteIngredient: deleteIngredient,
    setBreakfast: setBreakfast,
    setLunch: setLunch,
    setDinner: setDinner,
    setSnack: setSnack,
    setDessert: setDessert,
  };

  return (
    <FoodContext.Provider value={contexValue}>
      {contexValue.breakfast && hasScheduleIngredients && hasWeeklySchedule && (
        <Fragment>{props.children}</Fragment>
      )}
      {(!contexValue.breakfast ||
        !hasScheduleIngredients ||
        !hasWeeklySchedule) && <h1>Loading...</h1>}
    </FoodContext.Provider>
  );
};

export default FoodContext;
