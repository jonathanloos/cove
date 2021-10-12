import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { User } from 'src/models';
import { AuthService } from '../core/services/auth/auth.service';
import Storage from '@aws-amplify/storage';

@Component({
  selector: 'app-app-template',
  templateUrl: './app-template.page.html',
  styleUrls: ['./app-template.page.scss'],
})
export class AppTemplatePage implements OnInit {

  private user : User;
  public user$ = new Observable<User>((observer : Observer<User>) => {
    this.authService.currentUserSubject.subscribe(user => {
      if(user){
        this.user = user
        observer.next(user);
      }
    })
  });
  
  public imageUrl$ = new BehaviorSubject<Object | String>('../../../assets/icons/icon-128x128.png')

  safety_plan_pages = [
    {
      title: 'Warning Signs',
      url: '/app/safety-plan/warning-signs'
    },
    {
      title: 'Coping Strategies',
      url: '/app/safety-plan/coping-strategies'
    },
    {
      title: 'People To Call',
      url: '/app/safety-plan/people-to-call'
    },
    {
      title: 'Places To Go',
      url: '/app/safety-plan/places-to-go'
    },
  ]

  resource_pages =[
    {
      title: 'Public Resources',
      url: '/app/safety-plan/resources'
    }
  ]

  selectedPath = '';

  constructor(router: Router, public authService: AuthService) { 
    router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    })
  }

  async ngOnInit() {
    this.user$.subscribe(async (user) => {
      const result = await Storage.list(`${user.userSub}-profilePicture.png`, { 
        level: 'private'
      });

      if(result.length > 0){
        const imageUrl = await Storage.get(`${user.userSub}-profilePicture.png`, { level: 'private'})
        this.imageUrl$.next(imageUrl)
      }
    })
  }
}
