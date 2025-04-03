
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample manuscripts with their translations for the demo mode
const DEMO_SAMPLES = [
  {
    id: "sample1",
    imageUrl: "/samples/sanskrit-sample1.jpg",
    translation: "अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥",
    transliteration: "agnimīḷe purohitaṃ yajñasya devaṃ ṛtvījam | hotāraṃ ratnadhātamam ||",
    english: "I praise Agni, the household priest, the divine minister of the sacrifice, the invoker, who bestows wonderful treasures.",
    description: "From Rigveda (1.1.1) - Palm leaf manuscript from 14th century"
  },
  {
    id: "sample2",
    imageUrl: "/samples/sanskrit-sample2.jpg",
    translation: "यत्पुरुषेण हविषा देवा यज्ञमतन्वत । वसन्तो अस्यासीदाज्यं ग्रीष्म इध्मः शरद्धविः ॥",
    transliteration: "yatpuruṣeṇa haviṣā devā yajñamatanvata | vasanto asyāsīdājyaṃ grīṣma idhmaḥ śaraddhaviḥ ||",
    english: "When the Gods performed a sacrifice with the Primeval Man as their offering, Spring was its melted butter, Summer the sacrificial fuel, and Autumn the oblation.",
    description: "From Purusha Sukta - Stone inscription from 10th century temple"
  },
  {
    id: "sample3",
    imageUrl: "/samples/sanskrit-sample3.jpg",
    translation: "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् । स भूमिं विश्वतो वृत्वा अत्यतिष्ठद्दशाङ्गुलम् ॥",
    transliteration: "sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt | sa bhūmiṃ viśvato vṛtvā atyatiṣṭhaddaśāṅgulam ||",
    english: "The Purusha has a thousand heads, a thousand eyes, and a thousand feet. He pervaded the earth on all sides and extended beyond it by ten fingers' length.",
    description: "From Purusha Sukta - Bhoj Patra (birch bark) manuscript from 12th century"
  }
];

interface DemoSamplesProps {
  onSelectSample: (imageUrl: string, translation: string, transliteration: string, english: string) => void;
}

const DemoSamples: React.FC<DemoSamplesProps> = ({ onSelectSample }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-monomakh tracking-tight">Ancient Sanskrit Samples</h2>
      <p className="text-muted-foreground">
        Select a sample manuscript to see how Paleolexis processes authentic Sanskrit texts.
      </p>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_SAMPLES.map((sample) => (
          <Card key={sample.id} className="overflow-hidden border-parchment-200 parchment">
            <div className="aspect-[4/3] w-full overflow-hidden border-b border-parchment-200">
              <img
                src={sample.imageUrl}
                alt={`Sanskrit manuscript sample ${sample.id}`}
                className="h-full w-full object-cover transition-all hover:scale-105"
                onError={(e) => {
                  // Fallback for missing images with real Sanskrit manuscript images
                  const fallbackImages = [
                    "https://www.ancientpages.com/wp-content/uploads/2018/12/sanskritnew11.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Sanskrit_manuscript.jpg",
                    "https://d3d0lqu00lnqvz.cloudfront.net/media/media/f9bf6688-12a1-4a77-bf0e-5b61a55591e1.jpg"
                  ];
                  e.currentTarget.src = fallbackImages[parseInt(sample.id.replace("sample", "")) - 1];
                }}
              />
            </div>
            <div className="p-4">
              <p className="font-monomakh text-sm mb-2">{sample.description}</p>
              <p className="font-monomakh text-xs mb-4 line-clamp-2 text-parchment-800">{sample.translation}</p>
              <Button 
                variant="secondary" 
                className="w-full bg-parchment-200 hover:bg-parchment-300 text-parchment-900"
                onClick={() => onSelectSample(
                  sample.imageUrl,
                  sample.translation,
                  sample.transliteration,
                  sample.english
                )}
              >
                Select Sample
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoSamples;
