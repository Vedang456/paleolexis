
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { processImage } from "@/services/ocrService";

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
  const [confidence, setConfidence] = useState<number | null>(null);
  
  const location = useLocation();

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
    setConfidence(null);
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
    setConfidence(95); // High confidence for demo samples
  };

  const processImageWithOCR = async () => {
    if (!file && !isDemoMode) {
      toast.error("No image selected", {
        description: "Please upload an image to process",
      });
      return;
    }

    setIsProcessing(true);
    console.log("Processing image:", file?.name);
    
    try {
      if (!isDemoMode && file) {
        if (!file.type.startsWith('image/')) {
          toast.error("Invalid file format", {
            description: "Please upload a valid image file",
          });
          setIsProcessing(false);
          return;
        }
        
        const result = await processImage(file);
        
        setScanResults({
          sanskritText: result.sanskritText,
          transliteration: result.transliteration,
          englishTranslation: result.englishTranslation,
        });
        
        setConfidence(result.confidence);
        
        toast.success("Processing complete", {
          description: `Your manuscript has been analyzed with ${result.confidence.toFixed(1)}% confidence`,
        });
      }
    } catch (error) {
      console.error("OCR processing error:", error);
      toast.error("Processing failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetranslate = async () => {
    if (!scanResults.sanskritText) {
      toast.error("No text to translate", {
        description: "Please scan a document first",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const translationResponse = await fetch("https://sanskrit-api.vercel.app/translate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: scanResults.sanskritText,
          source: 'sanskrit',
          target: 'english'
        }),
      });

      if (translationResponse.ok) {
        const translationData = await translationResponse.json();
        setScanResults(prev => ({
          ...prev,
          englishTranslation: translationData.translation || "Translation not available"
        }));
        
        toast.success("Translation updated", {
          description: "The English translation has been refreshed",
        });
      } else {
        throw new Error("Translation API request failed");
      }
    } catch (error) {
      console.error('Retranslation error:', error);
      toast.error("Translation failed", {
        description: error instanceof Error ? error.message : "Failed to get a new translation",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight">Sanskrit Scanner</h1>
            <p className="text-muted-foreground">
              Upload an image of a Sanskrit manuscript to recognize, transliterate, and translate the text.
            </p>
          </div>

          <Tabs defaultValue={isDemoMode ? "demo" : "upload"} className="space-y-8">
            <TabsList>
              <TabsTrigger value="upload" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </TabsTrigger>
              <TabsTrigger value="demo" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span>Demo</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-8">
              <FileUpload onImageUpload={handleImageUpload} />
              
              {imageUrl && !isDemoMode && (
                <div className="flex justify-center">
                  <Button 
                    onClick={processImageWithOCR} 
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
                        <span>Process Image</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {(imageUrl || isProcessing) && (
                <TranslationDisplay
                  imageUrl={imageUrl}
                  sanskritText={scanResults.sanskritText}
                  transliteration={scanResults.transliteration}
                  englishTranslation={scanResults.englishTranslation}
                  confidence={confidence}
                  isLoading={isProcessing}
                  onRetranslate={handleRetranslate}
                />
              )}
            </TabsContent>

            <TabsContent value="demo" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Demo</CardTitle>
                  <CardDescription>
                    Try with pre-selected samples to see how the application processes Sanskrit text.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DemoSamples onSelectSample={handleSelectSample} />
                </CardContent>
              </Card>
              
              {imageUrl && (
                <TranslationDisplay
                  imageUrl={imageUrl}
                  sanskritText={scanResults.sanskritText}
                  transliteration={scanResults.transliteration}
                  englishTranslation={scanResults.englishTranslation}
                  confidence={confidence}
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
