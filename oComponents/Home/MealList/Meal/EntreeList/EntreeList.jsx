import css from "./EntreeList.module.css";
import Entree from "./Entree/Entree";
import PageSubSectionHeader from "../../../../BasicPageComponents/PageSubSectionHeader/PageSubSectionHeader";

const EntreeList = (props) => {
  const text = "Entree";
  return (
    <div key={Math.random()}>
      <PageSubSectionHeader text={props.showMealType && props.dishType} />
      {props.entrees.length >= 0
        ? props.entrees.map((entree, index) => {
            return (
              <Entree
                showMeals={props.showMeals}
                entree={entree.Dish}
                ingredients={entree.Ingredients}
                key={`Entree ${Math.random()}`}
              />
            );
          })
        : null}
    </div>
  );
};

export default EntreeList;
