
import { createWorker } from 'tesseract.js';

export interface OCRResult {
  sanskritText: string;
  transliteration: string;
  englishTranslation: string;
  confidence: number;
}

export async function processImage(imageFile: File): Promise<OCRResult> {
  try {
    // Create a worker with the Sanskrit language data
    // Note: Using 'san' for Sanskrit, falling back to 'eng' if Sanskrit isn't available
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });

    // Load language data - first try Sanskrit, but fallback to English if not available
    try {
      await worker.loadLanguage('san');
      await worker.initialize('san');
    } catch (e) {
      console.warn('Sanskrit language data not available, falling back to English');
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
    }

    // Set page segmentation mode to treat the image as a single block of text
    await worker.setParameters({
      tessedit_pageseg_mode: '1', // Automatic page segmentation with OSD
    });

    // Create a URL from the file
    const imageURL = URL.createObjectURL(imageFile);

    // Recognize text in the image
    const result = await worker.recognize(imageURL);
    
    // Clean up the object URL to avoid memory leaks
    URL.revokeObjectURL(imageURL);

    // Simple transliteration function (this is a placeholder - a real implementation would be more sophisticated)
    const basicTransliteration = result.data.text
      .replace(/अ/g, 'a')
      .replace(/आ/g, 'ā')
      .replace(/इ/g, 'i')
      .replace(/ई/g, 'ī')
      .replace(/उ/g, 'u')
      .replace(/ऊ/g, 'ū')
      .replace(/ए/g, 'e')
      .replace(/ऐ/g, 'ai')
      .replace(/ओ/g, 'o')
      .replace(/औ/g, 'au')
      .replace(/क/g, 'ka')
      .replace(/ख/g, 'kha')
      .replace(/ग/g, 'ga')
      .replace(/घ/g, 'gha')
      .replace(/ङ/g, 'ṅa')
      .replace(/च/g, 'ca')
      .replace(/छ/g, 'cha')
      .replace(/ज/g, 'ja')
      .replace(/झ/g, 'jha')
      .replace(/ञ/g, 'ña')
      .replace(/ट/g, 'ṭa')
      .replace(/ठ/g, 'ṭha')
      .replace(/ड/g, 'ḍa')
      .replace(/ढ/g, 'ḍha')
      .replace(/ण/g, 'ṇa')
      .replace(/त/g, 'ta')
      .replace(/थ/g, 'tha')
      .replace(/द/g, 'da')
      .replace(/ध/g, 'dha')
      .replace(/न/g, 'na')
      .replace(/प/g, 'pa')
      .replace(/फ/g, 'pha')
      .replace(/ब/g, 'ba')
      .replace(/भ/g, 'bha')
      .replace(/म/g, 'ma')
      .replace(/य/g, 'ya')
      .replace(/र/g, 'ra')
      .replace(/ल/g, 'la')
      .replace(/व/g, 'va')
      .replace(/श/g, 'śa')
      .replace(/ष/g, 'ṣa')
      .replace(/स/g, 'sa')
      .replace(/ह/g, 'ha')
      .replace(/ं/g, 'ṃ')
      .replace(/ः/g, 'ḥ');

    // Terminate the worker to free up resources
    await worker.terminate();

    // Return the OCR results
    return {
      sanskritText: result.data.text,
      transliteration: basicTransliteration,
      englishTranslation: "Translation not available - this would require an actual Sanskrit translation API.",
      confidence: result.data.confidence
    };
  } catch (error) {
    console.error('OCR processing error:', error);
    throw new Error(`OCR processing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
