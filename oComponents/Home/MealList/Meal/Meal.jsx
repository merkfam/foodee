import { Fragment, useState } from "react";
import EntreeList from "./EntreeList/EntreeList";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import PostButton from "../../../UI/Button/PostButton/PostButton";

const Meal = (props) => {
  const [canDelete, setCanDelete] = useState(false);
  const { entrees, sides, dish, headers, show } = props.mealModuleClasses;
  const setDelete = () => {
    console.log("ready");
    confirm();
  };
  return (
    <Fragment>
      {show.meals ? <PageSection section={props.meal} /> : null}

      <BootStrapGridder>
        <PostButton onClick={setDelete} text="Select" />
        <Col md="6">
          <EntreeList
            meal={props.meal}
            canDelete={canDelete}
            showMealType={show.mealType}
            entreeClasses={entrees}
            dishType="Entree"
            dishClasses={dish}
            entrees={props.entrees}
            key={`EntreeList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
        <Col md="6">
          <EntreeList
            meal={props.meal}
            canDelete={canDelete}
            showMealType={show.mealType}
            show={show}
            sideClasses={sides}
            dishType="Side"
            dishClasses={dish}
            entrees={props.sides}
            key={`SideList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
        <PostButton onClick={setDelete} text="Select" />
      </BootStrapGridder>
    </Fragment>
  );
};

export default Meal;
