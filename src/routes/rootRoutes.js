import React from "react"
// Pages
import HomePage from "../pages/HomePage"
import WizardPage from "../pages/WizardPage"
import MorningStandupPage from "../pages/MorningStandupPage"
import LeavePage from "../pages/LeavePage"
import AllLeavePage from "../pages/AllLeavePage"
import LeaveCalendarPage from "../pages/LeaveCalendarPage"
import StockQAPage from "../pages/StockQAPage"
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos"
import PermContactIcon from "@material-ui/icons/PermContactCalendar"
import AssignmentIcon from "@material-ui/icons/Assignment"
import WeekendIcon from "@material-ui/icons/Weekend"
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode"
// Weekend
// DeveloperMode

const styles = {
  icon: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },
}

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
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD"],
    component: WizardPage,
  },
  {
    title: "Morning Standup",
    path: "/standup",
    icon: <WeekendIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: MorningStandupPage,
  },
  {
    title: "Apply for Leave",
    path: "/leave",
    icon: <AssignmentIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: LeavePage,
  },
  {
    title: "Applied Leave",
    path: "/applied-leave",
    icon: <ArrowBackIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: AllLeavePage,
  },
  {
    title: "Leave Calendar",
    path: "/leave-calendar",
    icon: <PermContactIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: LeaveCalendarPage,
  },
  {
    title: "Stock Q/A",
    path: "/stock-qa",
    icon: <PermContactIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: StockQAPage,
  },
]

export default rootRoutes
