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
      <td className={`${css.line}`}>{props.line}:</td>
      <td className={css.td}>
        <p className={css.p}>{props.ingredient}</p>
      </td>
      <td className={css.price}>
        <p className={css.p}>
          {busiCtx.cur}
          {props.price}
        </p>
      </td>
      {/* <td className={css.price}> x {props.number}</td> */}

      <td className={css.td}>
        <p className={css.p}>
          {busiCtx.cur} {props.total}
        </p>
      </td>
    </tr>
  );
};

export default ToBuy;
