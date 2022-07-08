import { useEffect, useState } from "react";

const useAdaptiveView = (breakpoint) => {
  const [isAdaptiveView, setAdaptiveView] = useState(window.innerWidth <= breakpoint);
  const resizeHandler = () => setAdaptiveView(window.innerWidth <= breakpoint);

  useEffect(() => {
    addEventListener('resize', resizeHandler);
    return () => removeEventListener('resize', resizeHandler);
  }, []);
  
  return isAdaptiveView;
};

export default useAdaptiveView;
