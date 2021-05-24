import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GlobalPipesModule } from "../global-pipes/global-pipes.module";
import { EmptyStateModalPage } from "./empty-state-modal/empty-state-modal.page";
import { ProfileModalComponent } from "./profile-modal/profile-modal.component";
import { ResourceDetailModalComponent } from "./resource-detail-modal/resource-detail-modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AgmCoreModule,
        GlobalPipesModule
    ],
    declarations: [EmptyStateModalPage, ResourceDetailModalComponent, ProfileModalComponent],
    exports: [EmptyStateModalPage, ResourceDetailModalComponent, ProfileModalComponent]
})
export class ModalModule {}
