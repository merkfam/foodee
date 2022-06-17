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
    <tr id={props.id} index={props.index} onClick={deleter} className={css.tr}>
      <th className={`${css.space}`}>{props.line}:</th>
      <th className={css.th}>
        <p className={css.p}>{props.ingredient}</p>
      </th>
      <th className={css.th}>
        <p className={css.p}>
          {busiCtx.cur}: {props.price}
        </p>
      </th>
      <th className={css.th}>
        <p className={css.p}>x {props.number}</p>
      </th>
    </tr>
  );
};

export default ToBuy;
