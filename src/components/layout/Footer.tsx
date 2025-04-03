
import React from "react";
import { BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-background py-6">
      <div className="container flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex items-center gap-2 font-serif">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-xl font-semibold tracking-tight">Paleolexis</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Advanced OCR technology for ancient Sanskrit manuscripts
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground hover:underline">
            About
          </a>
          <a href="#" className="hover:text-foreground hover:underline">
            Research
          </a>
          <a href="#" className="hover:text-foreground hover:underline">
            Contact
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Paleolexis. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
