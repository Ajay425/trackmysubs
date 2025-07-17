// src/data/sidebarData.js
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    path: "/home",
    icon: FiHome,
  },
  {
    id: "02",
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
  {
    id: "03",
    label: "FAQ",
    path: "/faq",
    icon: FiHelpCircle,
  },
];
