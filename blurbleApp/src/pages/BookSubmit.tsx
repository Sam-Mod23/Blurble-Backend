import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import React from "react";
import GoogleBookList from "../components/GoogleBookList";

const BookSubmit: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GoogleBookList />
      </IonContent>
    </IonPage>
  );
};
export default BookSubmit;
