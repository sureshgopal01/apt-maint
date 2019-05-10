  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { PropertyService } from '../../services/property.service';

  @Component({
    selector: 'app-property',
    templateUrl: './property.component.html'
  })
  export class PropertyComponent implements OnInit {
    propertyForm: FormGroup;
    title = 'Add';
    id;
    errorMessage: any;
    submitted = false;
    _ref: any;
    property: any;
    constructor(private _fb: FormBuilder,
      private _avRoute: ActivatedRoute,
      private _propertyService: PropertyService,
      private _router: Router) {

      if (this._avRoute.snapshot.params['id']) {
        this.id = parseInt(this._avRoute.snapshot.params['id']);
        console.log(this.id);
        this.title = 'Edit';
      }

      this.propertyForm = this._fb.group({
        propertyId: 0,
        propertyName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        propertyValue : ['', [Validators.required]]
      });
    }

    ngOnInit() {
      if (this.id != null) {
      this._propertyService.getPropertyById(this.id)
          .subscribe(resp => this.propertyForm.setValue(resp)
            , error => this.errorMessage = error);
      }
    }

    save() {
      // debugger;
      if (!this.propertyForm.valid) {
        this.submitted = true;
        return;
      }

      this._propertyService.saveProperty(this.propertyForm.value)
        .subscribe(propertyId => {
          alert('Saved Successfully!');
          this._router.navigate(['properties', { id: propertyId }]);
        }, error => this.errorMessage = error);

    }

    cancel() {
      this._router.navigate(['properties', { id: this.id }]);
    }

    get propertyName() { return this.propertyForm.get('propertyName'); }
    get propertyValue() { return this.propertyForm.get('propertyValue'); }

  }
