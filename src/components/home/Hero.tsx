
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Decode Ancient Sanskrit with Paleolexis
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our specialized tool recognizes, transcribes, and translates handwritten 
                Sanskrit manuscripts from palm leaf, birch bark, and stone inscriptions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild className="bg-parchment-800 hover:bg-parchment-900">
                <Link to="/scanner" className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <span>Start Scanning</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-parchment-400 text-parchment-800 hover:bg-parchment-100">
                <Link to="/scanner?demo=true">
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-lg shadow-lg border-2 border-parchment-300">
              <img
                src="/samples/hero-manuscript.jpg"
                alt="Ancient Sanskrit manuscript"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://www.ancientpages.com/wp-content/uploads/2018/12/sanskritnew11.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-lg bg-background/80 p-4 backdrop-blur-sm border border-parchment-200">
                  <p className="font-monomakh text-lg font-medium">
                    विद्यां ददाति विनयम्
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Knowledge gives humility" — Sanskrit wisdom through the ages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
