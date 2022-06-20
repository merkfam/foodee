import PageSection from "../BasicPageComponents/PageSection/PageSection";
import Card from "../UI/Card/Card";
import css from "./DishInstructions.module.css";
import PageSubSection from "../BasicPageComponents/PageSubSection/PageSubSection";
import PageSubSectionHeader from "../BasicPageComponents/PageSubSectionHeader/PageSubSectionHeader";

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
