import css from "./ToBuy.module.css";
import Card from "../../../UI/Card/Card";
import { useContext, useState } from "react";
import BusinessContext from "../../../../store/business-context";
const ToBuy = (props) => {
  const busiCtx = useContext(BusinessContext);
  const [remove, setRemove] = useState();
  const deleter = (event) => {
    // setRemove(css.delete);
    const id = event.target.id;
    props.onClick(props.index);
  };
  return (
    <tr
      id={props._id}
      index={props.index}
      onClick={deleter}
      className={`${remove}`}
    >
      <th>
        <Card>{props.line}: </Card>
      </th>
      <th>
        <Card>{props.ingredient}</Card>
      </th>
      <th>
        <Card>
          {busiCtx.cur}: {props.price}
        </Card>
      </th>
      <th>
        <Card>x {props.number}</Card>
      </th>
    </tr>
  );
};

export default ToBuy;
