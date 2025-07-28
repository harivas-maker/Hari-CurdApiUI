import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Update the import path below to the correct relative path for HeaderComponent
// Example: If HeaderComponent is in 'src/app/components/header/header.component.ts', use the following:
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courses = [
    {
      title: 'Full Stack Java',
      subjects: ['Java', 'Spring Boot', 'MySQL'],
      fee: '₹45,000',
      duration: '6 months'
    },
    {
      title: 'Full Stack .NET',
      subjects: ['C#', '.NET Core', 'SQL Server'],
      fee: '₹50,000',
      duration: '5 months'
    },
    {
      title: 'Python Developer',
      subjects: ['Python', 'Django', 'PostgreSQL'],
      fee: '₹40,000',
      duration: '4.5 months'
    },
    {
      title: 'Cloud Computing',
      subjects: ['AWS', 'Azure', 'GCP'],
      fee: '₹55,000',
      duration: '6 months'
    }
  ];
}
