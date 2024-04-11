import { useCallback, useState } from "react";

export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response = await fetch(requestConfig.url, requestConfig.options);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setHasError(err.message || "Failed to fetch data!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    hasError,
    sendRequest,
  };
}
