import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    userId = new BehaviorSubject<string>("");
    constructor(private afAuth: AngularFireAuth) {
        this.getUserId();
     }

    getUserId() {
        this.afAuth.onAuthStateChanged(user => {
            this.userId.next(user.uid);
        });
    }
}