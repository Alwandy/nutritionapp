# FoodApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Idea
Just created this mini app to mess around with Observers and Promise for searching and async list calling. 

API: https://ndb.nal.usda.gov/ndb/doc/index 

## Missing
Links take you nowhere, just need to finish food component and just call the method in service to display nutrition information 

```javascript 
//Gets selected food from NDB
public getFood(input):Promise<any>{
  return this.http.get(this.foodApiUrl+'/V2/reports?ndbno='+input+'&type=f&format=json&api_key='+this.apiKey)
  .map((res:any) => res.json())
  .toPromise()
  .catch(this.handleError);
}

```

