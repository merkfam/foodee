import css from "./Entree.module.css";
import Ingredients from "../../../Ingredients/Ingredients";
import Card from "../../../../../UI/Card/Card";
import PageSubSection from "../../../../../BasicPageComponents/PageSubSection/PageSubSection";

const Entree = (props) => {
  return (
    <Card
      key={`IngredientCard ${Math.random() * Math.random()}`}
      className={`${css.card} `}
    >
      <div key={`IngredientDiv ${Math.random() * Math.random()}`}>
        <div className={css.heading}>
          <PageSubSection
            text={props.entree}
            key={Math.random() * Math.random()}
          />
        </div>

        <Ingredients
          key={`Ingredients-Creation: ${Math.random()}`}
          ingredients={props.ingredients}
        />
      </div>
    </Card>
  );
};

export default Entree;
