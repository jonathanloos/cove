import { Component, OnInit, Input } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { UpdateWarningSignService } from 'src/app/core/services/warning-signs/update-warning-sign.service';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { WarningSignsService } from 'src/app/core/services/warning-signs/warning-signs.service';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { UpdatePlaceService } from 'src/app/core/services/places/update-place.service';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { UpdateContactService } from 'src/app/core/services/contacts/update-contact.service';

@Component({
  selector: 'app-edit-popover',
  templateUrl: './edit-popover.component.html',
  styleUrls: ['./edit-popover.component.scss'],
})
export class EditPopoverComponent implements OnInit {

  id: string;
  type: string;

  constructor(
    private navParams: NavParams, 
    private popController: PopoverController,
    private updateCSService: UpdateCopingStrategyService,
    private updateWSService: UpdateWarningSignService,
    private csService: CopingStrategiesService,
    private wsService: WarningSignsService,
    private ptgService: PlaceService,
    private updatePTGService: UpdatePlaceService,
    private contactService: ContactService,
    private updateContactService: UpdateContactService
    ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.type = this.navParams.get('type');
  }

  edit(){
    if(this.type == 'ws'){
      this.updateWSService.selectWS(this.id);
    }else if(this.type == 'cs'){
      this.updateCSService.selectCopingStrategy(this.id);
    }else if(this.type == 'pc'){
      this.updateContactService.select(this.id)
    }else if(this.type == 'ptg'){
      this.updatePTGService.select(this.id);
    }
    this.popController.dismiss();
  }

  async delete(){
    if(this.type == 'ws'){
      this.wsService.delete(this.id);
    }else if(this.type == 'cs'){
      this.csService.delete(this.id);
    }else if(this.type == 'pc'){
      this.contactService.delete(this.id);
    }else if(this.type == 'ptg'){
      this.ptgService.delete(this.id);
    }
    this.popController.dismiss();
  }
}
