import { PayRoll } from 'src/app/services/payroll.service';
import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

export interface PerformanceIncentive {
  id?: any;
  name?: any;
  value?:any;
}
export interface InternalExperience {
  id?: any;
  name?: any;
  value?:any;
}
export interface DegreeRoller {
  id?: any;
  name?: any;
  value?:any;
  primarySalary?:any;
  exp?:any;
  empType?:any;

}
export interface FirstSocialTaxOnVariableAllowance {
  id?: any;
  name?: any;
  value?:any;
}
export interface LastSocialTaxOnVariableAllowance {
  id?: any;
  name?: any;
  value?:any;
}
export interface PersonalIncomeTax {
  id?: any;
  name?: any;
  value?:any;
}

export interface TaxOnVariableAllowances {
  id?: any;
  name?: any;
  value?:any;
}
export interface StampBase {
  id?: any;
  name?: any;
  value?:any;
}
export interface StampSign {
  id?: any;
  name?: any;
  value?:any;
}

export interface BooksAndResearch {
  id?: any;
  name?: any;
  value?:any;
}

export interface Package {
  id?: any;
  name?: any;
  program?: any;
  sylbus?: any;
  semester?: any;
  period?: any;
  firstMonth?: any;
  secondMonth?: any;
  thirdMonth?: any;
  firstMonthPayRoll?: any;
  secondMonthPayRoll?: any;
  thirdMonthPayRoll?: any;
  amount?: any;
}
export interface PackagePayRoll {
  id?: any;
  packageId?: any;
  name?: any;
  program?: any;
  sylbus?: any;
  semester?: any;
  period?: any;
  firstMonth?: any;
  secondMonth?: any;
  thirdMonth?: any;
  firstMonthPayRoll?: any;
  secondMonthPayRoll?: any;
  thirdMonthPayRoll?: any;
  amount?: any;
  payRollMonth?:any;
  payRollYear?:any;
  left?:any;
  user?:any;
}
export interface Training {
  id?: any;
  name?: any;
  dept?: any;
  amount?: any;
}
export interface TrainingPayRoll {
  id?: any;
  name?: any;
  dept?: any;
  amount?: any;
  month?: any;
  year?: any;
  user?: any;
}
export interface Department {
  id?: any;
  name?: any;
  type?: any;
}

@Injectable({
  providedIn: 'root'
})


export class SettingsService {

  data: any;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private msg: MessageService,
  ) { }

  /// PerformanceIncentives
  getPerformanceIncentives(type: any = null): Observable<any[]> {
    return this.http.get<PerformanceIncentive[]>(this.common.PerformanceIncentiveUrl);
  }
  addPerformanceIncentive(PerformanceIncentive: any): Promise<any> {
    return this.http.post<any>(this.common.PerformanceIncentiveUrl, PerformanceIncentive).toPromise();
  }
  deletePerformanceIncentive(id: any): Promise<any> {
    return this.http.delete<any>(this.common.PerformanceIncentiveUrl + "/" + id).toPromise();
  }

  deletePerformanceIncentives(type: any = null): Observable<PerformanceIncentive[]> {
    return this.http.get<PerformanceIncentive[]>(this.common.PerformanceIncentiveUrl);
  }
  editPerformanceIncentive(PerformanceIncentive: any): Promise<any> {
    return this.http.put<any>(this.common.PerformanceIncentiveUrl + "/" + PerformanceIncentive.id, PerformanceIncentive).toPromise();
  }

  ///// InternalExperience
  getInternalExperiences(type: any = null): Observable<any[]> {
    return this.http.get<InternalExperience[]>(this.common.InternalExperienceUrl);
  }
  getInternalExperienceByName(type: any = null): Observable<any> {
    return this.http.get<InternalExperience>(this.common.InternalExperienceByNameUrl+"/"+type);
  }
  getInternalExperienceByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.InternalExperienceByNameUrl+"/"+type).toPromise();
  }
  addInternalExperience(InternalExperience: any): Promise<any> {
    return this.http.post<any>(this.common.InternalExperienceUrl, InternalExperience).toPromise();
  }
  deleteInternalExperience(id: any): Promise<any> {
    return this.http.delete<any>(this.common.InternalExperienceUrl + "/" + id).toPromise();
  }
  editInternalExperience(InternalExperience: any): Promise<any> {
    return this.http.put<any>(this.common.InternalExperienceUrl + "/" + InternalExperience.id, InternalExperience).toPromise();
  }

  ////DegreeRollers

  getDegreeRollers(type: any = null): Observable<any[]> {
    return this.http.get<DegreeRoller[]>(this.common.DegreeRollerUrl);
  }
  getDegreeRollerByNameAndExp(type: any = null,Exp:any = null,EmpType : any = null): Observable<DegreeRoller> {
    return this.http.get<DegreeRoller>(this.common.DegreeRollerByExpUrl+"/"+type+"/"+Exp+"/"+EmpType);
  }
  getDegreeRollerByExpPromise(type: any = null,exp:any=null,EmpType : any = null): Promise<any> {
    return this.http.get(this.common.DegreeRollerByExpUrl+"/"+type+"/"+exp+"/"+EmpType).toPromise();
  }
  addDegreeRoller(DegreeRoller: any): Promise<any> {
    return this.http.post<any>(this.common.DegreeRollerUrl, DegreeRoller).toPromise();
  }
  deleteDegreeRoller(id: any): Promise<any> {
    return this.http.delete<any>(this.common.DegreeRollerUrl + "/" + id).toPromise();
  }
  editDegreeRoller(DegreeRoller: any): Promise<any> {
    return this.http.put<any>(this.common.DegreeRollerUrl + "/" + DegreeRoller.id, DegreeRoller).toPromise();
  }

  /////FirstSocialTaxOnVariableAllowance

  getFirstSocialTaxOnVariableAllowance(type: any = null): Observable<any[]> {
    return this.http.get<FirstSocialTaxOnVariableAllowance[]>(this.common.FirstSocialTaxOnVariableAllowanceUrl);
  }
  getFirstSocialTaxOnVariableAllowanceByName(type: any = null): Observable<any> {
    return this.http.get<FirstSocialTaxOnVariableAllowance>(this.common.FirstSocialTaxOnVariableAllowanceByNameUrl+"/"+type);
  }
  getFirstSocialTaxOnVariableAllowanceByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.FirstSocialTaxOnVariableAllowanceByNameUrl+"/"+type).toPromise();
  }
  addFirstSocialTaxOnVariableAllowance(FirstSocialTaxOnVariableAllowance: any): Promise<any> {
    return this.http.post<any>(this.common.FirstSocialTaxOnVariableAllowanceUrl, FirstSocialTaxOnVariableAllowance).toPromise();
  }
  deleteFirstSocialTaxOnVariableAllowance(id: any): Promise<any> {
    return this.http.delete<any>(this.common.FirstSocialTaxOnVariableAllowanceUrl + "/" + id).toPromise();
  }
  editFirstSocialTaxOnVariableAllowance(FirstSocialTaxOnVariableAllowance: any): Promise<any> {
    return this.http.put<any>(this.common.FirstSocialTaxOnVariableAllowanceUrl + "/" + FirstSocialTaxOnVariableAllowance.id, FirstSocialTaxOnVariableAllowance).toPromise();
  }

  ////LastSocialTaxOnVariableAllowances

  getLastSocialTaxOnVariableAllowances(type: any = null): Observable<any[]> {
    return this.http.get<LastSocialTaxOnVariableAllowance[]>(this.common.LastSocialTaxOnVariableAllowanceUrl);
  }
  getLastSocialTaxOnVariableAllowanceByName(type: any = null): Observable<any> {
    return this.http.get<LastSocialTaxOnVariableAllowance>(this.common.LastSocialTaxOnVariableAllowanceByNameUrl+"/"+type);
  }
  getLastSocialTaxOnVariableAllowanceByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.LastSocialTaxOnVariableAllowanceByNameUrl+"/"+type).toPromise();
  }
  addLastSocialTaxOnVariableAllowance(LastSocialTaxOnVariableAllowance: any): Promise<any> {
    return this.http.post<any>(this.common.LastSocialTaxOnVariableAllowanceUrl, LastSocialTaxOnVariableAllowance).toPromise();
  }
  deleteLastSocialTaxOnVariableAllowance(id: any): Promise<any> {
    return this.http.delete<any>(this.common.LastSocialTaxOnVariableAllowanceUrl + "/" + id).toPromise();
  }
  editLastSocialTaxOnVariableAllowance(LastSocialTaxOnVariableAllowance: any): Promise<any> {
    return this.http.put<any>(this.common.LastSocialTaxOnVariableAllowanceUrl + "/" + LastSocialTaxOnVariableAllowance.id, LastSocialTaxOnVariableAllowance).toPromise();
  }

  ////PersonalIncomeTax

  getPersonalIncomeTaxs(type: any = null): Observable<any[]> {
    return this.http.get<PersonalIncomeTax[]>(this.common.PersonalIncomeTaxUrl);
  }
  addPersonalIncomeTax(PersonalIncomeTax: any): Promise<any> {
    return this.http.post<any>(this.common.PersonalIncomeTaxUrl, PersonalIncomeTax).toPromise();
  }
  deletePersonalIncomeTax(id: any): Promise<any> {
    return this.http.delete<any>(this.common.PersonalIncomeTaxUrl + "/" + id).toPromise();
  }
  editPersonalIncomeTax(PersonalIncomeTax: any): Promise<any> {
    return this.http.put<any>(this.common.PersonalIncomeTaxUrl + "/" + PersonalIncomeTax.id, PersonalIncomeTax).toPromise();
  }

  ////TaxOnVariableAllowance

  getTaxOnVariableAllowances(type: any = null): Observable<any[]> {
    return this.http.get<PersonalIncomeTax[]>(this.common.TaxOnVariableAllowanceUrl);
  }
  getTaxOnVariableAllowanceByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.TaxOnVariableAllowanceByNameUrl+"/"+type).toPromise();
  }
  addTaxOnVariableAllowance(TaxOnVariableAllowance: any): Promise<any> {
    return this.http.post<any>(this.common.TaxOnVariableAllowanceUrl, TaxOnVariableAllowance).toPromise();
  }
  deleteTaxOnVariableAllowance(id: any): Promise<any> {
    return this.http.delete<any>(this.common.TaxOnVariableAllowanceUrl + "/" + id).toPromise();
  }
  editTaxOnVariableAllowance(TaxOnVariableAllowance: any): Promise<any> {
    return this.http.put<any>(this.common.TaxOnVariableAllowanceUrl + "/" + TaxOnVariableAllowance.id, TaxOnVariableAllowance).toPromise();
  }

  //////////

  getStampBases(type: any = null): Observable<any[]> {
    return this.http.get<StampBase[]>(this.common.StampBaseUrl);
  }
  getStampBaseByName(type: any = null): Observable<any> {
    return this.http.get<StampBase>(this.common.StampBaseByNameUrl+"/"+type);
  }
  getStampBaseByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.StampBaseByNameUrl+"/"+type).toPromise();
  }
  addStampBase(StampBase: any): Promise<any> {
    return this.http.post<any>(this.common.StampBaseUrl, StampBase).toPromise();
  }
  deleteStampBase(id: any): Promise<any> {
    return this.http.delete<any>(this.common.StampBaseUrl + "/" + id).toPromise();
  }
  editStampBase(StampBase: any): Promise<any> {
    return this.http.put<any>(this.common.StampBaseUrl + "/" + StampBase.id, StampBase).toPromise();
  }

  //////////

  getStampSigns(type: any = null): Observable<any[]> {
    return this.http.get<StampSign[]>(this.common.StampSignUrl);
  }
  getStampSignByName(type: any = null): Observable<any> {
    return this.http.get<StampSign>(this.common.StampSignByNameUrl+"/"+type);
  }
  getStampSignByNamePromise(type: any = null): Promise<any> {
    return this.http.get<any>(this.common.StampSignByNameUrl+"/"+type).toPromise();
  }
  addStampSign(StampSign: any): Promise<any> {
    return this.http.post<any>(this.common.StampSignUrl, StampSign).toPromise();
  }
  deleteStampSign(id: any): Promise<any> {
    return this.http.delete<any>(this.common.StampSignUrl + "/" + id).toPromise();
  }
  editStampSign(StampSign: any): Promise<any> {
    return this.http.put<any>(this.common.StampSignUrl + "/" + StampSign.id, StampSign).toPromise();
  }

  //////////

  getBooksAndResearchs(type: any = null): Observable<any[]> {
    return this.http.get<StampBase[]>(this.common.BooksAndResearchUrl);
  }
  addBooksAndResearch(BooksAndResearch: any): Promise<any> {
    return this.http.post<any>(this.common.BooksAndResearchUrl, BooksAndResearch).toPromise();
  }
  deleteBooksAndResearch(id: any): Promise<any> {
    return this.http.delete<any>(this.common.BooksAndResearchUrl + "/" + id).toPromise();
  }
  editBooksAndResearch(BooksAndResearch: any): Promise<any> {
    return this.http.put<any>(this.common.BooksAndResearchUrl + "/" + BooksAndResearch.id, BooksAndResearch).toPromise();
  }
////// Packages
  getPackages(type: any = null): Observable<any[]> {
    return this.http.get<StampBase[]>(this.common.PackageUrl);
  }
  addPackage(Package: any): Promise<any> {
    return this.http.post<any>(this.common.PackageUrl, Package).toPromise();
  }
  deletePackage(id: any): Promise<any> {
    return this.http.delete<any>(this.common.PackageUrl + "/" + id).toPromise();
  }
  editPackage(Package: any): Promise<any> {
    return this.http.put<any>(this.common.PackageUrl + "/" + Package.id, Package).toPromise();
  }
  //////// PackagePayRoll
  getPackagePayRolls(type: any = null): Observable<any[]> {
    return this.http.get<StampBase[]>(this.common.PackageUrl);
  }
  getPackagePayRollById([PackageId]: any = null,PayRollMonth: any = null): Promise<any> {
    return this.http.get<any>(this.common.PackagePayRolByIdUrl+"/"+PackageId+'/'+PayRollMonth).toPromise();
  }

  addPackagePayRoll(Package: any): Promise<any> {
    return this.http.post<any>(this.common.PackagePayRoll, Package).toPromise();
  }

  deletePackagePayRoll(id: any): Promise<any> {
    return this.http.delete<any>(this.common.PackagePayRoll + "/" + id).toPromise();
  }
  editPackagePayRoll(Package: any): Promise<any> {
    return this.http.put<any>(this.common.PackagePayRoll + "/" + Package.id, Package).toPromise();
  }

  //////// Training
  getTrainings(type: any = null): Observable<any[]> {
    return this.http.get<Training[]>(this.common.TrainingUrl);
  }
  async getTrainingById(id: any = null): Promise<any> {
    return this.http.get<any>(this.common.TrainingByIdUrl+"/"+id).toPromise();
  }

  addTraining(Training: any): Promise<any> {
    return this.http.post<any>(this.common.TrainingUrl, Training).toPromise();
  }
  deleteTraining(id: any): Promise<any> {
    return this.http.delete<any>(this.common.TrainingUrl + "/" + id).toPromise();
  }
  editTraining(Training: any): Promise<any> {
    return this.http.put<any>(this.common.TrainingUrl + "/" + Training.id, Training).toPromise();
  }

  ///////Training PayRoll

  getTrainingPayRolls(type: any = null): Observable<any[]> {
    return this.http.get<any>(this.common.TrainingPayRolUrl);
  }
  async getTrainingPayRollss(id: any = null): Promise<any> {
    return this.http.get<TrainingPayRoll[]>(this.common.TrainingPayRolUrl+"/"+id);
  }
 getTrainingPayRollById(id: any = null,month: any = null): Promise<any> {
    return this.http.get<any>(this.common.TrainingPayRolByIdUrl+"/"+id+'/'+month).toPromise();
  }

  addTrainingPayRoll(TrainingPayRoll: any): Promise<any> {
    return this.http.post<any>(this.common.TrainingPayRolUrl, TrainingPayRoll).toPromise();
  }
  deleteTrainingPayRoll(id: any): Promise<any> {
    return this.http.delete<any>(this.common.TrainingPayRolUrl + "/" + id).toPromise();
  }
  editTrainingPayRoll(TrainingPayRoll: any): Promise<any> {
    return this.http.put<any>(this.common.TrainingPayRolUrl + "/" + TrainingPayRoll.id, TrainingPayRoll).toPromise();
  }


  /////// Department
  getDepartments(type: any = null): Observable<any[]> {
    return this.http.get<Department[]>(this.common.DepartmentUrl);
  }
  getDepartmentsByName(type: any = null): Observable<any[]> {
    return this.http.get<Department[]>(this.common.DepartmentByTypeUrl+"/"+type);
  }
  addDepartment(Department: any): Promise<any> {
    return this.http.post<any>(this.common.DepartmentUrl, Department).toPromise();
  }
  deleteDepartment(id: any): Promise<any> {
    return this.http.delete<any>(this.common.DepartmentUrl + "/" + id).toPromise();
  }
  editDepartment(Department: any): Promise<any> {
    return this.http.put<any>(this.common.DepartmentUrl + "/" + Department.id, Department).toPromise();
  }

}
