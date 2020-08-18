import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import {CookieService} from "ng2-cookies";
import {myservice} from "../../../views/pages/dashboard/myservice.service";

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

class UserAccount extends User {

}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,private Cookie:CookieService,private myserv:myservice) {
  }

  private admin:User;

  // Authentication/Authorization
  login(email: string, password: string): Observable<User> {
   return this.reteriveToken(email,password)
  }

  getUserByToken(): Observable<User> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.Cookie.get('access_token'));
    return this.http.get<User>(API_USERS_URL, {headers: httpHeaders});
  }

  register(user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
   // let userAccount = user;
  let admin = {
     "userAccount":{
      "email":user.email,
        "password":user.password,
        "enabled":true,
        "username":user.username
    }}
    console.log(admin);
    return this.http.post<User>('http://localhost:8086/api/admin', admin, {headers: httpHeaders})
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }


  reteriveToken(username,password){
    let admin: User = new User();
    let role="";
    this.http.post<any>('http://localhost:8080/authenticate', {
      "password":password,
      "username":username,
      "email":"ymengit2u@outlook.com"
    }).subscribe(
      userInfo => {
        if(userInfo.token!=null||userInfo.token!="") {
          admin.email = userInfo.userAccount.email;
          admin.accessToken = userInfo.token;
          admin.fullname = userInfo.userAccount.fisrstName + " " + userInfo.userAccount.lastName;
          admin.address = null;
          admin.companyName = "Top Shop";
          admin.occupation = null;
          admin.id = userInfo.userAccount.id;
          admin.pic = null;
          admin._userId = userInfo.userAccount._userId;
          admin.roles = [2]
          role = userInfo.userAccount.role;
          var expireDate = new Date().getTime() + 1000 * 50000;
          if(userInfo.userAccount.role=="ADMIN"){
            this.Cookie.deleteAll();
            this.Cookie.set("role","ADMIN",expireDate)
            this.Cookie.set("access_token",userInfo.token,expireDate);
            this.Cookie.set("user_id",userInfo.userAccount.id,expireDate);
            this.myserv.userid=userInfo.userAccount.id;
            this.myserv.role=userInfo.userAccount.role;
            return of(admin)
          }
          else if(userInfo.userAccount.role=="VENDOR"){
            console.log("Hi from vendor");
            this.Cookie.set("role","VENDOR")
            this.Cookie.set("access_token",userInfo.token);
            this.Cookie.set("user_id",userInfo.userAccount.id);
            this.myserv.userid=userInfo.userAccount.id;
            this.myserv.role=userInfo.userAccount.role;
            return of(admin)
          }
          else {admin = null; return null}
        }

      },
      err => {
        return null;
      }
    )
    return of(admin);
  }

 private retrive(userInfo: any) {

  }


  /*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/${userId}`);
  }


  // DELETE => delete the user from the server
  deleteUser(userId: number) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  // UPDATE => PUT: update the user on the server
  // tslint:disable-next-line
  updateUser(_user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, _user, {headers: httpHeaders});
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, {headers: httpHeaders});
  }

  // Permission
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL);
  }

  getRolePermissions(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
  }

  // Roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(API_ROLES_URL);
  }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
  }

  // CREATE =>  POST: add a new role to the server
  createRole(role: Role): Observable<Role> {
    // Note: Add headers if needed (tokens/bearer)
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Role>(API_ROLES_URL, role, {headers: httpHeaders});
  }

  // UPDATE => PUT: update the role on the server
  updateRole(role: Role): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_ROLES_URL, role, {headers: httpHeaders});
  }

  // DELETE => delete the role from the server
  deleteRole(roleId: number): Observable<Role> {
    const url = `${API_ROLES_URL}/${roleId}`;
    return this.http.delete<Role>(url);
  }

  // Check Role Before deletion
  isRoleAssignedToUsers(roleId: number): Observable<boolean> {
    return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
  }

  findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, {headers: httpHeaders});
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
    *
  * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
