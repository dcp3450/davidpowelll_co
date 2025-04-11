import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { GeneralService } from '../../services/general.service';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dp-hire-form',
  templateUrl: './hire-form.component.html',
  styleUrls: ['./hire-form.component.scss']
})
export class HireFormComponent implements OnInit {
  hireForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    msg: new UntypedFormControl('')
  });
  showMsgInput = false;
  msgAction = '+ add';
  emailError = false;
  faBars = faBars;
  faTimes = faTimes;

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    console.log(this.hireForm.get('email'));
  }

  onSubmit() {
    this.emailError = !this.hireForm.get('email').valid;
    if (this.hireForm.valid) {
      const email = this.hireForm.value.email;
      const msg = this.hireForm.value.msg;

      this.generalService.sendHireMsg(email, msg)
      .subscribe(res => {
        console.log(res);
        this.generalService.setShowHireMeState(false);
      });
    }
  }

  addMsg() {
    this.showMsgInput = !this.showMsgInput;
    this.msgAction = this.msgAction === '+ add' ? '- remove' : '+ add';
  }

  hideShowHireMe() {
    this.generalService.setShowHireMeState(false);
  }

}
