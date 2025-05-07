// src/utils/extractors.js
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPDF(file, minPages = 0) {
  const reader = new FileReader();
  const arrayBuffer = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

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
  const content = data.choices[0].message.content;

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

export function extractAbstract(txt) {
  // Same regex-based logic as before, adapted to JS
  const patterns = [
    /ABSTRACT\s+([\s\S]*?)(?=\s*(?:1\.|I\.|Introduction))/i,
    /Abstract:\s*([\s\S]*?)(?=\s*(?:Keywords|INTRODUCTION))/i,
  ];

  for (const pattern of patterns) {
    const match = txt.match(pattern);
    if (match) {
      return { text: match[1].trim(), confidence: 'high' };
    }
  }

  return { text: 'Abstract not found', confidence: 'low' };
}

export function extractKeywords(txt, absText) {
  const keywordPatterns = [
    /Keywords:\s*([^\.]+)/i,
    /KEYWORDS:\s*([^\.]+)/i,
    /Key Words:\s*([^\.]+)/i,
  ];

  for (const pattern of keywordPatterns) {
    const match = txt.match(pattern);
    if (match) {
      const list = match[1]
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 2);
      return { list, confidence: 'high' };
    }
  }

  return { list: ['No keywords found'], confidence: 'low' };
}