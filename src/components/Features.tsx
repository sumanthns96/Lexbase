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
    title: "Legal Resources",
    description: "Connect with verified immigration attorneys and legal aid.",
  },
];

const Features = () => {
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            How We Can <span className="text-gradient-gold">Help</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Trained on the latest immigration policies to provide accurate, up-to-date guidance.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-primary/20 hover:glow-primary"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
