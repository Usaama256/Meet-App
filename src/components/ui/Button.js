import classes from "./Button.module.css";

//props are type(primary, red, green, blue, yellow, black, null) and click(handle click events)
const Btn = (props) => {
  var btnClass;
  switch (props.type) {
    case "red":
      btnClass = classes.btnRed;
      break;
    case "primary":
      btnClass = classes.btnPrimary;
      break;
    case "green":
      btnClass = classes.btnGreen;
      break;
    case "blue":
      btnClass = classes.btnBlue;
      break;
    case "yellow":
      btnClass = classes.btnYellow;
      break;
    case "black":
      btnClass = classes.btnBlack;
      break;
    default:
      btnClass = classes.btn;
  }

  return (
    <button onClick={props.click} className={btnClass}>
      {props.children}
    </button>
  );
};

export default Btn;
