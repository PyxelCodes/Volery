import Spinner from 'react-loader-spinner';

let totalSteps = 3;

export const InitialLoadingPage = ({ text, step }) => {
  return (
    <div className="loading">
      <div className="spinner">
        <Spinner color="#00ffff" type="Oval" />
      </div>
      <div className="loadingtext">
        <h2>
          {text} &nbsp; {step}/{totalSteps}
        </h2>
      </div>
    </div>
  );
};
