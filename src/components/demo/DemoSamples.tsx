
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
    english: "I praise Agni, the household priest, the divine minister of the sacrifice, the invoker, who bestows wonderful treasures."
  },
  {
    id: "sample2",
    imageUrl: "/samples/sanskrit-sample2.jpg",
    translation: "यत्पुरुषेण हविषा देवा यज्ञमतन्वत । वसन्तो अस्यासीदाज्यं ग्रीष्म इध्मः शरद्धविः ॥",
    transliteration: "yatpuruṣeṇa haviṣā devā yajñamatanvata | vasanto asyāsīdājyaṃ grīṣma idhmaḥ śaraddhaviḥ ||",
    english: "When the Gods performed a sacrifice with the Primeval Man as their offering, Spring was its melted butter, Summer the sacrificial fuel, and Autumn the oblation."
  },
  {
    id: "sample3",
    imageUrl: "/samples/sanskrit-sample3.jpg",
    translation: "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् । स भूमिं विश्वतो वृत्वा अत्यतिष्ठद्दशाङ्गुलम् ॥",
    transliteration: "sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt | sa bhūmiṃ viśvato vṛtvā atyatiṣṭhaddaśāṅgulam ||",
    english: "The Purusha has a thousand heads, a thousand eyes, and a thousand feet. He pervaded the earth on all sides and extended beyond it by ten fingers' length."
  }
];

interface DemoSamplesProps {
  onSelectSample: (imageUrl: string, translation: string, transliteration: string, english: string) => void;
}

const DemoSamples: React.FC<DemoSamplesProps> = ({ onSelectSample }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Demo Samples</h2>
      <p className="text-muted-foreground">
        Select a sample manuscript to see how Paleolexis processes ancient Sanskrit texts.
      </p>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_SAMPLES.map((sample) => (
          <Card key={sample.id} className="overflow-hidden">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={sample.imageUrl}
                alt={`Sanskrit manuscript sample ${sample.id}`}
                className="h-full w-full object-cover transition-all hover:scale-105"
                onError={(e) => {
                  // Fallback for missing image
                  e.currentTarget.src = "https://placehold.co/400x300/e9edf5/46608d?text=Sanskrit+Manuscript";
                }}
              />
            </div>
            <CardContent className="p-4">
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => onSelectSample(
                  sample.imageUrl,
                  sample.translation,
                  sample.transliteration,
                  sample.english
                )}
              >
                Select Sample
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoSamples;
