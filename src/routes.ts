/**
 * All public routes which can be access by the all user without auth
 * @type {string[]}
 */
export const publicRoutes = ["/", "/new-verification"];

/**
 * An array fo routes those are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/signup",
  "/error",
  "/reset-password",
  "/forget-password",
];

/**
 * The prefix for api authentication routes
 * @type {string}
 */
export const apiAuthRoutePrefix = "/api";

/**
 * The default redirect path after loggin
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/setting";
