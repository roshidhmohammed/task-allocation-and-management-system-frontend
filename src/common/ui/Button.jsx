
const Button = ({name, bgColor, hoverColor, textColor, onClick}) => {
  return (
    <button onClick={onClick} type="submit" className={`${bgColor} ${hoverColor} ${textColor}  px-6 py-2.5 rounded-lg transition-colors`}>
      {name}
    </button>
  )
}

export default Button