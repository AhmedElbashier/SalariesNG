import { CommonService } from "../services/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";

export interface User {
  id?: any;
  name?: any;
  username?: any;
  password?: any;
  role?: any;
}
@Injectable({
  providedIn: "root"
})

export class UserService {
  data: any;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private msg: MessageService,
  ) { }

  getUsers(type: any = null): Observable<any[]> {
    return this.http.get<User[]>(this.common.UserUrl);
  }
  getUser(username: any = null): Observable<any> {
    return this.http.get<User>(this.common.UserByNameUrl+"/"+username);
  }
  addUser(user: any): Promise<any> {
    return this.http.post<any>(this.common.UserUrl, user).toPromise();
  }
  deleteUser(id: any): Promise<any> {
    return this.http.delete<any>(this.common.UserUrl + "/" + id).toPromise();
  }

  deleteUsers(type: any = null): Observable<User[]> {
    return this.http.get<User[]>(this.common.UserUrl);
  }
  editUser(user: any): Promise<any> {
    return this.http.put<any>(this.common.UserUrl + "/" + user.id, user).toPromise();
  }
}