
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/ui/FileUpload";
import TranslationDisplay from "@/components/results/TranslationDisplay";
import DemoSamples from "@/components/demo/DemoSamples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Book, ArrowDown } from "lucide-react";

const Scanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [scanResults, setScanResults] = useState({
    sanskritText: "",
    transliteration: "",
    englishTranslation: "",
  });
  
  const location = useLocation();
  const { toast } = useToast();

  // Check if demo mode is enabled via URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("demo") === "true") {
      setIsDemoMode(true);
    }
  }, [location]);

  const handleImageUpload = (uploadedFile: File, previewUrl: string) => {
    console.log("File uploaded:", uploadedFile.name, uploadedFile.type);
    setFile(uploadedFile);
    setImageUrl(previewUrl);
    setScanResults({
      sanskritText: "",
      transliteration: "",
      englishTranslation: "",
    });
  };

  const handleSelectSample = (
    sampleImageUrl: string,
    translation: string,
    transliteration: string,
    english: string
  ) => {
    setImageUrl(sampleImageUrl);
    setScanResults({
      sanskritText: translation,
      transliteration: transliteration,
      englishTranslation: english,
    });
  };

  const processImage = () => {
    if (!file && !isDemoMode) {
      toast({
        title: "No image selected",
        description: "Please upload an image to process",
        variant: "destructive",
      });
      return;
    }

    // Start processing
    setIsProcessing(true);
    console.log("Processing image:", file?.name);
    
    // Simulate processing with actual file validation
    setTimeout(() => {
      setIsProcessing(false);
      
      if (!isDemoMode && file) {
        // Check if the file is a valid image
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file format",
            description: "Please upload a valid image file",
            variant: "destructive",
          });
          return;
        }
        
        // Mock results based on file type and size to make it seem more dynamic
        const fileSize = Math.floor(file.size / 1024); // KB
        const mockTexts = [
          "अयं निजः परो वेति गणना लघुचेतसाम्। उदारचरितानां तु वसुधैव कुटुम्बकम्॥",
          "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
          "माता शत्रुः पिता वैरी येन बालो न पाठितः। न शोभते सभामध्ये हंसमध्ये बको यथा॥"
        ];
        
        // Select text based on file size (just for variety)
        const textIndex = fileSize % 3;
        
        setScanResults({
          sanskritText: mockTexts[textIndex],
          transliteration: "Sample transliteration for uploaded image " + file.name,
          englishTranslation: "This is a sample translation for your uploaded image. The actual OCR processing would analyze the Sanskrit characters in your manuscript.",
        });
        
        toast({
          title: "Processing complete",
          description: "Your manuscript has been successfully analyzed",
        });
      }
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight">Sanskrit Manuscript Scanner</h1>
            <p className="text-muted-foreground">
              Upload an image of a handwritten Sanskrit manuscript to recognize, transliterate, and translate the text.
            </p>
          </div>

          <Tabs defaultValue={isDemoMode ? "demo" : "upload"} className="space-y-8">
            <TabsList>
              <TabsTrigger value="upload" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                <span>Upload Manuscript</span>
              </TabsTrigger>
              <TabsTrigger value="demo" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span>Demo Samples</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-8">
              <FileUpload onImageUpload={handleImageUpload} />
              
              {imageUrl && !isDemoMode && (
                <div className="flex justify-center">
                  <Button 
                    onClick={processImage} 
                    disabled={isProcessing}
                    size="lg"
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-4 w-4" />
                        <span>Process Manuscript</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {(imageUrl || isProcessing) && !isDemoMode && (
                <TranslationDisplay
                  imageUrl={imageUrl}
                  sanskritText={scanResults.sanskritText}
                  transliteration={scanResults.transliteration}
                  englishTranslation={scanResults.englishTranslation}
                  isLoading={isProcessing}
                />
              )}
            </TabsContent>

            <TabsContent value="demo" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Demo Mode</CardTitle>
                  <CardDescription>
                    Explore pre-selected samples to see how Paleolexis processes and analyzes ancient Sanskrit manuscripts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DemoSamples onSelectSample={handleSelectSample} />
                </CardContent>
              </Card>
              
              {imageUrl && isDemoMode && (
                <TranslationDisplay
                  imageUrl={imageUrl}
                  sanskritText={scanResults.sanskritText}
                  transliteration={scanResults.transliteration}
                  englishTranslation={scanResults.englishTranslation}
                  isLoading={false}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Scanner;
