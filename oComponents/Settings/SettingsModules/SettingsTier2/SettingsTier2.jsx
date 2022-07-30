import { Fragment } from "react";
import Setting from "../Setting";
const SettingsTier2 = (props) => {
  const base = props.nextTier;
  const keys = Object.keys(base);

  console.log("______________Tier2______________");
  console.log("______________Tier2______________");
  console.log("BASE: ", base);
  console.log("KEYS: ", keys);

  if (!keys) {
    return;
  }
  return (
    <Fragment>
      {keys.map((key, index) => {
        console.log("SETTING TEST: ", base[key]);
        console.log("SETTING KEY: ", key);
        return (
          <Fragment key={`Fragment: ${key}: ${index} : ${Math.random()}`}>
            <Setting setting={base} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default SettingsTier2;
