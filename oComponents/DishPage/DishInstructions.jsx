import Card from "../UI/Card/Card";
import css from "./DishInstructions.module.css";

const DishInstructions = (props) => {
  return (
    <Card>
      <h5 className={css.text}>Instructions:</h5>
      <Card className={css.card}>
        <p>{props.instructions && props.instructions}</p>
      </Card>
    </Card>
  );
};

export default DishInstructions;
