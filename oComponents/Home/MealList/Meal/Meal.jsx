import { Fragment } from "react";
import EntreeList from "./EntreeList/EntreeList";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";

const Meal = (props) => {
  const { entrees, sides, dish, headers, show } = props.mealModuleClasses;

  return (
    <Fragment>
      {show.meals ? <PageSection section={props.meal} /> : null}
      <BootStrapGridder>
        <Col md="6">
          <EntreeList
            // showMeals={show.meals}
            showMealType={show.mealType}
            entreeClasses={entrees}
            // headerClasses={headers}
            dishType="Entree"
            dishClasses={dish}
            entrees={props.entrees}
            key={`EntreeList ${Math.random()}`}
          />
        </Col>
        <Col md="6">
          <EntreeList
            // showMeals={show.meal}
            showMealType={show.mealType}
            show={show}
            sideClasses={sides}
            // headerClasses={headers}
            dishType="Side"
            dishClasses={dish}
            entrees={props.sides}
            key={`SideList ${Math.random()}`}
          />
        </Col>
      </BootStrapGridder>
    </Fragment>
  );
};

export default Meal;
