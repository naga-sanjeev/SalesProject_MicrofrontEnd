import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
const MINUTES_UNITL_AUTO_LOGOUT = 60 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY =  'lastAction';
@Injectable(
 {
  providedIn: 'root'
}
)
export class AutoLogoutService { 

 public getLastAction() {
  const action:any= localStorage.getItem(STORE_KEY)

    return parseInt(action);
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());

  }

  constructor(private router: Router) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());

  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());


  }

  reset() {

    // console.log('date got by using events',Date.now());
    this.setLastAction(Date.now());
    // console.log('store key',localStorage.getItem(STORE_KEY));

  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    // console.log('difference',diff)
    const isTimeout = diff < 0;

    if (isTimeout)  {
      localStorage.clear();
      sessionStorage.clear();
      // this.router.navigate(['./login']);
      window.location.href = '/login';
    }
  }

}

