import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  myHub! : signalr.HubConnection

  public $connection: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private http : HttpClient
  ) { }

  connection() {
    // Vérifier si la connexion est déjà en cours ou si elle est déjà démarrée
    if (this.myHub && (this.myHub.state === signalr.HubConnectionState.Connected || this.myHub.state === signalr.HubConnectionState.Connecting)) {
        console.log('Connection is already started or in progress.');
        return;
    }

    // Créer une nouvelle connexion seulement si elle n'existe pas ou si elle est dans l'état "Disconnected"
    this.myHub = new signalr.HubConnectionBuilder()
              .withUrl(apiUrl + "Chathub").build();

    const startConnection = () => {
        this.myHub.start()
            .then(() => {
                this.$connection.next(true);
                console.log('Connection started!');
            })
            .catch(err => {
                this.$connection.next(false);
                console.error('Error while establishing connection :(' + err);
                // Relancer la connexion après un court délai (par exemple, 5 secondes)
                setTimeout(startConnection, 5000);
            });
    };

    // Démarrer la connexion initiale
    startConnection();

    // Écouter les événements de fermeture de connexion
    this.myHub.onclose(() => {
        console.log('Connection closed. Attempting to reconnect...');
        // Relancer la connexion après un court délai (par exemple, 5 secondes)
        setTimeout(startConnection, 5000);
    });
}

  getMessage(sender : any, reciever : any): Observable<any[]> {
    return this.http.get<any>(apiUrl+"Chat/"+sender+'/'+reciever)
  }

  connectionIsOpen(): boolean {
    return this.myHub && this.myHub.state === signalr.HubConnectionState.Connected;
  }
}

