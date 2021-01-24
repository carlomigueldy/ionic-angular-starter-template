import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AvatarComponent } from "@app/components/ui/avatar/avatar.component";
import { SideMenuHeaderComponent } from "@app/components/ui/side-menu-header/side-menu-header.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarComponent,
    SideMenuHeaderComponent,
  ],

  /** App Components */
  declarations: [AvatarComponent, SideMenuHeaderComponent],
})
export class SharedModule {}
