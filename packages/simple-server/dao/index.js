import { PageDAO } from "./page.js"
import { UserDAO } from "./user.js"
import { PackageDAO } from "./package.js"
import { LogDAO } from "./log.js"

export const pageDAO= new PageDAO()
export const userDAO = new UserDAO()
export const packageDAO = new PackageDAO()
export const logDAO = new LogDAO()