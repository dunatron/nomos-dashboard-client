import UserSetupPage from "../pages/UserSetupPage"

const wizardRoutes = [
  {
    title: "Manage Users",
    path: "/wizard/users",
    panel: true,
    main: true,
    restricted: ["WIZARD", "PROJECT_MANAGER"],
    component: UserSetupPage,
  },
]

export default wizardRoutes
