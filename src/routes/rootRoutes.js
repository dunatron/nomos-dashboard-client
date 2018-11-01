import HomePage from "../pages/HomePage"
import WizardPage from "../pages/WizardPage"
import MorningStandupPage from "../pages/MorningStandupPage"

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
]

export default rootRoutes
