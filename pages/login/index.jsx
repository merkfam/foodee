import { useState, useContext, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import css from "./Login.module.css";
import Card from "../../oComponents/UI/Card/Card";
import AuthContext from "../../store/auth-context";
import { AXIOS_POST } from "../../store/FOODCONTEXT/FETCH_API";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let credentials = {
      email: email,
      password: password,
    };

    console.log("CREDENTIALS: ", credentials);

    setIsLoading(true);

    const credURL = "/api/get_credentials";
    try {
      const credentialsResponse = await AXIOS_POST(credentials, credURL);
      console.log("AXIOS CREDENTIALS RESPONSE: ", credentialsResponse);
      const loginURL = "/api/login";

      if (credentialsResponse.idToken) {
        try {
          const data = await AXIOS_POST(credentialsResponse, loginURL);
          console.log("AXIOS LOGIN RESPONSE: ", data);

          const mealData = {
            fullMenu: data.fullMenu,
            ingredients: data.ingredients,
            weeklyList: data.weeklyList,
          };
          const token = data.token;
          const userName = data.displayName;
          const profile = { ...data.profile, userId: data._id };
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(token, userName, expirationTime, profile, mealData);
        } catch (err) {
          console.log("ERROR GETTING LOGIN RESPONSE: ", err);
        }
      } else {
        console.log("Credentials Did Not Come");
      }
    } catch (err) {
      console.log("ERROR GETTING CREDENTIALS: ", err);
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      {isLoading === false ? (
        <div className={css.login}>
          <Card className={css.card}>
            <h1 className={css.heading}>Login</h1>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </Form.Group>
              <Button
                className={css.button}
                onClick={formSubmitHandler}
                variant="secondary"
                type="submit"
              >
                Submit
              </Button>
              {error && <p className={css.errorText}>{error}</p>}
            </Form>
          </Card>
          <div className={css.createSpace}></div>
        </div>
      ) : (
        // This is just a loading sign.
        <h1>Logging In...</h1>
      )}
    </Fragment>
  );
};

export default Login;
