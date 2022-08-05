import SettingsPage from "../../oComponents/Settings/SettingsPage";
import { useContext, useEffect } from "react";
import UserContext from "../../store/user-context";

const Settings = () => {
  let update;
  let updateSetting;
  const userCtx = useContext(UserContext);

  if (userCtx["User Data"]) {
    if (userCtx.others) {
      update = userCtx.others.funcs.update;
      updateSetting = userCtx.others.funcs.updateUserInfo;
    } else {
      update = () => {};
    }
  } else {
    // console.log("USERCTX :", userCtx);
    update = () => {};
  }

  return (
    <>
      <SettingsPage
        key={Math.random() / Math.random()}
        base={userCtx}
        update={update}
        updateSetting={updateSetting}
      />
    </>
  );
};

export default Settings;
