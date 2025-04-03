
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
    description: "Trained specifically on ancient Sanskrit manuscripts and texts for high accuracy recognition."
  },
  {
    icon: Image,
    title: "Image Processing",
    description: "Advanced preprocessing techniques to handle faded, damaged, or low-quality manuscript images."
  },
  {
    icon: FileSearch,
    title: "Accurate OCR",
    description: "Tesseract OCR engine enhanced with deep learning for exceptional character recognition."
  },
  {
    icon: Languages,
    title: "Translation Support",
    description: "Automatic transliteration and translation to make ancient texts accessible."
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Machine learning algorithms continuously improve recognition accuracy with each use."
  },
  {
    icon: Settings,
    title: "Research Tools",
    description: "Specialized tools for scholars, researchers, and digital humanities projects."
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
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">About Paleolexis</h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Paleolexis is a state-of-the-art OCR system designed to recognize, transcribe, and translate
                handwritten Sanskrit manuscripts. Built on a foundation of advanced machine learning and
                specialized training datasets, it makes ancient knowledge accessible to scholars, researchers,
                and enthusiasts around the world.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 flex flex-col items-center gap-4 text-center">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Key Features</h2>
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
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  Preserving Ancient Knowledge
                </h2>
                <p className="text-muted-foreground">
                  Sanskrit is one of the world's oldest languages, with a rich literary tradition spanning thousands of years.
                  Countless manuscripts containing invaluable knowledge in fields ranging from philosophy and religion to
                  mathematics and astronomy remain untranslated or inaccessible.
                </p>
                <p className="text-muted-foreground">
                  Paleolexis helps bridge this gap by leveraging cutting-edge technology to make these ancient texts
                  accessible to scholars and the wider public. By digitizing and analyzing handwritten Sanskrit documents,
                  we're helping preserve humanity's cultural heritage for future generations.
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="ancient-paper w-full overflow-hidden rounded-xl border p-6 shadow-lg">
                  <p className="mb-4 font-serif text-lg font-medium text-foreground">
                    Featured Translation
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-1 text-sm font-medium">Sanskrit Original:</p>
                      <p className="font-serif text-base">
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
