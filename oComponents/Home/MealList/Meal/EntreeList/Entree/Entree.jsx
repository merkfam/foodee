import css from "./Entree.module.css";
import Ingredients from "../../../Ingredients/Ingredients";
import Card from "../../../../../UI/Card/Card";
import PageSubSection from "../../../../../BasicPageComponents/PageSubSection/PageSubSection";
import { Fragment, useState } from "react";
import Modal from "../../../../../UI/Modal/Modal0";
const Entree = (props) => {
  const [showModal, setShowModal] = useState(false);
  const confirm = () => {
    setShowModal(true);
  };
  const handleNo = () => {
    setShowModal(false);
  };
  const deleteDish = async (e) => {
    const data = {
      meal: props.meal,
      dishType: props.dishType,
      id: props.id,
      name: props.entree,
    };
    props.deleteDish(data);
    setShowModal(false);
    console.log("deleting...");
  };

  return (
    <Fragment>
      {showModal && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you'd like to delete the selected item?"
          show={showModal}
          okayButton="Sure"
          closeButton="No"
          handleNo={handleNo}
          handleYes={deleteDish}
        />
      )}
      {/* {props.canDelete && check} */}
      <Card
        id={props.id}
        onClick={confirm}
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
    </Fragment>
  );
};

export default Entree;
