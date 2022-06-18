import css from "./Entree.module.css";
import Ingredients from "../../../Ingredients/Ingredients";
import Card from "../../../../../UI/Card/Card";
import PageSubSection from "../../../../../BasicPageComponents/PageSubSection/PageSubSection";
import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import FoodContext from "../../../../../../store/food-context";
import { TitleFy } from "../../../../../../Helpers/Strings";
const Entree = (props) => {
  const foodCtx = useContext(FoodContext);
  console.log(props);

  const router = useRouter();

  const getMeal = () => {
    const path = router.pathname;
    if (path.toString() === "/menu") {
      router.push(`/menu/${props.meal}/${props.entree}`);
    } else {
      router.push(`/menu/${props.meal}/${props.entree}`);
    }
  };

  const getMealHandler = () => {
    foodCtx.setCurrentMeal({
      dishType: props.dishType,
      meal: props.meal,
      dish: props.entree,
      id: props.id,
      ingredients: props.ingredients,
      instructions: props.instructions,
    });

    getMeal();
  };

  return (
    <Fragment>
      <Card
        id={props.id}
        onClick={getMealHandler}
        key={`IngredientCard ${Math.random() * Math.random()}`}
        className={`${css.card} `}
      >
        <div key={`IngredientDiv ${Math.random() * Math.random()}`}>
          <div className={css.heading}>
            <PageSubSection
              text={TitleFy(props.entree)}
              key={Math.random() * Math.random()}
            />
          </div>

          <Ingredients
            key={`Ingredients-Creation: ${Math.random()}`}
            ingredients={props.ingredients}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Entree;
