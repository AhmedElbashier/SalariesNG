import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
export interface Emp {
  id?: any;
  name?: any;
  exp?: any;
  internalExp?: any;
  fib?: any;
  bok?: any;
  recuirtDate?: any;
  nationalId?: any;
  type?: any;
  dept?: any;
  tt?: any;
  rate?: any;
  adminAssign?: any;
}
@Injectable({
  providedIn: 'root'
})
export class EmpService {
  data: any;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private msg: MessageService,
  ) { }

  getEmps(type: any = null): Observable<any[]> {
    return this.http.get<any>(this.common.EmpUrl);
  }
  getEmp(EmpId: any = null): Observable<Emp> {
    return this.http.get<Emp>(this.common.EmpUrl+"/"+EmpId);
  }
  getEmpPromise(EmpId: any = null): Promise<any> {
    return this.http.get<any>(this.common.EmpUrl+"/"+EmpId).toPromise();
  }
  getEmpsByTt(EmployeeTt: any = null): Observable<any[]> {
    return this.http.get<Emp[]>(this.common.EmpByTtUrl + "/"+ EmployeeTt);
  }
  addEmp(Emp: any): Promise<any> {
    return this.http.post<any>(this.common.EmpUrl, Emp).toPromise();
  }
  deleteEmp(id: any): Promise<any> {
    return this.http.delete<any>(this.common.EmpUrl + "/" + id).toPromise();
  }

  deleteEmps(type: any = null): Observable<Emp[]> {
    return this.http.get<Emp[]>(this.common.EmpUrl);
  }
  editEmp(Emp: any): Promise<any> {
    return this.http.put<any>(this.common.EmpUrl + "/" + Emp.id, Emp).toPromise();
  }
}
