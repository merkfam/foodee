import css from "./PostButton.module.css";

const PostButton = (props) => {
  return (
    <div className={css.postButtonDiv}>
      <button
        {...props}
        onKeyDown={props.onKeyDown}
        className={props.className}
      >
        {props.text}
      </button>
    </div>
  );
};

export default PostButton;
