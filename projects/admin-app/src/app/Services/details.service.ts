import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  autoComplete = 'http://172.17.15.94:3000/graphql'
  graphqlApi = 'http://172.17.15.94:3000/graphql'

  constructor(private http: HttpClient) { }

  public getUsers(query: string, params: any): Observable<any> {
    const userName = params.username;
    const password = params.password;

    const variables = {
      userName,
      password
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }
  public getIndustryDropdownData(query: string): Observable<any> {
    const body = { query }
    return this.http.post(this.graphqlApi, body);
  }
  public getPracticesDropdownData(query: string): Observable<any> {
    const body = { query }
    return this.http.post(this.graphqlApi, body);
  }
  public getAccountDropdownData(query: string): Observable<any> {
    const body = { query }
    return this.http.post(this.graphqlApi, body);
  }
  public getStatusDropdownData(query: string): Observable<any> {
    const body = { query }
    return this.http.post(this.graphqlApi, body);
  }
  public getmenuData(query: string): Observable<any> {
    const body = { query }
    return this.http.post(this.graphqlApi, body);
  }
  public postAddNewClientData(params: any, query: string,): Observable<any> {
    const clientName = params.clientName
    const industryType = params.industryType
    const practiceName = params.practiceName
    const requirement = params.requirement
    const date = params.date
    const conversation = params.conversation
    const pointOfContact = params.pointOfContact
    const submittedBy = params.submittedBy
    const role = params.role
    const reportsTo = params.reportsTo
    const name = params.name

    const inputData = {
      clientName,
      industryType,
      practiceName,
      requirement,
      date,
      conversation,
      pointOfContact,
      submittedBy,
      role,
      reportsTo,
      name
    }
    const variables = {
      input: inputData
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public myActivities(query: string, params: any): Observable<any> {
    const userName = params
    const variables = {
      username: userName
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public projectsTableData(query: any,): Observable<any> {
    return this.http.post(this.graphqlApi, query);
  }

  public myTeamActivities(query: any, params: any): Observable<any> {
    const reportTo = params
    const variables = {
      reportsTo: reportTo
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public postExistingProjectData(params: any, query: string,): Observable<any> {
    const clientName = params.clientName
    const projectName = params.projectName
    const industryType = params.industryType
    const accountType = params.accountType
    const practiceName = params.practiceName
    const technology = params.technology
    const startDate = params.startDate
    const endDate = params.endDate
    const status = params.status
    const description = params.description
    const reportsTo = params.reportsTo
    const role = params.role
    const submittedBy = params.submittedBy
    const name = params.name
    const architecture = params.architecture

    const inputData = {
      clientName,
      projectName,
      industryType,
      accountType,
      practiceName,
      technology,
      startDate,
      endDate,
      status,
      description,
      reportsTo,
      role,
      submittedBy,
      name,
      architecture
    }
    const variables = {
      input: inputData
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public deleteTableRow(query: any, params: any): Observable<any> {
    const projectId = Number(params)
    const variables = {
      projectId: projectId
    };
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public autoCompleteProject(query: any): Observable<any> {
    const body = { query }
    return this.http.post(this.autoComplete, body)
  }

  public editExistingProjectManager(params: any, query: string,): Observable<any> {
    const projectId = params.projectId

    const clientName = params.clientName
    const projectName = params.projectName
    const industryType = params.industryType
    const accountType = params.accountType
    const practiceName = params.practiceName
    const technology = params.technology
    const startDate = params.startDate
    const endDate = params.endDate
    const status = params.status
    const description = params.description
    const reportsTo = params.reportsTo
    const role = params.role
    const submittedBy = params.submittedBy
    const name = params.name
    const architecture = params.architecture
    const inputData = {
      clientName,
      projectName,
      industryType,
      accountType,
      practiceName,
      technology,
      startDate,
      endDate,
      status,
      description,
      reportsTo,
      role,
      submittedBy,
      name,
      architecture
    }
    const variables = {
      projectId,
      input: inputData
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public editSalesTrainee(params: any, query: string): Observable<any> {
    const projectId = params.projectId
    const clientName = params.clientName
    const conversation = params.conversation
    const industryType = params.industryType
    const practiceName = params.practiceName
    const date = params.date
    const reportsTo = params.reportsTo
    const role = params.role
    const submittedBy = params.submittedBy
    const name = params.name
    const requirement = params.requirement
    const pointOfContact = params.pointOfContact
    const inputData = {
      clientName,
      name,
      industryType,
      practiceName,
      submittedBy,
      role,
      reportsTo,
      requirement,
      date,
      conversation,
      pointOfContact,
    }
    const variables = {
      projectId,
      input: inputData
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public managerMyActivites(query: any, params: any): Observable<any> {
    const username = params
    const variables = {
      username: username
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

  public uploadFile(file: File) {
    const formData = new FormData();
    formData.append('Attachments', file);
    return this.http.post(this.graphqlApi, formData);
  }

  public historyTableData(query: any, params: any): Observable<any> {
    const projectId = Number(params)
    const variables = {
      project_Id: projectId
    }
    return this.http.post(this.graphqlApi, { query, variables });
  }

}
