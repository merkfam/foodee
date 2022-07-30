import SettingsTier1 from "./SettingsModules/SettingsTier1/SettingsTier1";
import css from "./SettingsPage.module.css";
import { Fragment } from "react";
import PostButton from "../UI/Button/PostButton/PostButton";

const SettingsPage = (props) => {
  const base = props.base;
  const keys = Object.keys(base);

  const updateProfile = (e) => {
    e.preventDefault();
    props.update();
  };
  if (!keys) {
    return;
  }

  const handleTransfer = async () => {
    // Create User Through Sign Up
    // Get Sign Up Details From Backend
    // Take all currently stored food data and save it along with profile info in user file
    // Save Them Into Proper Place
  };
  return (
    <>
      <h1>Settings</h1>
      <div className={css.saveAllDiv}>
        <PostButton
          onClick={updateProfile}
          text="Save Changes"
          className={css.saveAll}
        />
      </div>
      {keys.map((key, index) => {
        const nextTier = base[key];
        if (key === "others" || key === "_id" || key === "userId") {
          return null;
        }
        return (
          <Fragment key={`Fragment: ${key}: ${index} : ${Math.random()}`}>
            <h1 key={`${key}:${Math.random()}`} className={css.settingCategory}>
              {key}
            </h1>

            <SettingsTier1
              nextTier={nextTier}
              category={key}
              update={props.update}
              updateSetting={props.updateSetting}
              key={`${key}: ${index} : ${Math.random()}`}
            />
          </Fragment>
        );
      })}
      {/* <button onClick={updateProfile}>Save Changes</button> */}
      <div className={css.saveAllDiv}>
        <PostButton
          onClick={updateProfile}
          text="Save Changes"
          className={css.saveAll}
        />
      </div>
    </>
  );
};

export default SettingsPage;
