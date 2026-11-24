import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  endPoint: string = 'https://6b05b68bdb01cf463608f97e.mockapi.io';
  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<any> {
    return this.http.get(`${this.endPoint}/tasks`);
  }

  getTaskByFilter(searchTerm: string, search: 'title' | 'status' | 'priority'): Observable<any> {
    return this.http.get(`${this.endPoint}/tasks?${search}=${searchTerm}`);
  }

  createTask(task: Omit<any, 'id'>): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/tasks`, task);
  }

  updateTask(id: any, task: Omit<any, 'id'>): Observable<any> {
    return this.http.put<any>(`${this.endPoint}/tasks/${id}`, task);
  }

  updateTaskStatus(id: any, data: Pick<any, 'status'>): Observable<any> {
    return this.http.put<any>(`${this.endPoint}/tasks/${id}`, data);
  }

  deleteTask(id: any): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/tasks/${id}`);
  }

}
