export { default } from "next-auth/middleware";

//determines which routes should be protected, i.e. only when logged in can the user visit the admin page
export const config = { matcher: ["/admin"] };
