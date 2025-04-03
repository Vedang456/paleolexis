
import React from "react";
import { BookOpen, FileSearch, Image, Languages, Brain, Settings } from "lucide-react";
import Hero from "@/components/home/Hero";
import FeatureCard from "@/components/home/FeatureCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: BookOpen,
    title: "Sanskrit Specialized",
    description: "Trained specifically on ancient Sanskrit manuscripts, palm leaves, and stone inscriptions for high accuracy recognition."
  },
  {
    icon: Image,
    title: "Image Processing",
    description: "Advanced preprocessing techniques to handle faded, damaged, or low-quality manuscript images from various historical periods."
  },
  {
    icon: FileSearch,
    title: "Accurate OCR",
    description: "Tesseract OCR engine enhanced with deep learning for exceptional character recognition of Devanagari script."
  },
  {
    icon: Languages,
    title: "Translation Support",
    description: "Automatic transliteration and translation to make ancient texts accessible to scholars worldwide."
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Machine learning algorithms continuously improve recognition accuracy with each use, preserving cultural heritage."
  },
  {
    icon: Settings,
    title: "Research Tools",
    description: "Specialized tools for epigraphists, paleographers, and digital humanities projects working with ancient manuscripts."
  }
];

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section className="bg-muted/30 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-monomakh text-3xl font-bold sm:text-4xl">About Paleolexis</h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Paleolexis is a specialized OCR system designed to recognize, transcribe, and translate
                handwritten Sanskrit manuscripts. Built on advanced machine learning and
                trained on extensive historical document collections, it helps scholars access
                texts preserved on palm leaf, birch bark, copper plates, and stone inscriptions across millennia.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 flex flex-col items-center gap-4 text-center">
              <h2 className="font-monomakh text-3xl font-bold sm:text-4xl">Key Features</h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Discover how Paleolexis transforms the study of ancient Sanskrit texts
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-primary/5 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="font-monomakh text-3xl font-bold tracking-tight sm:text-4xl">
                  Preserving Ancient Knowledge
                </h2>
                <p className="text-muted-foreground">
                  Sanskrit is one of the world's oldest languages, with manuscripts dating back thousands of years.
                  From the Vedas and Upanishads to scientific treatises on mathematics, astronomy, and medicine,
                  countless works remain untranslated or inaccessible due to their fragile physical condition.
                </p>
                <p className="text-muted-foreground">
                  Paleolexis helps bridge this gap by digitizing and analyzing handwritten Sanskrit documents across
                  different writing materials - palm leaf (तालपत्र), birch bark (भोजपत्र), copper plates (ताम्रपत्र),
                  and stone inscriptions (शिलालेख). Our technology preserves humanity's cultural heritage for future generations.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="overflow-hidden rounded-lg border border-parchment-200">
                    <img 
                      src="/samples/palm-leaf.jpg" 
                      alt="Palm leaf manuscript" 
                      className="h-48 w-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = "https://d3d0lqu00lnqvz.cloudfront.net/media/media/f9bf6688-12a1-4a77-bf0e-5b61a55591e1.jpg";
                      }}
                    />
                    <div className="p-2 bg-parchment-50">
                      <p className="text-sm font-medium">Palm Leaf Manuscript (तालपत्र)</p>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-parchment-200">
                    <img 
                      src="/samples/bhoj-patra.jpg" 
                      alt="Birch bark manuscript" 
                      className="h-48 w-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/c/c2/Manuscript_Mahabharat_Bhojpatra.jpg";
                      }}
                    />
                    <div className="p-2 bg-parchment-50">
                      <p className="text-sm font-medium">Birch Bark Manuscript (भोजपत्र)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="ancient-paper w-full overflow-hidden rounded-xl border border-parchment-300 p-6 shadow-lg">
                  <p className="mb-4 font-monomakh text-lg font-medium text-foreground">
                    Featured Translation
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-1 text-sm font-medium">Sanskrit Original:</p>
                      <p className="font-monomakh text-base">
                        विद्या ददाति विनयं विनयाद्याति पात्रताम् ।<br />
                        पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥
                      </p>
                    </div>
                    <Separator className="bg-primary/10" />
                    <div>
                      <p className="mb-1 text-sm font-medium">English Translation:</p>
                      <p className="text-base">
                        "Knowledge gives discipline, from discipline comes worthiness,<br />
                        From worthiness one gets wealth, from wealth good deeds, and from that happiness."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-monomakh text-3xl font-bold text-center mb-8">Ancient Writing Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-lg border border-parchment-200 shadow-md">
                  <img 
                    src="/samples/copper-plate.jpg" 
                    alt="Copper plate inscription" 
                    className="h-64 w-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/1/10/Thanesar_copperplate_of_Harshavardhana.jpg";
                    }}
                  />
                  <div className="p-4 bg-parchment-50">
                    <h3 className="font-monomakh text-lg font-semibold mb-1">Copper Plate (ताम्रपत्र)</h3>
                    <p className="text-sm text-muted-foreground">Durable copper plates were used for important records, royal decrees, and land grants in ancient India.</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-parchment-200 shadow-md">
                  <img 
                    src="/samples/stone-inscription.jpg" 
                    alt="Stone inscription" 
                    className="h-64 w-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/c/cc/Ancient_Stone_Inscriptions%2C_Pollonaruwa%2C_Sri_Lanka.jpg";
                    }}
                  />
                  <div className="p-4 bg-parchment-50">
                    <h3 className="font-monomakh text-lg font-semibold mb-1">Stone Inscription (शिलालेख)</h3>
                    <p className="text-sm text-muted-foreground">Stone inscriptions on temple walls and pillars preserved Sanskrit texts for centuries despite weather exposure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
