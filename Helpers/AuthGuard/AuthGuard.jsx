import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useEffect, Fragment, useContext } from "react";

// const AuthGuard = (props) => {
//   const { user, initializing, setRedirect } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initializing) {
//       //auth is initialized and there is no user
//       if (!user) {
//         // remember the page that user tried to access
//         setRedirect(router.route);
//         // redirect
//         router.push("/signin");
//       }
//     }
//   }, [initializing, router, user, setRedirect]);

//   /* show loading indicator while the auth provider is still initializing */
//   if (initializing) {
//     return <h1>Application Loading</h1>;
//   }

//   // if auth initialized with a valid user show protected page
//   if (!initializing && user) {
//     return <>{props.children}</>;
//   }

//   /* otherwise don't return anything, will do a redirect from useEffect */
//   return null;
// };

const AuthGuard = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      async () => {
        while (!authCtx.isLoggedIn) {
          if (authCtx.isLoggedIn) {
            return props.children;
          }
          await sleep(20).then(() => {
            if (authCtx.isLoggedIn) {
              return props.children;
            } else {
              router.push("/login");
            }
          });
        }
        return;
      };
      return;
    }
  }, [authCtx.isLoggedIn]);

  if (authCtx.isLoggedIn) {
    return props.children;
  }
};
export default AuthGuard;
