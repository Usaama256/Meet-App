import classes from "./OverlayBackdrop.module.css";

const OverlayBackdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.click}></div>;
};

export default OverlayBackdrop;
