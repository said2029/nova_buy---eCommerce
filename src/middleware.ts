import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

//  log in
function middleware(req: any, res: any) {
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!api|_next/static|images/*|public|images/Icons|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
