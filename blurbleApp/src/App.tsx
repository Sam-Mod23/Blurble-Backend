import { Link, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonMenuButton,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonContent,
  IonHeader,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import BookSubmit from "./pages/BookSubmit";
import React from "react";

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

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonReactRouter>
    <IonApp>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Blurble</IonTitle>
          <IonMenuButton
            color="primary"
            slot="secondary"
            className="MenuButton"
          ></IonMenuButton>
        </IonToolbar>
      </IonHeader>
      <IonMenu side="start" contentId="main">
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main">
          <IonItem routerLink="/bookSubmit"> click on me</IonItem>
          <IonList>
            <IonItem routerLink="/bookSubmit">
              <IonLabel>Book Submit</IonLabel>
            </IonItem>
            <IonItem>
              <Link to="/booksubmit">me</Link>
            </IonItem>
            <IonItem>List Item</IonItem>
            <IonItem>List Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/BookSubmit" component={BookSubmit} />
      </IonRouterOutlet>
    </IonApp>
  </IonReactRouter>
);

export default App;
