import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import Swal from 'sweetalert2';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  imageSrc: any;
  productForm:any;

  constructor(private formBuilder: FormBuilder
    ,private http: HttpClient
    ,private ProductService: ProductService)
  {
  }

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      product_name:['', [Validators.required]],
      product_code:['', [Validators.required]],
      price:['', [Validators.required]],
      imageUpload:['', [Validators.required]],
      image: ['']
    })
  }

  onSubmit() {

    if (this.productForm.invalid) {

        this.productForm.markAllAsTouched();

        return;
    }

    if (this.productForm.valid) {

      if (this.file) {
        const formFile = new FormData();
    
        formFile.append('image_upload', this.file);
        const upload$ = this.http.post("http://localhost:3000/upload", formFile);
    
        this.status = 'uploading';
    
        upload$.subscribe({
          next: (value: any) => {
            this.status = 'success';
            this.productForm.controls['image'].patchValue(value.filename);

            const formData = this.productForm.value;
            
            const jsonObject = this.productForm.getRawValue();
            this.createProduct(jsonObject);

            Swal.fire({
              title: "Saved!",
              icon: "success"
            }).then((result) => {
              window.location.reload();
            });
          },
          error: (error: any) => {
            this.status = 'fail';
            return throwError(() => error);
          },
        });
      }
    }
  }

  createProduct(data: any) {
		this.ProductService.createProduct(data).subscribe(res => {
			
		});
	}

  createThumbnail(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);

      this.status = "initial";
      this.file = file;
    }
  }
}
