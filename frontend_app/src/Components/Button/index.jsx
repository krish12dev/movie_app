const Button = ({ title, clickButtonHandler,className }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={clickButtonHandler}
    >
      {title}
    </button>
  );
};
export default Button;
