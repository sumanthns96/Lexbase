import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import ChatWindow from "../components/ChatWindow";
import Features from "../components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Nav */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-serif text-xl font-bold text-foreground">
            Lexbase
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
        </div>
      </nav>

      {/* Hero — two-column layout */}
      <section className="container mx-auto px-6 pb-20 pt-16 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Your{" "}
              <span className="text-gradient-gold">Student & Work Visa</span>{" "}
              Guide, Powered by AI
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Get instant, voice-powered guidance on student visas, work permits,
              H-1B, OPT, CPT, and more. Our AI assistant is available 24/7 to
              answer your immigration questions.
            </p>

            <a
              href="#features"
              className="mt-8 inline-block rounded-xl border border-border px-8 py-3.5 font-sans text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              Learn More
            </a>
          </motion.div>

          {/* Right: conversation card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ChatWindow />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <div id="features">
        <Features />
      </div>

      {/* About */}
      <section id="about" className="border-t border-border py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Why Choose <span className="text-gradient-gold">Lexbase</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Immigration can be overwhelming. Our AI assistant provides
              reliable, up-to-date information on student and work visas so you
              can make informed decisions. Available around the clock, at no cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-serif text-sm font-semibold text-foreground">
              Lexbase
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Lexbase. Not a substitute for legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
