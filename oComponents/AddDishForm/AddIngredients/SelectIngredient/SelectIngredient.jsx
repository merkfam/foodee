import css from "./SelectIngredient.module.css";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import Label from "../../../UI/Label/Label";
import IngredientOption from "./IngredientOption/IngredientOption";

const SelectIngredient = (props) => {
  const classes = ` ${props.className} ${css.fixDiv}`;
  const options = props.options;
  if (options[0] !== "Choose") {
    options.unshift("Choose");
  }

  if (options[1] === "Choose") {
    options.slice(1, 1);
  }

  const changeHandler = (e) => {
    props.onChange(e);
  };

  return (
    <>
      <Label
        text={props.label}
        className={props.labelClass}
        value={props.value}
      />
      <Form.Select
        aria-label="Selection"
        className={`${css.select} form-select2`}
        onChange={changeHandler}
        id={props.id}
        name={props.name}
        value={props.value}
      >
        {options.map((option, index) => {
          return (
            <IngredientOption
              key={`${option._id}|${index}-${Math.random() * Math.random()}`}
              option={option === "Choose" ? "Choose" : option.ingredient.name}
              optionClass={`${props.optionClass}`}
              className={
                index === props.options.length - 1
                  ? `${css.finalOption} `
                  : null
              }
              // onSelect={props.pullOut}
            />
          );
        })}
      </Form.Select>
    </>
  );
};

export default SelectIngredient;
