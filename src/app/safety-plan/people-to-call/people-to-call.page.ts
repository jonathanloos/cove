import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import parsePhoneNumber from 'libphonenumber-js'
import { AlertController } from '@ionic/angular';
import { Contact, User } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

@Component({
  selector: 'app-people-to-call',
  templateUrl: './people-to-call.page.html',
  styleUrls: ['./people-to-call.page.scss'],
})
export class PeopleToCallPage implements OnInit {
  @ViewChild('content') private content: any;

  currentUser: User;
  
  personal_contacts: Contact[];
  public newPTCForm: FormGroup;
  adding:boolean = false;

  defaultMessage = "Hey, I'm using my safety plan right now. Please call me when you get this.";

  constructor(
    private formBuilder: FormBuilder,
    private PTCService: ContactService,
    private authService: AuthService,
    public alertController: AlertController
    ) {

    PTCService.contactsChange.subscribe(result => {
      this.personal_contacts = result
      if(this.personal_contacts.length == 0){
        this.adding = true;
      }
    })

    this.newPTCForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      automaticTextMessage:[this.defaultMessage]
    })
   }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.PTCService.list(this.currentUser.id);
    });
  }

  displayForm(){
    this.adding = true;
  }

  updateDefaultMessage(ev){
    this.defaultMessage = "Hey " + ev.target.value + ", I'm using my safety plan right now. Please call me when you get this.";
  }

  reset(){
    this.adding = false;
    this.newPTCForm.reset({textMsg: this.defaultMessage})
  }

  async create(){
    let contact = new Contact({
      name: this.newPTCForm.value.name,
      phone: this.newPTCForm.value.phone,
      automaticTextMessage: this.newPTCForm.value.automaticTextMessage,
      userID: this.currentUser.id
    })

    if(contact.phone == undefined){
      const alert = await this.alertController.create({
        header: "Heads Up",
        message: "Looks like " + contact.name + " doesn't have a phone number. It can be added later, but it's recommended all contacts have one. Continue?",
        buttons: [
          {
            text: 'Edit',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Continue',
            cssClass: 'primary',
            handler: async () => {
              this.createContact(contact);
            }
          }
        ]
      });
      await alert.present();
    }else{
      const phoneNumber = parsePhoneNumber(contact.phone, "CA");
      if(phoneNumber){
        contact = Contact.copyOf(contact, (mutable_contact: MutableModel<Contact>) => {
            mutable_contact.phone = String(phoneNumber.formatNational()); 
            return mutable_contact
        });
      }else{
        // Phone number invalid so don't save it
        contact = Contact.copyOf(contact, (mutable_contact: MutableModel<Contact>) => {
          mutable_contact.phone = ""; 
          return mutable_contact
        });
      }
      this.createContact(contact);
    }
  }

  createContact(contact : Contact){
    this.PTCService.create(contact);
    this.reset();
  }
}
