import { Fragment } from "react";
import EntreeList from "./EntreeList/EntreeList";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import { TitleFy } from "../../../../Helpers/Strings";

const Meal = (props) => {
  const { entrees, sides, dish, headers, show } = props.mealModuleClasses;
  // console.log("props,", props);
  return (
    <Fragment>
      {show.meals && <PageSection section={TitleFy(props.currentMeal)} />}

      <BootStrapGridder>
        <Col md="6">
          <EntreeList
            setCurrentMeal={props.setCurrentMeal}
            meal={props.currentMeal}
            showMealType={show.mealType}
            entreeClasses={entrees}
            dishType="entree"
            dishClasses={dish}
            entrees={props.entrees}
            key={`EntreeList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
        <Col md="6">
          <EntreeList
            setCurrentMeal={props.setCurrentMeal}
            meal={props.currentMeal}
            showMealType={show.mealType}
            show={show}
            sideClasses={sides}
            dishType="side"
            dishClasses={dish}
            entrees={props.sides}
            key={`SideList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
      </BootStrapGridder>
    </Fragment>
  );
};

export default Meal;
