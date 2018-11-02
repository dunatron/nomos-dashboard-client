export const AUTH_TOKEN = "auth-token"
export const PERSISTENT_STORE_KEYS_ARR = ["user"]
// export const ROLE_WIZARD = "WIZARD" // wizard role
// export const ROLE_DEVELOPER = "DEVELOPER" // developer role
// export const ROLE_DESIGNER = "DESIGNER" //designer role
// export const ROLE_PROJECT_MANAGER = "PROJECT_MANAGER" // project manager role
// export const ROLE_TESTER = "TESTER" // tester role
// export const ROLE_ONBOARDER = "ONBOARDER" // onboarder role
// export const ROLE_ANALYST = "ANALYST" // analyst role

export const ROLE_WIZARD = { name: "Wizard", value: "WIZARD" } // wizard role
export const ROLE_DEVELOPER = { name: "Developer", value: "DEVELOPER" } // developer role
export const ROLE_DESIGNER = { name: "Designer", value: "DESIGNER" } //designer role
export const ROLE_PROJECT_MANAGER = {
  name: "Project Manager",
  value: "PROJECT_MANAGER",
} // project manager role
export const ROLE_TESTER = { name: "Tester", value: "TESTER" } // tester role
export const ROLE_ONBOARDER = { name: "On-Boarder", value: "ONBOARDER" } // onboarder role
export const ROLE_ANALYST = { name: "Analyst", value: "ANALYST" } // analyst role

export const NOMOS_USER_ROLES = [
  ROLE_WIZARD,
  ROLE_DEVELOPER,
  ROLE_DESIGNER,
  ROLE_PROJECT_MANAGER,
  ROLE_TESTER,
  ROLE_ONBOARDER,
  ROLE_ANALYST,
]

export const ROLE_OPTIONS = NOMOS_USER_ROLES.map(r => ({
  name: r.name,
  value: r.value,
}))
