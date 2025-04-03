
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Book, FileText, Type, Percent, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface TranslationDisplayProps {
  imageUrl: string | null;
  sanskritText: string;
  transliteration: string;
  englishTranslation: string;
  confidence?: number | null;
  isLoading?: boolean;
  onRetranslate?: () => void;
}

const TranslationDisplay: React.FC<TranslationDisplayProps> = ({
  imageUrl,
  sanskritText,
  transliteration,
  englishTranslation,
  confidence = null,
  isLoading = false,
  onRetranslate
}) => {
  const [activeTab, setActiveTab] = useState("sanskrit");

  if (!imageUrl && !isLoading) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-parchment-200">
      <CardHeader className="bg-parchment-50 pb-3">
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5 text-parchment-800" />
          Recognition Results
          {confidence !== null && (
            <div className="ml-auto flex items-center text-sm font-normal">
              <Percent className="mr-1 h-4 w-4 text-parchment-600" />
              <span>Confidence: {confidence.toFixed(1)}%</span>
              <Progress value={confidence} className="ml-2 h-2 w-20" />
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Original Image */}
          <div className="w-full border-r border-border md:w-1/3">
            <div className="p-4">
              <h3 className="mb-2 font-medium">Original Manuscript</h3>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-parchment-200 bg-muted/30">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-parchment-600"></div>
                  </div>
                ) : (
                  <img
                    src={imageUrl || ""}
                    alt="Original manuscript"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Translation Tabs */}
          <div className="w-full md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-parchment-200">
                <TabsList className="h-auto p-0">
                  <TabsTrigger
                    value="sanskrit"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-parchment-600"
                  >
                    <Type className="h-4 w-4" />
                    <span>Sanskrit</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="transliteration"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-parchment-600"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Transliteration</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="english"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-parchment-600"
                  >
                    <Book className="h-4 w-4" />
                    <span>English</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="sanskrit" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-parchment-600"></div>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 font-medium">Recognized Sanskrit Text</h3>
                    <div className="min-h-[200px] rounded-md border border-parchment-200 bg-card p-4 font-monomakh text-xl leading-relaxed ancient-paper">
                      {sanskritText || "No text recognized."}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="transliteration" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-parchment-600"></div>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 font-medium">Transliteration</h3>
                    <div className="min-h-[200px] rounded-md border border-parchment-200 bg-card p-4 font-mono text-base leading-relaxed">
                      {transliteration || "No transliteration available."}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="english" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-parchment-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">English Translation</h3>
                      {onRetranslate && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={onRetranslate}
                          className="text-xs"
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Refresh Translation
                        </Button>
                      )}
                    </div>
                    <div className="min-h-[200px] rounded-md border border-parchment-200 bg-card p-4 text-base leading-relaxed">
                      {englishTranslation || "No English translation available."}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationDisplay;
