
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Type, Percent, RefreshCw } from "lucide-react";
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
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 pb-3">
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5" />
          Results
          {confidence !== null && (
            <div className="ml-auto flex items-center text-sm font-normal">
              <Percent className="mr-1 h-4 w-4" />
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
              <h3 className="mb-2 font-medium">Original Image</h3>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md border bg-muted/30">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
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
              <div className="border-b">
                <TabsList className="h-auto p-0">
                  <TabsTrigger
                    value="sanskrit"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                  >
                    <Type className="h-4 w-4" />
                    <span>Sanskrit</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="transliteration"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Transliteration</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="english"
                    className="flex items-center gap-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                  >
                    <FileText className="h-4 w-4" />
                    <span>English</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="sanskrit" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 font-medium">Sanskrit Text</h3>
                    <div className="min-h-[200px] rounded-md border p-4 text-xl leading-relaxed">
                      {sanskritText || "No text recognized."}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="transliteration" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 font-medium">Transliteration</h3>
                    <div className="min-h-[200px] rounded-md border p-4 font-mono text-base leading-relaxed">
                      {transliteration || "No transliteration available."}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="english" className="mt-0 p-4">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
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
                          Refresh
                        </Button>
                      )}
                    </div>
                    <div className="min-h-[200px] rounded-md border p-4 text-base leading-relaxed">
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
