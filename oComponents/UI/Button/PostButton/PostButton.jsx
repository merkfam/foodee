const PostButton = (props) => {
  return (
    <button {...props} onKeyDown={props.onKeyDown}>
      {props.text}
    </button>
  );
};

export default PostButton;
