import rootRoutes from "./rootRoutes"
import wizardRoutes from "./wizardRoutes"
import stockQARoutes from "./stockQARoutes"

const indexRoutes = [...rootRoutes, ...wizardRoutes, ...stockQARoutes]

export default indexRoutes
