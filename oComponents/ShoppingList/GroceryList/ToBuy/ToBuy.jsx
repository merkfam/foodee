import css from "./ToBuy.module.css";
import Card from "../../../UI/Card/Card";
import { useContext, useState } from "react";
import BusinessContext from "../../../../store/business-context";
const ToBuy = (props) => {
  const busiCtx = useContext(BusinessContext);
  const deleter = (event) => {
    props.onClick(props.index, props.id);
  };
  return (
    <tr id={props.id} index={props.index} onClick={deleter}>
      <th>
        <Card>{props.line}: </Card>
      </th>
      <th>
        <Card className={css.ingredient}>{props.ingredient}</Card>
      </th>
      <th>
        <Card className={css.ingredient}>
          {busiCtx.cur}: {props.price}
        </Card>
      </th>
      <th>
        <Card>x {props.number}</Card>
      </th>
      <th>
        <Card>{props.price.length > 6 ? 0 : props.number * props.price}</Card>
      </th>
    </tr>
  );
};

export default ToBuy;
