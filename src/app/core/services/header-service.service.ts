import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  private headerVisible = new BehaviorSubject<boolean>(false);
  headerVisible$ = this.headerVisible.asObservable()


  isHeaderAvailable(value: boolean){
    this.headerVisible.next(value)
  }
}
