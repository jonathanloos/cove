import { Injectable } from '@angular/core';
import { Auth, DataStore, syncExpression } from 'aws-amplify';
import { Observable, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Contact, CopingStrategy, Place, User, WarningSign } from 'src/models';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public currentUserSubject: Subject<User> = new ReplaySubject<User>();
  public currentUser: Observable<User>;
  public tempPass: string = "";

  constructor( private userService: UserService ) {
      this.loadUser();
  }

  public async loadUser(){
    await this.currentAuthenticatedUser().then((user : any) => {
      if(!this.currentUserSubject){
        this.currentUserSubject = new BehaviorSubject<User>(user);
      } else {
        this.currentUserSubject.next(user);
      }
      
      this.currentUser = this.currentUserSubject.asObservable();
    })
  }

  public async updateUser(user: User){
    await this.userService.update(user).then((user : any) => {
      this.currentUserSubject.next(user);
    });
  }

  public async register(user: User){
    // await this.scrubLocalDb(user.userSub);
    await this.userService.create(user).then(async (user : any) => {
      await this.loadUser();
    });
  }

  public async deleteProfile(){
    // await this.userService.deleteProfile().then(() => {
    //   this.currentUserSubject.next(null);
    // });
  }

  public async currentAuthenticatedUser(){
    return await Auth.currentAuthenticatedUser().then(async (user) => {
      const currentUserInDb = await this.userService.get();
      // Check if there's a user, otherwise create them.
      if(currentUserInDb){
        this.currentUserSubject.next(currentUserInDb)
        return currentUserInDb;
      }else{
        return undefined
      }
    })
      .catch(error => { return error });
  }

  public async isSignedIn(){
    return await Auth.currentAuthenticatedUser()
      .then(() => { return true; })
      .catch(() => { return false; });
  }

  public async signUp(email, password) {
    this.tempPass = password;

    return await Auth.signUp({username: email, password})
  }

  public async signIn(email, password){
    return await Auth.signIn(email, password);
  }

  public async signOut(){
    this.currentUserSubject.next(null);
    return await Auth.signOut();
  }

  public async resendVerificationCode(email: string){
    return await Auth.resendSignUp(email);
  }

  // When switching between accounts, remove old users data, pull new users data
  async scrubLocalDb(userSub? : string){
    // Grab current user in db
    return await this.userService.get().then(async user => {
      const currentLoadedUser = user;
      // Only sync data the user can see
      // DataStore.configure({
      //   // Selective Sync Config
      //   syncExpressions: [
      //     syncExpression(User, s => s.userSub('eq', userSub)),
      //     syncExpression(Contact, s => s.userID('eq', userSub)),
      //     syncExpression(CopingStrategy, s => s.userID('eq', userSub)),
      //     syncExpression(Place, s => s.userID('eq', userSub)),
      //     syncExpression(WarningSign, s => s.userID('eq', userSub)),
      //   ]
      // });
      // If logged in user != current user in db
      if(currentLoadedUser != undefined && currentLoadedUser.userSub != userSub){
        // Clear local cache
        return await DataStore.clear().then(async () => { 
          return await DataStore.query(User).then((res) => {console.log(res)});
        });
      }
      // Grab user data from cloud
      return await this.loadUser();
    })
  }

  public async confirmSignUp(email, code) {
    try {
      return await Auth.confirmSignUp(email, code);
    } catch (error) {
      return error
    }
  }
}

