import React from "react"
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle"
// components
import CreateQuestion from "../components/StockQA/CreateQuestion"

const styles = {
  icon: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },
}

const wizardRoutes = [
  {
    title: "Create Stock Question",
    path: "/stock-qa/create-question",
    icon: <SupervisedUserCircleIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: CreateQuestion,
  },
]

export default wizardRoutes
