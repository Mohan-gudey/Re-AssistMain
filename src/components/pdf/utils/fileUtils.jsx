// import { extractTextFromPDF } from './pdfUtils';

// export async function extractTextFromFile(file) {
//   const fileName = file.name.toLowerCase();
//   const reader = new FileReader();

//   return new Promise((resolve, reject) => {
//     try {
//       if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsText(file);
//       } else if (fileName.endsWith('.docx')) {
//         import('docxtemplater').then(({ default: Docxtemplater }) => {
//           import('pizzip').then(PizZip => {
//             reader.onload = () => {
//               const zip = new PizZip(reader.result);
//               const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
//               doc.render();
//               const text = doc.getFullText().join('\n');
//               resolve(text);
//             };
//             reader.readAsArrayBuffer(file);
//           });
//         });
//       } else if (fileName.endsWith('.doc')) {
//         import('msword-ts').then(({ readDOC }) => {
//           reader.onload = async () => {
//             const arrayBuffer = reader.result;
//             const result = await readDOC(arrayBuffer);
//             resolve(result.text);
//           };
//           reader.readAsArrayBuffer(file);
//         });
//       } else if (fileName.endsWith('.pdf')) {
//         extractTextFromPDF(file).then(resolve);
//       } else if (fileName.endsWith('.rtf') || fileName.endsWith('.odt')) {
//         reader.onload = () => {
//           let text = reader.result;
//           if (fileName.endsWith('.rtf')) {
//             // Basic RTF cleanup (not perfect without parser)
//             text = text.replace(/\{.*?\}/g, '');
//           }
//           resolve(text);
//         };
//         reader.readAsText(file);
//       } else {
//         resolve(`Unsupported file type: ${fileName}`);
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// }
// src/utils/fileUtils.js

import { extractTextFromPDF } from './pdfUtils';
import * as mammoth from 'mammoth';

export async function extractTextFromFile(file) {
  const fileName = file.name.toLowerCase();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    try {
      if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        reader.onload = async () => {
          const arrayBuffer = reader.result;

          // Convert .doc to .docx first if needed (basic workaround)
          if (fileName.endsWith('.doc')) {
            // Note: For better .doc support, consider backend conversion
            // Here we just pass it to mammoth which may handle simple cases
            console.warn('Using Mammoth.js to extract from .doc (limited support)');
          }

          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            resolve(result.value); // Raw text extracted
          } catch (err) {
            console.error('Mammoth extraction failed:', err);
            resolve('Failed to extract content from document.');
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (fileName.endsWith('.pdf')) {
        extractTextFromPDF(file).then(resolve);
      } else if (fileName.endsWith('.rtf') || fileName.endsWith('.odt')) {
        reader.onload = () => {
          let text = reader.result;
          if (fileName.endsWith('.rtf')) {
            // Basic RTF cleanup (not perfect without parser)
            text = text.replace(/\{.*?\}/g, '');
          }
          resolve(text);
        };
        reader.readAsText(file);
      } else {
        resolve(`Unsupported file type: ${fileName}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}