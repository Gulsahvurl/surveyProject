import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Survey } from '../models/Survey.model';
import { Language } from '../models/language.model';

@Injectable()
export class ApiService {


  constructor(private http: Http) {

  }
  getAccessToken() {
    const user: User = {
      EMail: environment.EMail,
      Password: environment.Password
    };
    return this.http.post('https://coresurveymvc.appspot.com/Account/Token', user).toPromise()
      .then((res => {
        const data = res.json();
        return data.Token;
      }));


  }
  getSurveyList() {
    return this.getAccessToken().then(data => {
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + data);
      return this.http.get('https://coresurveymvc.appspot.com/api/Survey', { headers: headers }).toPromise().then(res => {

        return res.json() as Survey[];
      });
    });

  }
  getSurvey() {

  }

  async createSurvey(name) {
    return this.getAccessToken().then(data => {


      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + data);

      return this.http.post('https://coresurveymvc.appspot.com/api/Survey', {
        "Name": name
      }, { headers: headers }).toPromise().then(res => {
        return this.http.get('https://coresurveymvc.appspot.com/api/Survey', { headers: headers }).toPromise().then(response => {

          return response.json() as Survey[];
        });
      });


    });




  }
  deleteSurvey(id) {

    return this.getAccessToken().then(data => {
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + data);

      return this.http.delete('https://coresurveymvc.appspot.com/api/Survey/' + id, { headers: headers }).toPromise().then(re => {


        return this.http.get('https://coresurveymvc.appspot.com/api/Survey', { headers: headers }).toPromise().then(res => {
          return res.json() as Survey[];
        });
      });
    });


  }
  updateSurvey(id, name) {


    return this.getAccessToken().then(data => {
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + data);



      return this.http.put('https://coresurveymvc.appspot.com/api/Survey/' + id, {
        "ID": id,
        "Name": name

      }, { headers: headers }).toPromise().then(re => {

        return this.http.get('https://coresurveymvc.appspot.com/api/Survey', { headers: headers }).toPromise().then(res => {

          return res.json() as Survey[];
        });

      });
    });

  }
  getLanguageTags() {

    return this.http.get('https://coresurveymvc.appspot.com/api/Language').toPromise().then(data => {
      return data.json() as Language[];
    });

  }


}
