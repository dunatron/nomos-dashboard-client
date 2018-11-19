import React from "react"
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle"
// components
import CreateQuestion from "../components/StockQA/CreateQuestion"
// ToDo: Create container or component for the AllQuestionsList
import AllQuestionsList from "../components/StockQA/AllQuestionsList"

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
  {
    title: "All Stock Questions",
    path: "/stock-qa/all-questions",
    icon: <SupervisedUserCircleIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER", "WIZARD"],
    component: AllQuestionsList,
  },
]

export default wizardRoutes
