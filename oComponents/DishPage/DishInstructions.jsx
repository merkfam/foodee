import Card from "../UI/Card/Card";
import css from "./DishInstructions.module.css";

const DishInstructions = (props) => {
  const instructions =
    props.instructions && props.instructions.instructions
      ? props.instructions.instructions
      : props.instructions;

  const _id =
    props.instructions && props.instructions.instructions
      ? props.instructions._id
      : props._id;

  console.log("props.instructions: ", props.instructions);
  console.log("props._id: ", props._id);

  console.log("instructions: ", instructions);
  console.log("_id: ", _id);

  return (
    <Card>
      <h5 className={css.text}>Instructions:</h5>
      <Card className={css.card}>
        <p id={_id}>{instructions}</p>
      </Card>
    </Card>
  );
};

export default DishInstructions;
