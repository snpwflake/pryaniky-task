import React from "react";
const useAuthToken = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<
    "loading" | "authorized" | "unauthorized"
  >("loading");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setStatus("authorized");
    } else {
      setStatus("unauthorized");
    }
  }, []);

  return { token, status };
};

export default useAuthToken;
