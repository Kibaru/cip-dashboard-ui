import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-edit-agent-details',
  templateUrl: './edit-agent-details.component.html',
  styleUrls: ['./edit-agent-details.component.css']
})
export class EditAgentDetailsComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  agent = {
    full_name: '',
    admin_email: '',
    admin_name: '',
    admin_phone_number: '',
    billing_email: '',
    billing_phone_number: '',
    daily_limit: 10
  }
  
  private readonly notifier: NotifierService;
  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService) {
    this.notifier = notifierService;

    this.actionButtons = [
      { text: 'Save ', onAction: () => { return this.updateAgent(); } },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Edit Agent Details";
    this.agent = this.dataStore.selected_agent_data.getValue();

  }

  updateAgent() {
    this.ngxService.start();
      this.api.updateAgent(this.agent)
        .subscribe((data : any) => {
          this.api.getAgents()
            .subscribe((data: any) => {
              this.dataStore.setAgents(data);
              this.ngxService.stop();
              this.notifier.notify('success', 'Agent Edited Successfully!');
              return true;
            });
        });
    return true;

  }

}
