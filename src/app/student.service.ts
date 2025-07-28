import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Student {
  id: number;
  name: string;
  gender: string;
  age: number;
  dob: string;
  qualification: string;
}
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:44316/api/Student';

  constructor(private http:HttpClient) { }
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
    
  }

  createstudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }
  
  updateStudent(student: Student): Observable<Student> {
  return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
}
// getPdfBlob(): Observable<Blob> {
//   return this.http.post('https://localhost:44316/api/your-controller/generate', {}, { responseType: 'blob' });
// }

getPdfBlob(): Observable<Blob> {
  return this.http.get('https://localhost:44316/api/Student/school-info', {
    responseType: 'blob'
  });
}

}
