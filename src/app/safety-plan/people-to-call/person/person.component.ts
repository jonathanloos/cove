import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { UpdateContactService } from 'src/app/core/services/contacts/update-contact.service';
import parsePhoneNumber from 'libphonenumber-js';
import { Contact, User } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Storage from '@aws-amplify/storage';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  @Input() contact: Contact;

  editing: boolean = false;
  elementId: string = null;
  text_message_link : string;
  call_link : string;
  public PTCForm: FormGroup;

  public user$ = new Observable<User>((observer : Observer<User>) => {
    this.authService.currentUserSubject.subscribe(user => {
      observer.next(user);
    })
  });
  public imageUrl$ = new BehaviorSubject<Object | String>('../../../assets/icons/icon-128x128.png')

  constructor(
    private authService: AuthService,
    private contactsService: ContactService,
    private updateContactsService: UpdateContactService,
    private formBuilder: FormBuilder,
    public platform: Platform,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) { 

    this.updateContactsService.editChange.subscribe(result=> {
      let curr = this.updateContactsService.getContact();
      if(result){
        this.elementId = curr.id
      }else{
        this.elementId = null;
      }
      this.editing = result;
    })
  }

  ngOnInit() {
    if( this.contact.phone == undefined ){
      this.text_message_link = "#";
      this.call_link = "#";
    }else{
      this.text_message_link = "sms:/" + this.contact.phone + "&body=" + this.contact.automaticTextMessage ;
      this.call_link = "tel:" + this.contact.phone ;
    }

    this.PTCForm = this.formBuilder.group({
      id: [this.contact.id],
      name: [this.contact.name, Validators.required],
      phone: [this.contact.phone],
      automaticTextMessage:[this.contact.automaticTextMessage]
    });

    this.user$.subscribe(async (user) => {
      const result = await Storage.list(`${this.contact.id}-contactPhoto.png`, { 
        level: 'private'
      });

      if(result.length > 0){
        const imageUrl = await Storage.get(`${this.contact.id}-contactPhoto.png`, { level: 'private'})
        this.imageUrl$.next(imageUrl)
      }
    })

  }
  
  async cancel(){
    let curr = await this.contactsService.get(this.contact.id);
    this.PTCForm.setValue({
      id: curr.id,
      name: curr.name, 
      phone: curr.phone, 
      automaticTextMessage: curr.automaticTextMessage
    })
    this.updateContactsService.cancelOperation();
  }

  async save(){
    let contact = Contact.copyOf(this.contact, (mutable_contact: MutableModel<Contact>) => {
      mutable_contact.name = this.PTCForm.value.name; 
      mutable_contact.phone = this.PTCForm.value.phone; 
      mutable_contact.automaticTextMessage = this.PTCForm.value.automaticTextMessage; 
      return mutable_contact
    })

    if(contact.phone == undefined){
      const alert = await this.alertController.create({
        header: "Heads Up",
        message: "Looks like " + contact.name + " doesn't have a phone number. It can be added later, but it's recommended all contacts have one. Continue?",
        buttons: [
          {
            text: 'Edit',
            role: 'cancel',
            handler: () => {
            }
          }, {
            text: 'Continue',
            cssClass: 'primary',
            handler: async () => {
              this.updateContactsService.save(contact);
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
      
      this.updateContactsService.save(contact);
    }
  }

  async uploadFile(e){
    const file = e.target.files[0];

    const loading = await this.loadingController.create({
      message: 'Uploading your image...',
      duration: 2000
    });

    await loading.present();

    const key = await Storage.put(`${this.contact.id}-contactPhoto.png`, file, {
      contentType: 'image/png',
      level: 'private'
    });

    loading.dismiss();

    const imageUrl = await Storage.get(`${this.contact.id}-contactPhoto.png`, { level: 'private'})
    this.imageUrl$.next(imageUrl)
  }

  openFileBrowser(e){
    e.preventDefault();
    let element : HTMLElement = document.getElementById(`contactPictureUpload-${this.contact.id}`) as HTMLElement;
    element.click();
  }
  
  async showAlert(){
    const alert = await this.alertController.create({
      header: '🎉 Coming Soon 🎉',
      message: "Support for images coming to Cove soon! 🎥 ",
      buttons: [
        {
          text: 'Wicked',
          role: 'cancel',
          cssClass: 'btn btn-primary',
        }
      ]
    });

    await alert.present();
  }
}
