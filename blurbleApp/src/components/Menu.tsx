import {
  IonMenu,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonContent,
  IonHeader,
  IonIcon,
  IonFooter,
} from "@ionic/react";

import {
  homeSharp,
  personCircleSharp,
  searchSharp,
  logOutSharp,
} from "ionicons/icons";

import React from "react";

const Menu: React.FC = () => (
  <IonMenu side="start" menuId="first" contentId="main">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Navigate</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent color="primary">
      <IonList color="primary">
        <IonItem color="primary" routerLink="/Home">
          <IonIcon slot="start" icon={homeSharp} />
          Home
        </IonItem>

        <IonItem color="primary" routerLink="/profile">
          <IonIcon slot="start" icon={personCircleSharp} />
          Profile
        </IonItem>

        <IonItem color="primary" routerLink="/browse">
          <IonIcon slot="start" icon={searchSharp} />
          Browse
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter>
      <IonToolbar color="primary">
        <IonItem color="primary" routerLink="/login">
          <IonIcon slot="end" icon={logOutSharp} />
          Logout
        </IonItem>
      </IonToolbar>
    </IonFooter>
  </IonMenu>
);

export default Menu;
