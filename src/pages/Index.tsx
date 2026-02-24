import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ChatWindow from "../components/ChatWindow";
import Features from "../components/Features";
import LexbaseLogo from "../components/ui/LexbaseLogo";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="absolute top-0 z-[-1] h-screen w-screen bg-background">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      {/* Nav — Floating glass pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full border border-white/10 bg-background/50 backdrop-blur-md shadow-2xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <LexbaseLogo className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Lexbase
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <a href="#about" className="hidden md:flex text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — purely interactive ChatWindow layout */}
      <section className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-start pt-36 md:pt-48 pb-20 px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-foreground/90">Lexbase Voice is now live</span>
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            <a href="#demo" className="text-primary hover:underline flex items-center gap-1">
              Try it out <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>

          {/* Removed Headline and explored features from here, moved to About section */}
          {/* Optional: Add spacing if needed, but flex layout should handle it */}

          {/* Orb / Demo Area */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl relative"
          >
            {/* Ambient glow behind orb */}
            <div className="absolute inset-0 -z-10 bg-primary/10 blur-[120px] rounded-full"></div>
            <ChatWindow />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <div id="features" className="relative z-10 w-full">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl -z-10" />
        <Features />
      </div>

      {/* About */}
      <section id="about" className="relative z-10 py-32 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-6">
              Immigration Guidance, <br />
              <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Spoken Aloud.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground/80 md:text-xl mb-6">
              Your 24/7 AI-powered immigration assistant. Navigate student visas, OPT, H-1B, and permanent residency with confidence.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground/80 md:text-xl">
              Immigration can be overwhelming. Lexbase provides an intelligent, always-on guide trained on the latest policies for student and work visas. Get reliable answers instantly so you can focus on building your future.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#features"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
              >
                Explore Features
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <LexbaseLogo className="h-5 w-5 text-primary" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Lexbase
              </span>
            </div>

            <div className="flex gap-8 text-sm text-muted-foreground/60">
              <a href="/Lexbase_Privacy_Policy_Terms.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Privacy Policy & Terms of Service</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center flex flex-col items-center justify-between md:flex-row gap-4">
            <p className="text-sm text-muted-foreground/50">
              © 2026 Lexbase. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40 max-w-sm text-center md:text-right">
              Disclaimer: Lexbase is an AI tool for informational purposes only and does not constitute official legal advice.
            </p>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default Index;
