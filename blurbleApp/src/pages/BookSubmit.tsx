import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import React from "react";

const BookSubmit: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>BookSubmit</h1>
      </IonContent>
    </IonPage>
  );
};
export default BookSubmit;
