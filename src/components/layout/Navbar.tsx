
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, Upload } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-serif">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-2xl font-semibold tracking-tight">Paleolexis</span>
        </div>
        <nav className="ml-auto flex gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/scanner" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Scanner</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
