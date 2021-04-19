import React, { Component } from "react";

import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonSearchbar,
} from "@ionic/react";

import * as api from "../api";

class GoogleBookList extends Component {
  state = {
    searchTerm: "",
    loading: true,
  };

  componentDidMount = () => {
    const newState = { loading: false };
    this.setState(newState);
  };

  setSearchText = (input: string) => {
    this.setState({ searchTerm: input });
    if (this.state.searchTerm.length > 0) {
      api.fetchBook(this.state.searchTerm).then((books) => {
        const newState = { books: [...books], loading: false };
        console.log(newState);
        this.setState(newState);
      });
    }
  };

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonTitle>New Title</IonTitle>
        </IonHeader>
        <IonContent>
          <p>Search</p>
          <IonSearchbar
            value={this.state.searchTerm}
            onIonChange={(e) => this.setSearchText(e.detail.value!)}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default GoogleBookList;
