import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LogsService } from 'src/app/services/logs.service';
@Component({
  selector: 'app-add-logs',
  templateUrl: './add-logs.component.html',
  styleUrls: ['./add-logs.component.css']
})
export class AddLogsComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
 private dialogRef: MatDialogRef<AddLogsComponent>,private LogsService:LogsService,private fb:FormBuilder,private ToastrService:ToastrService){}
  ngOnInit(){
  this.createForm();
}
createForm() {
    this.form = this.fb.group({
      Service: ['', [Validators.required]],
      Level: ['', [Validators.required]],
      Message: ['', [Validators.required]],
      Timestamp: [null, [Validators.required]],
    });

  this.filter = this.fb.group({
    filterInput: ['']
  })
}
get Service() {
  return this.form.controls['Service'];
}
get Level() {
  return this.form.controls['Level'];
}
get Message() {
  return this.form.controls['Message'];
}
get Timestamp() {
  return this.form.controls['Timestamp'];
}
 submit() {
 if(this.form.valid) {
  const formData = new FormData();
  formData.append('Service', this.form.value.Service);
  formData.append('Level', this.form.value.Level);
  formData.append('Message', this.form.value.Message);
  formData.append('Timestamp', this.form.value.Timestamp);


      this.LogsService.register(formData).subscribe(res => {
        if (res.statusCode == '200') {
          this.ToastrService.success('Log Added Successfully');
          this.closeDialog();
        } else {
          this.ToastrService.error(res.message);
        }
      })

  }
  else {
    console.log(this.form);
    this.ToastrService.error("افحص كل المطلوب");
  }
}
closeDialog(): void {
  this.dialogRef.close();
}
}
