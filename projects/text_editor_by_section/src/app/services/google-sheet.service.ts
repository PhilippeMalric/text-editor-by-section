import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  constructor(private http: HttpClient) { }


  public getCooker(): Observable<any> {
    const sheetno="od6"
         const sheetid = "12Q2lBIOitufm6Q9clFB0wrZ08-Xun0jW-RV_Jam9O00"
         const url = 
    `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
        
            return this.http.get(url)
              .pipe(
                map((res: any) => {
                  const data = res.feed.entry;
        
                  const returnArray: Array<any> = [];
                  if (data && data.length > 0) {
                    data.forEach(entry => {
                      const obj = {};
                      for (const x in entry) {
                        if (x.includes('gsx$') && entry[x].$t) {
                          obj[x.split('$')[1]] = entry[x]['$t'];
                        }
                      }
                      returnArray.push(obj);
                    });
                  }
                  return returnArray;
                })
              );
          }


          public getSheet(): Observable<any> {
            const sheetno="od6"
                 const sheetid = "12Q2lBIOitufm6Q9clFB0wrZ08-Xun0jW-RV_Jam9O00"
                 const url = 
            `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
                
                    return this.http.get(url)
                      .pipe(
                        map((res: any) => {
                          const data = res.feed.entry;
                
                          const returnArray: Array<any> = [];
                          if (data && data.length > 0) {
                            data.forEach(entry => {
                              const obj = {};
                              for (const x in entry) {
                                console.log(entry)
                                if (x.includes('gsx$') && entry[x].$t) {
                                  obj[x.split('$')[1]] = entry[x]['$t'];
                                }
                              }
                              returnArray.push(obj);
                            });
                          }
                          return returnArray;
                        })
                      );
                  }

}

//sheet
//https://spreadsheets.google.com/feeds/worksheets/12Q2lBIOitufm6Q9clFB0wrZ08-Xun0jW-RV_Jam9O00/private/full
//o5ebpca

//search :
//link rel