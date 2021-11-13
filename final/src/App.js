import React, { useReducer } from "react";
import { Container } from "react-bootstrap";
import { mount, route } from "navi";
import { Router, View } from "react-navi";
import UserBar from "./user/UserBar";
import UserList from "./user/UserList";
import UserProfile from "./user/UserProfile";
import Home from "./Home";
import appReducer from "./reducers";
import { StateContext } from "./Contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: {},
    users: [],
    todos: [],
  });

  const { user } = state;

  const routes = mount({
    "/": route({ view: <Home /> }),
    "/users": route({ view: <UserList /> }),
    "/users/:userId": route((req) => {
      console.log("req: ", req);
      return { view: <UserProfile userId={req.params.userId} /> };
    }),
  });

  return (
    <div>
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router routes={routes}>
          <Container>
            <React.Suspense fallback={"Loading..."}>
              <UserBar />
            </React.Suspense>
            <hr />
            <View />
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
