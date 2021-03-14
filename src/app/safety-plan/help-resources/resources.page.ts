import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResourceModalPage } from './resource-modal/resource-modal.page';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  public RESOURCES = [
    {
      id: 1,
      title: "Local Authorities",
      description: "If you are in immediate danger, please call 911 or your local emergency department.",
      phone: {
        number: 911,
        hours: "24/7"
      },
      sms: {
        number: undefined,
        hours: ""
      },
      live_chat: false,
      img_url: "../../../assets/logos/local_authorities.png",
      url: undefined
    },
    {
      id: 2,
      title: "Crisis Services Canada",
      description: "Crisis Services Canada (CSC) is a national network of existing distress, crisis and suicide prevention line services committed to supporting any person living in Canada who is affected by suicide, in the most caring and least intrusive manner possible. If you’re thinking about suicide, are worried about a friend or loved one, the Canada Suicide Prevention Service is available",
      phone: {
        number: 18334564566,
        hours: "24/7"
      },
      sms: {
        number: 45645,
        hours: "4pm-Midnight"
      },
      live_chat: false,
      img_url: "../../../assets/logos/crisis_services_canada.jpg",
      url: "https://www.crisisservicescanada.ca"
    },
    {
      id: 3,
      title: "LGBTYouthline",
      description: "Youth Line offers confidential and non-judgemental, & informed LGBTTQQ2SI peer support through our telephone, text and chat services. (Ontario Only)",
      phone: {
        number: undefined,
        hours: ""
      },
      sms: {
        number: 6476944275,
        hours: "Sunday - Friday 4PM - 9:30PM",
      },
      live_chat: false,
      img_url: "../../../assets/logos/lgbt_youthline.png",
      url: "https://www.youthline.ca/"
    },
    {
      id: 4,
      title: "Hope For Wellness",
      description: "The Hope for Wellness Help Line offers immediate help to all Indigenous peoples across Canada. It is available 24/7 to offer counselling and crisis intervention.",
      phone: {
        number: 18552423310,
        hours: "24/7"
      },
      sms: {
        number: undefined,
        hours: "24/7"
      },
      live_chat: true,
      img_url: "../../../assets/logos/hope_for_wellness.jpg",
      url: "https://www.hopeforwellness.ca/"
    },
    {
      id: 5,
      title: "Kids Help Phone",
      description: "Kids Help Phone is Canada’s only 24/7, national support service. We offer professional counselling, information and referrals and volunteer-led, text-based support to young people in both English and French.",
      phone: {
        number: 18006686868,
        hours: "24/7"
      },
      sms: {
        number: 686868,
        hours: "24/7"
      },
      live_chat: true,
      img_url: "../../../assets/logos/kids_help_phone.jpg",
      url: "https://kidshelpphone.ca"
    },
    {
      id: 6,
      title: "Translifeline",
      description: "Trans Lifeline’s Hotline is a peer support phone service run by trans people for our trans and questioning peers. We believe that some of the best support that trans people can receive is from trans community members with shared lived experience. Call us if you need someone trans to talk to, even if you’re not in crisis or if you’re not sure you’re trans.",
      phone: {
        number: 8773306366,
        hours: "10AM - 5AM EST"
      },
      sms: {
        number: undefined,
        hours: ""
      },
      live_chat: false,
      img_url: "../../../assets/logos/translifeline.png",
      url: "https://translifeline.org/hotline"
    },
    {
      id: 7,
      title: "Crisis Text Line (by Kids Help Phone)",
      description: "Every texter is connected with a Crisis Responder, a real-life human being trained to bring texters from a hot moment to a cool calm through active listening and collaborative problem-solving. All of our Crisis Responders are volunteers, donating their time to helping people in crisis. Crisis Text Line powered by Kids Help Phone is free, 24/7 support for those in crisis, connecting people in crisis to trained Crisis Responders.",
      phone: {
        number: undefined,
        hours: ""
      },
      sms: {
        number: 686868,
        hours: "24/7 (Text HOME)",
      },
      live_chat: false,
      img_url: "../../../assets/logos/kids_help_phone.jpg",
      url: "https://www.crisistextline.ca/"
    },
    {
      id: 8,
      title: "Youthspace",
      description: "Youthspace.ca is an online crisis & emotional support chat. We listen without judgement, and keep chats confidential & anonymous.",
      phone: {
        number: undefined,
        hours: ""
      },
      sms: {
        number: 7787830177,
        hours: "9pm-3AM EST",
      },
      live_chat: true,
      img_url: "../../../assets/logos/youthspace.png",
      url: "https://www.youthspace.ca/"
    }
  ]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async displayInfo(resource_id: number){
    const resource = this.RESOURCES.filter((filtered_resource) => {
      if(filtered_resource.id == resource_id){
        return filtered_resource;
      }
    });

    const modal = await this.modalController.create({
      component: ResourceModalPage,
      componentProps: {
        'resource' : resource
      }
    });
    return await modal.present();
  }

}
