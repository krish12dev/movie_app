const Button = (type,title,clickButtonHandler) =>{
    return (
        <div>
            <label>{title}</label>
            <button onClick={clickButtonHandler}/>
        </div>
    )
}
export default Button