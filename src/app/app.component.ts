import { Food } from './models/food';
import { FoodService } from './food.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent  implements OnInit {
  
    objects: Object;
    results: Object;
    searchTerm$ = new Subject<string>();

    constructor(private foodService: FoodService) { 
      this.foodService.search(this.searchTerm$)
      .subscribe(results => { this.results = results.list.item});
    }
    
    ngOnInit() {
      this.getFoodList()
    }

    getFoodList(){
       this.foodService.getFoodList()
      .then(result => this.objects = result.list.item);
    }

  title = 'Food list';
  
}
