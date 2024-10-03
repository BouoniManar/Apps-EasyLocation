import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase  from 'firebase/compat/app'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }

  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)

    }

    async MotdePassOublier(email:string){
      return await this.ngFireAuth.sendPasswordResetEmail(email)
    }

    async signOut(){
      return await this.ngFireAuth.signOut()
    }


    async getProfile(){
      return await this.ngFireAuth.currentUser
    }



}