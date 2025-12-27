import { useState } from "react";

export const useShare = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const share = async ({ title, text, url }) => {
    setError(null);
    setSuccess(false);

    if (!navigator.share) {
      setError("Your browser does not support sharing.");
      return;
    }

    try {
      await navigator.share({ title, text, url });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error sharing");
    }
  };

  return { share, success, error };
};
