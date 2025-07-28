import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { StudentService, Student } from '../../student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentForm: FormGroup;
  students: Student[] = [];

  paginatedStudents: Student[] = [];

  currentPage: number = 1;
  pageSize: number = 5;

  editingIndex: number | null = null;
  editedStudent: Student | null = null;

  constructor(private fb: FormBuilder, private studentservice: StudentService, private toast: ToastrService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      qualification: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentservice.getStudents().subscribe({
      next: (data) => {

        this.students = data;
        this.updatePagination();
        console.log('✅ Success:', data)
      },
      error: (error) => {
        console.error('Error fetching students:', error);
       console.log('❌ Error:', error)
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.students.length / this.pageSize);
  }

  pageNumbers: number[] = [];

updatePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedStudents = this.students.slice(startIndex, endIndex);

  // Generate page number list
  this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
  this.updatePagination();
}


  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const newStudent: Student = {
      id: 0,
      name: this.studentForm.value.name,
      dob: this.studentForm.value.dateOfBirth,
      gender: this.studentForm.value.gender,
      age: this.studentForm.value.age,
      qualification: this.studentForm.value.qualification
    };

    this.studentservice.createstudent(newStudent).subscribe({
      next: (createdStudent) => {
        this.students.push(createdStudent);
        this.studentForm.reset();
        this.updatePagination();
        console.log('Student created:', createdStudent);
        this.toast.success('Student created successfully', 'Success', {
          positionClass: 'toast-center-center',
          timeOut: 3000,
          closeButton: true,
          progressBar: true
        });
      },
      error: (err) => {
        console.error('Error creating student:', err);
         this.toast.error('Error Occurr', 'Error', {
          positionClass: 'toast-center-center',
          timeOut: 3000,
          closeButton: true,
          progressBar: true
        });
      }
    });
  }

  onEdit(index: number) {
    const globalIndex = (this.currentPage - 1) * this.pageSize + index;
    this.editingIndex = globalIndex;
    this.editedStudent = { ...this.students[globalIndex] };
  }

  saveEdit(index: number): void {
    if (!this.editedStudent) return;

    this.studentservice.updateStudent(this.editedStudent).subscribe({
      next: (updatedStudent) => {
        if (this.editingIndex !== null) {
          this.students[this.editingIndex] = { ...updatedStudent };
          this.updatePagination();
        }
        this.editingIndex = null;
        this.editedStudent = null;
        console.log('Student updated successfully');
      },
      error: (err) => {
        console.error('Failed to update student:', err);
        alert('Error updating student');
      }
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedStudent = null;
  }

  onDelete(index: number) {
    const globalIndex = (this.currentPage - 1) * this.pageSize + index;
    this.students.splice(globalIndex, 1);
    this.updatePagination();
    if (this.editingIndex === globalIndex) {
      this.studentForm.reset();
      this.editingIndex = null;
    }
  }
}
