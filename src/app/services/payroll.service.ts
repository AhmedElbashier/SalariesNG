import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

export interface PayRoll {
  id: any;
  empName: any;
  empId: any;
  year: any;
  month: any;
  degreeRoller: any;
  primarySalary: any;
  firstInsurance: any;
  lastInsurance: any;
  stampBase: any;
  theBaseSubjectTax: any;
  personalTax:any;
  netBaseSalary:any;
  variableTax:any;
  taxOnVariableAllowanceResult: any;
  stampSign: any;
  netBaseVariableAllowance:any;
  finalNetSalary:any;
  finalNetSalaryBeforeDiscount:any;
  finalSalaryDeduction:any;
  finalSalaryAfterDeduction:any;
  taxTotal:any;
  employeeCost:any;
  startingSalary:any;
  livingExpense:any;
  housingExpense:any;
  deportationExpense:any;
  empType:any;
  valid:any;
  bookAndResearch:any;
  discountsTotal:any;
  absenceLastValue:any;
  firstTableTotal:any
  secondTableTotal:any
  allowance1:any;
  allowance2:any;
  allowance3:any;
  allowance4:any;
  allowance5:any;
  allowanceV1:any;
  allowanceV2:any;
  allowanceV3:any;
  allowanceV4:any;
  allowanceV5:any;
  taxAbsenceLastValue:any;
  discountsSecondTotal:any;
  lastAllTotalRoll:any;
}
@Injectable({
  providedIn: 'root'
})
export class PayRollService {
  data: any;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private msg: MessageService,
  ) { }

  getPayRolls(type: any = null): Promise<any[]> {
    return this.http.get<any>(this.common.PayRollUrl).toPromise();
  }
  getPayRoll(PayRollId: any = null): Observable<PayRoll> {
    return this.http.get<PayRoll>(this.common.PayRollUrl+"/"+PayRollId);
  }
  getPayRollPromise(empId: any = null,month: any = null,year: any = null): Promise<any> {
    return this.http.get<any>(this.common.PayRollByIdAndMonthUrl+"/"+empId+"/"+month+"/"+year).toPromise();
  }
  // getPayRollsByTt(PayRollloyeeTt: any = null): Observable<any[]> {
  //   return this.http.get<PayRoll[]>(this.common.PayRollByTtUrl + "/"+ PayRollloyeeTt);
  // }
  addPayRoll(PayRoll: any): Observable<any> {
    return this.http.post<any>(this.common.PayRollUrl, PayRoll);
  }
  deletePayRoll(id: any): Promise<any> {
    return this.http.delete<any>(this.common.PayRollUrl + "/" + id).toPromise();
  }
  deletePayRolls(type: any = null): Observable<PayRoll[]> {
    return this.http.get<PayRoll[]>(this.common.PayRollUrl);
  }
  editPayRoll(PayRoll: any): Promise<any> {
    return this.http.put<any>(this.common.PayRollUrl + "/" + PayRoll.id, PayRoll).toPromise();
  }
}
