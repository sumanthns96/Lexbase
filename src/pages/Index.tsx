import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import ChatWindow from "../components/ChatWindow";
import Features from "../components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-gradient overflow-hidden">
      {/* Nav — glass bar */}
      <nav className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Lexbase
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground tracking-tight transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#about" className="text-sm text-muted-foreground tracking-tight transition-colors hover:text-foreground">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — centered, orb first */}
      <section className="container mx-auto px-6 pb-28 pt-16 md:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatWindow />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Your{" "}
              <span className="text-gradient-gold">Student & Work Visa</span>{" "}
              Guide
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Voice-powered guidance on student visas, work permits,
              H-1B, OPT, CPT, and more. Available 24/7.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="#features"
                className="rounded-full glass-subtle px-6 py-2.5 text-sm font-medium text-foreground tracking-tight transition-all hover:bg-secondary"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <div id="features">
        <Features />
      </div>

      {/* About */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Why <span className="text-gradient-gold">Lexbase</span>?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Immigration can be overwhelming. Our AI assistant provides
              reliable, up-to-date information on student and work visas so you
              can make informed decisions. Available around the clock, at no cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium tracking-tight text-muted-foreground">
              Lexbase
            </span>
          </div>
          <p className="text-xs text-muted-foreground/60">
            © 2026 Lexbase. Not a substitute for legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
