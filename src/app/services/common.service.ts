import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  APIUrl = "http://127.0.0.1:5001/api/v1";
  UserUrl = this.APIUrl + "/User";
  UserByNameUrl = this.APIUrl + "/User/ByName";
  PerformanceIncentiveUrl = this.APIUrl + "/PerformanceIncentive";
  InternalExperienceUrl = this.APIUrl + "/InternalExperience";
  InternalExperienceByNameUrl = this.APIUrl + "/InternalExperience/ByName";
  DegreeRollerUrl = this.APIUrl + "/DegreeRoller";
  DegreeRollerByExpUrl = this.APIUrl + "/DegreeRoller/ByExp";
  FirstSocialTaxOnVariableAllowanceUrl = this.APIUrl + "/FirstSocialInsurance";
  FirstSocialTaxOnVariableAllowanceByNameUrl = this.APIUrl + "/FirstSocialInsurance/ByName";
  LastSocialTaxOnVariableAllowanceByNameUrl = this.APIUrl + "/LastSocialInsurance/ByName";
  LastSocialTaxOnVariableAllowanceUrl = this.APIUrl + "/LastSocialInsurance";
  PersonalIncomeTaxUrl = this.APIUrl + "/PersonalIncomeTax";
  TaxOnVariableAllowanceUrl = this.APIUrl +'/TaxAllowance';
  TaxOnVariableAllowanceByNameUrl = this.APIUrl +'/TaxAllowance/ByName';
  StampBaseUrl = this.APIUrl + "/StampBase";
  StampBaseByNameUrl = this.APIUrl + "/StampBase/ByName";
  StampSignUrl = this.APIUrl + "/StampSign";
  StampSignByNameUrl = this.APIUrl + "/StampSign/ByName";
  BooksAndResearchUrl = this.APIUrl + "/BookAndSearch";
  PackageUrl=this.APIUrl+"/Package";
  PackagePayRoll=this.APIUrl+"/PackagePayRoll";
  PackagePayRolByIdUrl=this.APIUrl+"/PackagePayRoll/ByIdAndMonth";
  PackageByIdUrl=this.APIUrl+"/Package/ById";
  TrainingUrl=this.APIUrl+"/Training";
  TrainingByIdUrl=this.APIUrl+"/Training/ById";
  TrainingPayRolUrl=this.APIUrl+"/TrainingPayRoll";
  TrainingPayRolByIdUrl=this.APIUrl+"/TrainingPayRoll/ByIdAndMonth";
  DepartmentUrl= this.APIUrl+"/Department";
  DepartmentByTypeUrl= this.APIUrl+"/Department/ByType";
  EmpUrl = this.APIUrl+"/Employee";
  EmpByNameUrl = this.APIUrl+"/Employee/ByName";
  EmpByTtUrl = this.APIUrl+"/Employee/ByTt";
  PayRollUrl = this.APIUrl+"/PayRoll";
  PayRollByIdAndMonthUrl = this.APIUrl+"/PayRoll/ByIdAndMonth";
}
