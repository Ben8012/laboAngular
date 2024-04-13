import { Injectable } from '@angular/core';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'


@Injectable({
  providedIn: 'root'
})

export class ConvertorsService {
   

    constructor(
      
    ) {
     
      }
    
    async readFileAsBlob(file: File): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
              const arrayBuffer = reader.result;
              const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
              resolve(blob);
            } else {
              reject(new Error('Échec de la lecture du fichier en tant que Blob.'));
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsArrayBuffer(file);
        });
    }

    // async convertPdfToJpeg(pdfFile: File): Promise<File[]> {
    //     const pdfBytes = await this.readFileAsArrayBuffer(pdfFile);
    //     const pdfDoc = await PDFDocument.load(pdfBytes);
    //     const numPages = pdfDoc.getPageCount();
    //     const jpegFiles: File[] = [];
    //     const blobPromises: Promise<void>[] = [];
    
    //     for (let i = 0; i < numPages; i++) {
    //         const page = pdfDoc.getPage(i);
    //         const width = page.getWidth();
    //         const height = page.getHeight();
    
    //         // Create a new canvas element
    //         const canvas = document.createElement('canvas');
    //         const context = canvas.getContext('2d');
    //         canvas.width = width;
    //         canvas.height = height;
    
    //         // Render PDF page to canvas
    //         await page.draw(canvas, { x: 0, y: 0, width, height });
    
    //         // Convert canvas to JPEG Blob
    //         const promise = new Promise<void>((resolve, reject) => {
    //             canvas.toBlob(async (blob) => {
    //                 if (blob) {
    //                     // Create a File object from the Blob
    //                     const fileName = `page_${i + 1}.jpeg`;
    //                     const jpegFile = new File([blob], fileName, { type: 'image/jpeg' });
    //                     jpegFiles.push(jpegFile);
    //                     resolve();
    //                 } else {
    //                     reject(new Error('Failed to create blob'));
    //                 }
    //             }, 'image/jpeg');
    //         });
    
    //         blobPromises.push(promise);
    //     }
    
    //     // Wait for all blob conversion promises to resolve
    //     await Promise.all(blobPromises);
    
    //     return jpegFiles;
    // }
    
    private async readFileAsArrayBuffer(file: File): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    }
    
    
}