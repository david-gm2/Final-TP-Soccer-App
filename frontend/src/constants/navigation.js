import {
    IconHome,
    IconStats,
    IconMatches,
    IconPlayer,
    IconHistory,
} from "../../public/icons/IconsHeader";

export const navigationItems = [
    {
        path: "/",
        label: "Home",
        icon: IconHome,
        end: true,
    },
    {
        path: "/stats",
        label: "Stats",
        icon: IconStats,
        end: false,
    },
    {
        path: "/matches",
        label: "Matches",
        icon: IconMatches,
        end: false,
    },
    {
        path: "/players",
        label: "Players",
        icon: IconPlayer,
        end: false,
    },
    {
        path: "/history",
        label: "History",
        icon: IconHistory,
        end: false,
    },
];

