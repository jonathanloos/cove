import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { UpdateContactService } from 'src/app/core/services/contacts/update-contact.service';
import parsePhoneNumber from 'libphonenumber-js';
import { Contact } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

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

  constructor(
    private contactsService: ContactService,
    private updateContactsService: UpdateContactService,
    private formBuilder: FormBuilder,
    public platform: Platform,
    public alertController: AlertController
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
            cssClass: 'secondary',
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
}
