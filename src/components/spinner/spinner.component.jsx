import "./spinner.styles.scss";
const Spinner = () => {
  return (
    <div className='lds-roller'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
