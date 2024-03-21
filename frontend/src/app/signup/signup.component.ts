import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { matchPassword } from '../matchpassword.validator';
import { ProvinceService } from '../shared/province.service';
import { Province } from '../shared/province.model';
import { AmphurService } from '../shared/amphur.service';
import { Amphur } from '../shared/amphur.model';
import { TambonService } from '../shared/tambon.service';
import { Tambon } from '../shared/tambon.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  registerForm:any;
  originalPassword:string;
  provinces: Province[];
  amphures: Amphur[];
  tambons: Tambon[];

  constructor(private formBuilder: FormBuilder
    , private ProvinceService: ProvinceService
    , private AmphurService: AmphurService
    , private TambonService: TambonService
  )
  {
    this.provinces = [];
    this.amphures = [];
    this.tambons = [];
  }

  ngOnInit(){
      this.getProvince();
      this.getAmphur();

      this.registerForm = this.formBuilder.group({
        email:['', [Validators.required, Validators.email, ]],
        password: ['', [Validators.required, Validators.minLength(6)] ],
        confirmPassword: ['', Validators.required ],
        firstName: ['', Validators.required ],
        lastName: ['', Validators.required ],
        postcode: ['', Validators.required ],
        province: ['', Validators.required ],
        district: ['', Validators.required ],
        subdistrict: ['', Validators.required ],
        }, { validators: matchPassword });

      
  }

  getFromZip(event: any) {
    let zipcode = event.target.value;

    if (zipcode.length == 5)
    {
      let provinceCode = zipcode.substring(0, 2);

      this.getProvince(provinceCode);
      this.getAmphur(provinceCode);
      this.getTambon(zipcode);

      setTimeout(() => {
        let selected_province = this.provinces[0];
        this.registerForm.controls['province'].patchValue(selected_province);
      }, 500);
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {

        this.registerForm.markAllAsTouched();

        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  getProvince(code=null) {
    this.ProvinceService.getProvince(code).subscribe(res => {
      this.provinces = res as Province[];
    });
  }

  getAmphur(province_id=null) {
    this.AmphurService.getAmphur(province_id).subscribe(res => {
      this.amphures = res as Amphur[];
    });
  }

  getTambon(code=null) {
    this.TambonService.getTambon(code).subscribe(res => {
      this.tambons = res as Tambon[];
    });
  }

}
