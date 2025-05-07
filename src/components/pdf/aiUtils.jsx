// export async function analyzeWithGroq(text) {
//     const trimmedText = text.slice(0, 18000);
//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer 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`,
//       },
//       body: JSON.stringify({
//         model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//         messages: [
//           {
//             role: 'system',
//             content:
//               'Extract only the abstract and keywords from the research paper text. Format as JSON with "abstract" and "keywords".',
//           },
//           { role: 'user', content: trimmedText },
//         ],
//         temperature: 0.1,
//         max_tokens: 2000,
//       }),
//     });
  
//     const data = await response.json();
//     const content = data.choices?.[0]?.message?.content || '';
  
//     try {
//       const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || [null, content];
//       const parsed = JSON.parse(jsonMatch[1] || content.trim());
//       return {
//         abstract: { text: parsed.abstract || '', confidence: 'high' },
//         keywords: { list: parsed.keywords || [], confidence: 'high' },
//       };
//     } catch (e) {
//       return {
//         abstract: { text: 'Failed to parse abstract', confidence: 'low' },
//         keywords: { list: ['Failed to extract'], confidence: 'low' },
//       };
//     }
//   }

// Import PDF.js
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.js',
  import.meta.url
).toString();

// Mammoth for DOC/DOCX support
import * as mammoth from 'mammoth';

// 🔍 Groq API call function
export async function analyzeWithGroq(text) {
  const trimmedText = text.slice(0, 18000);
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'system',
          content:
            'Extract only the abstract and keywords from the research paper text. Format as JSON with "abstract" and "keywords".',
        },
        { role: 'user', content: trimmedText },
      ],
      temperature: 0.1,
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  try {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || [null, content];
    const parsed = JSON.parse(jsonMatch[1] || content.trim());
    return {
      abstract: { text: parsed.abstract || '', confidence: 'high' },
      keywords: { list: parsed.keywords || [], confidence: 'high' },
    };
  } catch (e) {
    return {
      abstract: { text: 'Failed to parse abstract', confidence: 'low' },
      keywords: { list: ['Failed to extract'], confidence: 'low' },
    };
  }
}

// 📄 Extract text from various file types
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
            text = text.replace(/\{.*?\}/g, ''); // Basic RTF cleanup
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

// 📄 PDF Text Extraction
async function extractTextFromPDF(file, minPages = 0) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = '';
  const totalPages = Math.min(pdf.numPages, minPages || pdf.numPages);

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += `\n---- PAGE ${i} ----\n${pageText}`;
  }

  return text;
}