import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useURLSearch(param = "q") {
  const location = useLocation();
  const navigate = useNavigate();

  const value = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get(param) ?? "";
  }, [location.search, param]);

  const setValue = (next) => {
    const params = new URLSearchParams(location.search);

    if (next && next.trim() !== "") {
      params.set(param, next);
    } else {
      params.delete(param);
    }

    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  };

  return { value, setValue };
}
