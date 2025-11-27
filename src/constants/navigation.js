import {
  IconHome,
  IconStats,
  IconMatches,
  IconPlayer,
  IconHistory,
} from "../icons/IconSidebar.jsx";

export const navigationItems = [
  {
    path: "/",
    label: "Home",
    icon: IconHome,
    end: true,
    admin: false,
  },
  {
    path: "/stats",
    label: "Stats",
    icon: IconStats,
    end: false,
    admin: false,
  },
  {
    path: "/matches",
    label: "New Match",
    icon: IconMatches,
    end: false,
    admin: true,
  },
  {
    path: "/players",
    label: "Players",
    icon: IconPlayer,
    end: false,
    admin: false,
  },
  // {
  //   path: "/history",
  //   label: "History",
  //   icon: IconHistory,
  //   end: false,
  //   admin: false,
  // },
  {
    path: "/users",
    label: "Users",
    icon: IconPlayer,
    end: false,
    admin: true,
  },
];
