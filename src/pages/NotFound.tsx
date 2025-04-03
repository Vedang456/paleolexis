
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
          <div className="mb-4 rounded-full bg-muted p-4">
            <div className="text-4xl">🔍</div>
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Page Not Found</h1>
          <p className="mb-8 max-w-[600px] text-muted-foreground">
            The page at <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">{location.pathname}</code> could not be found.
            It might have been moved, deleted, or never existed.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
