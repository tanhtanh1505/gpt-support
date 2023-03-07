import { usePromiseTracker } from "react-promise-tracker";
import { Oval } from 'react-loader-spinner';

function LoadingIndicator() {
  const { promiseInProgress } = usePromiseTracker();
  return (
      promiseInProgress &&
      <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >
        <Oval />
      </div>  
  )
}

export default LoadingIndicator;