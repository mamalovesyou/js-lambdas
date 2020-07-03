import { useEffect, useRef } from "react";

// Custom useInterval hook to perform regular request
export const useInterval = (callback: () => void, delay: number | null | false, immediate?: boolean) => {
    const savedCallback = useRef(() => { });

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });

    // Execute callback if immediate is set.
    useEffect(() => {
        if (!immediate) return;
        if (delay === null || delay === false) return;
        savedCallback.current();
    }, [immediate]);

    // Set up the interval.
    useEffect(() => {
        if (delay === null || delay === false) return undefined;
        const tick = () => savedCallback.current();
        const id = setInterval(tick, delay);

        // Clear interval
        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;