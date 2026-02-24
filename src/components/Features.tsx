import { motion } from "framer-motion";
import { Shield, FileText, GraduationCap, Clock, Briefcase, Scale } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Student Visas",
    description: "Guidance on F-1, J-1, and M-1 student visa applications and requirements.",
  },
  {
    icon: Shield,
    title: "OPT & CPT",
    description: "Understand Optional and Curricular Practical Training eligibility and timelines.",
  },
  {
    icon: Briefcase,
    title: "Work Visas",
    description: "Learn about H-1B, L-1, O-1, and other employment-based visa categories.",
  },
  {
    icon: Clock,
    title: "Processing Times",
    description: "Real-time updates on USCIS processing timelines for student and work cases.",
  },
  {
    icon: FileText,
    title: "Status Changes",
    description: "Navigate change of status from student to worker and visa transfers.",
  },
  {
    icon: Scale,
    title: "Legal Resources (Coming soon)",
    description: "Connect with verified immigration attorneys and legal aid.",
  },
];

const Features = () => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Everything You Need to <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Navigate Immigration</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/80">
            Lexbase is trained on the latest policies to provide accurate, up-to-date guidance when you need it most.
          </p>
          <div className="mx-auto mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <p className="text-sm font-medium text-muted-foreground/70">
              Note: Lexbase is for informational purposes only and does not constitute legal advice.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/20">
                  <feature.icon className="h-6 w-6 text-foreground/80 transition-colors duration-500 group-hover:text-primary" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
