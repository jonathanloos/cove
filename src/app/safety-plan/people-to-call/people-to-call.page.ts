import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import parsePhoneNumber from 'libphonenumber-js'
import { AlertController, IonReorderGroup, ToastController } from '@ionic/angular';
import { Contact, User } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { Subject, BehaviorSubject } from 'rxjs';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-people-to-call',
  templateUrl: './people-to-call.page.html',
  styleUrls: ['./people-to-call.page.scss'],
})
export class PeopleToCallPage implements OnInit {
  @ViewChild('content') private content: any;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  currentUser: User;
  public user$ : Subject<User> = new BehaviorSubject<User>(null);
  public reordering = false;
  
  public payload = {
    title: "People to Call",
    description: "Identify people in your life you can trust so you can contact them in the case of a crisis.",
    list_prompt: "Here are some common contacts you can use in your safety plan:",
    items: [
      {
        title: "Therapist",
        description: "If you are receiving therapy you can contact your therapist for suggestions or to book an appointment.",
        automaticTextMessage: "Hey, I'm using my safety plan right now and want to schedule an appointment with you."
      },
      {
        title: "Friend",
        description: "It can be difficult to reach out for help when you're feeling down, but your friends are always there for you.",
        automaticTextMessage: "Hey, could you come over? I really need someone to talk to."
      },
      {
        title: "Family Member",
        description: "Find a family member you can confide in.",
        automaticTextMessage: "Hey, call me when you get this. I'm using my safety plan."
      }
    ]
  }

  personal_contacts: Contact[];
  public newPTCForm: FormGroup;
  adding:boolean = false;

  private contactsChange : any;
  private addEmptyStateToList : any;

  defaultMessage = "Hey, I'm using my safety plan right now. Please call me when you get this.";

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService,
    public alertController: AlertController,
    private emptyStateTransferService: EmptyStateObjectTransferService,
    public toastController: ToastController
    ) {

      this.contactsChange = contactService.contactsChange.subscribe(result => {
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

    this.addEmptyStateToList = this.emptyStateTransferService.addEmptyStateToList.subscribe((contact) => {
      this.saveContact(contact);
    })
   }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.user$.next(user)
      this.contactService.list(this.currentUser.id);
    });
  }

  toggleReorderGroup() {
    this.contactService.list(this.currentUser.id);

    this.reordering = !this.reordering;
    if(this.reorderGroup != undefined){
      this.reorderGroup.disabled = !this.reorderGroup.disabled;
    }
  }

  async doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();

    let items = document.getElementsByClassName('reorder-item');
    let ids = [];
    for (var i = 0; i < items.length; i++) {
      ids.push(items[i].getAttribute('id'));
    };

    await this.contactService.orderIdResolver(ids);
  }

  displayForm(){
    this.adding = true;
  }

  updateDefaultMessage(ev){
    this.defaultMessage = "Hey " + ev.target.value + ", I'm using my safety plan right now. Please call me when you get this.";
  }

  cancel(){
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

  async saveContact(contact: any){
    const newContact = new Contact({
      name: contact.title,
      automaticTextMessage: contact.automaticTextMessage,
      order: this.personal_contacts.length - 1,
      userID: this.currentUser.id
    })
    await this.contactService.create(newContact).then(() => {
      this.presentToast("Added contact to your list.", "primary")
    });
  }

  createContact(contact : Contact){
    this.contactService.create(contact);
    this.cancel();
  }

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      color: type,
      duration: 2000
    });
    await toast.present();
  }

  ngOnDestroy(){
    this.contactsChange.unsubscribe();
    this.addEmptyStateToList.unsubscribe();
  }
}
