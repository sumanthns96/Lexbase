import { motion } from "framer-motion";
import { Shield, FileText, Users, Clock, Globe, Scale } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Visa Guidance",
    description: "Get instant answers about H-1B, L-1, O-1, and other work visas.",
  },
  {
    icon: FileText,
    title: "Green Card Info",
    description: "Learn about employment and family-based green card processes.",
  },
  {
    icon: Users,
    title: "Family Petitions",
    description: "Understand sponsorship options for family reunification.",
  },
  {
    icon: Clock,
    title: "Processing Times",
    description: "Real-time updates on USCIS processing timelines.",
  },
  {
    icon: Globe,
    title: "Asylum & Refugee",
    description: "Information on asylum applications and refugee status.",
  },
  {
    icon: Scale,
    title: "Legal Resources",
    description: "Connect with verified immigration attorneys and legal aid.",
  },
];

const Features = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            How We Can <span className="text-gradient-gold">Help You</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our AI assistant is trained on the latest immigration policies and procedures to provide you accurate, up-to-date guidance.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card-gradient p-6 transition-all hover:border-primary/30 hover:glow-gold"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
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
