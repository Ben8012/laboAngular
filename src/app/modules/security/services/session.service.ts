import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService<T> implements OnInit {
    private user: T | null = null;
    private user$ = new BehaviorSubject<T | null>(this.user);

    constructor(
        private $router: Router
    ) {

        const data = localStorage.getItem("user");
        if (data) {
            this.user = JSON.parse(data);
            if (this.user) {
                this.user$.next(this.user);
            }
        }
    }

    ngOnInit(): void {
    }

    open(id: number, label: string, token:string) {
        if (this.user) return;
        this.user = { id, label, token } as T;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.user$.next(this.user);
        console.log(this.user)
    }

    close() {
        if (!this.user) return;
        this.user = null;
        this.user$.next(this.user)
        localStorage.removeItem("user");
        this.$router.navigateByUrl("/");
    }

    subscribe(obs: (next: T | null) => void): Subscription {
        return this.user$.subscribe(obs);
    }
}
