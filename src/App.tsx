import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Splash from "./pages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Main no={1} />
        </Route>

        <Route exact path="/riwayat">
          <Main no={2} />
        </Route>

        <Route exact path="/akun">
          <Main no={3} />
        </Route>

        <Route exact path="/akun/informasi">
          <Main no={4} />
        </Route>

        <Route exact path="/akun/informasi/edit">
          <Main no={5} />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register/nakes">
          <Register nakes />
        </Route>

        <Route exact path="/register/pasien">
          <Register nakes={false} />
        </Route>

        <Route exact path="/">
          <Splash />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
