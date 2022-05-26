import { useEffect, useRef } from "react";

/**
 * @param {() => void} effect - function to run on mount
 */
const useMountEffect = effect => {
  const initialRef = useRef(true);

  useEffect(() => {
    if (!initialRef.current) return;

    initialRef.current = false;
    effect();
  }, [effect]);
};

export default useMountEffect;
