import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GlobalPipesModule } from "../global-pipes/global-pipes.module";
import { EmptyStateModalPage } from "./empty-state-modal/empty-state-modal.page";
import { ResourceDetailModalComponent } from "./resource-detail-modal/resource-detail-modal.component";
import { ResourceModalPage } from "./resource-modal/resource-modal.page";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AgmCoreModule,
        GlobalPipesModule
    ],
    declarations: [ResourceModalPage, EmptyStateModalPage, ResourceDetailModalComponent],
    exports: [ResourceModalPage, EmptyStateModalPage, ResourceDetailModalComponent]
})
export class ModalModule {}
