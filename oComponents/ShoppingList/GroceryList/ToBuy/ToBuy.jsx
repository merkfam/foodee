import css from "./ToBuy.module.css";
import { useContext } from "react";
import BusinessContext from "../../../../store/business-context";
const ToBuy = (props) => {
  // console.log("START TOBUY---------------------------------------");
  // console.log(
  //   `props.ingredient: ${props.ingredient}, props.index: ${props.index}`
  // );
  // console.log("---------------------------------------START TOBUY");
  const busiCtx = useContext(BusinessContext);
  const deleter = (event) => {
    event.preventDefault();
    props.onClick(props.line, props.index, props.id);
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

      <td className={css.td}>
        <p className={css.p}>
          {busiCtx.cur} {props.total}
        </p>
      </td>
    </tr>
  );
};

export default ToBuy;
