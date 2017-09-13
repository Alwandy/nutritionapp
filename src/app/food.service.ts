
import { Food } from './models/food';
import { Injectable }    from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class FoodService {
  private foodApiUrl = 'https://api.nal.usda.gov/ndb/';  // URL to web api
  private apiKey = 'kxaOo4RE6oXGl9j18PLUE69o0nldNMZPXBHHYsZU'; // API Key 
  constructor(private http: Http) { }
  
  //Search pattern
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => this.searchEntries(term));
  }

  // Gets a sample of food list in case user does not want to search.
  public getFoodList():Promise<any>{
    return this.http.get(this.foodApiUrl+'list?format=json&lt=f&sort=n&api_key='+this.apiKey)
    .map((res:any) => res.json())
    .toPromise()
    .catch(this.handleError);
 }

// Search the database 
public searchEntries(term):Observable<any>{
  return this.http.get(this.foodApiUrl+'search/?format=json&q='+term+'&sort=n&max=25&offset=0&api_key=' + this.apiKey)
  .map((res:any) => res.json())
  .catch(this.handleError);
}

//Gets selected food from NDB
public getFood(input):Promise<any>{
  return this.http.get(this.foodApiUrl+'/V2/reports?ndbno='+input+'&type=f&format=json&api_key='+this.apiKey)
  .map((res:any) => res.json())
  .toPromise()
  .catch(this.handleError);
}


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // Prints error
  return Promise.reject(error.message || error);
}

}
