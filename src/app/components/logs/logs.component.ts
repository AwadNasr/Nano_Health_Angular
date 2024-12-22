import { AddLogsComponent } from '../add-logs/add-logs.component';
import { LogsService } from './../../services/logs.service';
import { Component,inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  readonly dialog = inject(MatDialog);
constructor(private LogsService:LogsService){}
logs:any={total:0,data:[]};
ngOnInit(): void {
  this.getLogs()

}
getLogs() {
  this.LogsService.getLogs().subscribe({
    next: (res) => {
      this.logs=res;
    },
  });
}
p:any= 1;
windowWidth: number = 0;
addItem(): void {
  const dialogRef = this.dialog.open(AddLogsComponent, {
    width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
    height:'50vh'
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getLogs();
  });
}
}

