import css from "./PageSection.module.css";

const PageSection = (props) => {
  const classes = `${css.section} ${props.className}`;
  return <h2 className={classes}>{props.section}</h2>;
};

export default PageSection;
