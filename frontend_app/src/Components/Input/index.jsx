const Input = ({title, onChangeHandler, types, names, values, placeholdername}) => {
  return (
    <>
      <lable>{title}</lable>
      <input type={types} onChange={onChangeHandler} name={names} value={values} placeholder={placeholdername}/>
    </>
  );
};
export default Input;
