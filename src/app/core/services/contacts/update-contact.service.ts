import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from 'src/models';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateContactService {

  private updatedContact: Contact;
  public editing: boolean = false;
  editChange: Subject<boolean> = new Subject<boolean>();
  
  constructor(private contactService: ContactService) {  };

  async select(id: string){
    this.updatedContact = await this.contactService.get(id);
    this.editing = true;
    this.editChange.next(this.editing);
  }

  getContact(): Contact{
    return this.updatedContact;
  }

  cancelOperation(){
    this.editing = false;
    this.editChange.next(this.editing);
  }

  save(contact: Contact){
    this.updatedContact = contact;
    this.contactService.update(this.updatedContact)
    this.editing = false;
    this.editChange.next(this.editing)
  }
}
