import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html'
})
export class PropertyListComponent implements OnInit {
    properties: Array<any> = [];
    errorMessage: any;
  currentId = 0;
  serarchText = '';

  constructor(private _propertyService: PropertyService,
			private _router: Router,
			private _activatedRoute: ActivatedRoute) { }



    getProperties() {
        this._propertyService.getProperties().subscribe(
            data => this.properties = data,
            error => this.errorMessage = error
        );
    }
    // call this function in ngOnInit to call on page loading
    ngOnInit() {
      if (this._activatedRoute.snapshot.params['id']) {
        this.currentId = parseInt(this._activatedRoute.snapshot.params['id']);
      }
      this.getProperties();
    }

  add() {
    this._router.navigate(['properties/add']);
  }
  edit(id) {
    this._router.navigate(['properties/edit/' + id]);
  }
  delete(id) {
    var ans = confirm("Do you want to delete property with Id: " + id);
    if(ans){
      this._propertyService.deleteProperty(id)
          .subscribe(  data=> {
            var index = this.properties.findIndex(x=>x.id == id);
            this.properties.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }

}
