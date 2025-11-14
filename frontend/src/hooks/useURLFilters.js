import {  useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useURLFilters(param = "position") {
    const location = useLocation();
    const navigate = useNavigate();

    const active = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const cur = params.get(param);
        return cur ? cur.split(",").filter(Boolean) : [];
    }, [location.search, param]);

    const toggle = (value, checked) => {
        const params = new URLSearchParams(location.search);
        let list = params.get(param)?.split(",").filter(Boolean) || [];

        if (value === "all") {
        list = [];
        params.delete(param);
        } else {
        list = checked
            ? Array.from(new Set([...list, value]))
            : list.filter((x) => x !== value);
        list.length ? params.set(param, list.join(",")) : params.delete(param);
        }
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    return { active, toggle };
}
