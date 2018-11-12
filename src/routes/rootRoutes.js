import React from "react"
import HomePage from "../pages/HomePage"
import WizardPage from "../pages/WizardPage"
import MorningStandupPage from "../pages/MorningStandupPage"
import LeavePage from "../pages/LeavePage"
import AllLeavePage from "../pages/AllLeavePage"
import LeaveCalendarPage from "../pages/LeaveCalendarPage"
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos"

const rootRoutes = [
  {
    title: "Home",
    path: "/",
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER"],
    component: HomePage,
  },
  {
    title: "Wizards Panel",
    path: "/wizard",
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD"],
    component: WizardPage,
  },
  {
    title: "Morning Standup",
    path: "/standup",
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: MorningStandupPage,
  },
  {
    title: "Apply for Leave",
    path: "/leave",
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: LeavePage,
  },
  {
    title: "Applied Leave",
    path: "/applied-leave",
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: AllLeavePage,
  },
  {
    title: "Leave Calendar",
    path: "/leave-calendar",
    icon: <ArrowBackIcon fontSize="72" />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: LeaveCalendarPage,
  },
]

export default rootRoutes
