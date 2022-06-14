import css from "./ListContainer.module.css";
import { useState } from "react";

const ListContainer = (props) => {
  //   const [ingredients, setIngredients] = useState(props.list);

  return (
    <tbody className={css.tbody}>
      {props.list.map((ingredient, index) => {
        return (
          <ToBuy
            key={data[ingredient]._id}
            line={index + 1}
            id={data[ingredient]._id}
            ingredient={data[ingredient].ingredient}
            price={data[ingredient].price}
            number={data[ingredient].number}
          />
        );
      })}
    </tbody>
  );
};

export default ListContainer;
