import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-faculity',
  standalone: true,
  templateUrl: './faculity.component.html',
  styleUrls: ['./faculity.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    PdfViewerModule
  ]
})
export class FaculityComponent implements OnInit {
  pdfSrc: Uint8Array | undefined;
  page: number = 1;
  zoom: number = 1.0;
  totalPages: number = 0;
  pdf: any; // PDFDocumentProxy from PDF.js
searchText: string = '';



  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getPdf();
  }

  getPdf() {
    this.http.get('https://localhost:44316/api/Student/school-info', {
      responseType: 'blob'
    }).subscribe(pdfBlob => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const typedArray = new Uint8Array(e.target.result);
        this.pdfSrc = typedArray;
      };
      reader.readAsArrayBuffer(pdfBlob);
    }, error => {
      console.error('Error fetching PDF:', error);
    });
  }

 onPdfLoad(pdf: any): void {
  this.pdf = pdf;
  this.totalPages = pdf.numPages;
}

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  zoomIn() {
    this.zoom += 0.1;
  }

  zoomOut() {
    if (this.zoom > 0.5) {
      this.zoom -= 0.1;
    }
  }
  

searchInPdf(): void {
  this.resetHighlights();
  if (!this.searchText || !this.pdf) return;

  const searchLower = this.searchText.toLowerCase();

  for (let i = 1; i <= this.pdf.numPages; i++) {
    this.pdf.getPage(i).then((page: any) => {
      return page.getTextContent();
    }).then((textContent: any) => {
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      if (pageText.toLowerCase().includes(searchLower)) {
        console.log(`Found "${this.searchText}" on page ${i}`);
        this.page = i; // jump to first match
        // Optionally highlight or stop further search here
      }
    });
  }
}
onPageRendered(): void {
  if (!this.searchText) return;

  const textLayer = document.querySelector('.textLayer');
  if (!textLayer) return;

  const textSpans = textLayer.querySelectorAll('span');

  const searchLower = this.searchText.toLowerCase();

  textSpans.forEach((span: HTMLElement) => {
    const spanText = span.textContent || '';
    if (spanText.toLowerCase().includes(searchLower)) {
      const regex = new RegExp(`(${this.escapeRegExp(this.searchText)})`, 'gi');
      span.innerHTML = spanText.replace(
        regex,
        '<span class="pdf-highlight">$1</span>'
      );
    }
  });
}

escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape special characters
}

resetHighlights(): void {
  const highlights = document.querySelectorAll('.pdf-highlight');
  highlights.forEach((el) => {
    const parent = el.parentElement;
    if (parent) {
      parent.innerHTML = parent.textContent || '';
    }
  });
}


}
