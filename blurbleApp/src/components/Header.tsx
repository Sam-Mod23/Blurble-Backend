import React from "react";

import { IonHeader, IonToolbar, IonTitle, IonMenuButton } from "@ionic/react";

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar color="dark">
      <IonTitle>Blurble</IonTitle>
      <IonMenuButton color="primary" slot="secondary" id="main"></IonMenuButton>
    </IonToolbar>
  </IonHeader>
);

export default Header;
