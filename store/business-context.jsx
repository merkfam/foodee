import { createContext } from "react";

const BusinessContext = createContext({
  name: "MerKFam",
  type: "",
  longName: "",
  address: "",
  motto: "",
  missionStatement: "",
  cur: "฿",
  measure: { sm: "mm", md: "cm", lg: "m" },
  theme: "",
});

export const BusinessContextProvider = (props) => {
  const contexValue = {
    name: "MerK",
    longName: "",
    address: "",
    motto: "",
    missionStatement: "",
    cur: "฿",
    measure: { sm: "mm", md: "cm", lg: "m" },
  };

  return (
    <BusinessContext.Provider value={contexValue}>
      {props.children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
