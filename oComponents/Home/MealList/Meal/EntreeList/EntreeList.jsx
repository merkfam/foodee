import css from "./EntreeList.module.css";
import Entree from "./Entree/Entree";
import PageSubSectionHeader from "../../../../BasicPageComponents/PageSubSectionHeader/PageSubSectionHeader";

const EntreeList = (props) => {
  const text = "Entree";
  // console.log(props);
  // console.log(props.entrees);
  return (
    <div key={Math.random() + Math.random()}>
      <PageSubSectionHeader text={props.showMealType && props.dishType} />

      {props.entrees.map((entree, index) => {
        {
          /* console.log(entree._id); */
        }
        return (
          <div key={`EntreeList Div: ${Math.random()} * ${Math.random()}`}>
            {
              <Entree
                meal={props.meal}
                dishType={props.dishType}
                canDelete={props.canDelete}
                id={entree._id}
                deleteDish={props.deleteDish}
                showMeals={props.showMeals}
                entree={entree.Dish}
                ingredients={entree.Ingredients}
                key={`Entree ${Math.random()}`}
              />
            }
          </div>
        );
      })}
    </div>
  );
};

export default EntreeList;
