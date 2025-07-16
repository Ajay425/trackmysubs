// src/data/sidebarData.js
import {
  FiHome,
  FiPlus,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    path: "/",
    icon: FiHome,
  },
  {
    id: "02",
    label: "Add Subscription",
    path: "/add-subscription",
    icon: FiPlus,
  },
  {
    id: "03",
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
  {
    id: "04",
    label: "FAQ",
    path: "/faq",
    icon: FiHelpCircle,
  },
];
