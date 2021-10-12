import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/models';
import { AuthService } from '../core/services/auth/auth.service';
import { ContactService } from '../core/services/contacts/contact.service';
import { CopingStrategiesService } from '../core/services/coping-strategies/coping-strategies.service';
import { PlaceService } from '../core/services/places/place.service';
import { WarningSignsService } from '../core/services/warning-signs/warning-signs.service';

@Component({
  selector: 'app-safety-plan',
  templateUrl: './safety-plan.page.html',
  styleUrls: ['./safety-plan.page.scss'],
})
export class SafetyPlanPage implements OnInit {

  constructor(){};

  ngOnInit(){};

}
