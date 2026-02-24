import { useState, useRef, useEffect } from "react";
import { X, ShieldAlert, Bot, Scale, ShieldX, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface TermsDialogProps {
    isOpen: boolean;
    onAgree: () => void;
    onDecline: () => void;
}

export function TermsDialog({ isOpen, onAgree, onDecline }: TermsDialogProps) {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Reset scroll state when dialog opens and manage body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setHasScrolledToBottom(false);
            // Small timeout to check if content is small enough to not need scrolling
            setTimeout(() => {
                if (scrollRef.current) {
                    const { scrollHeight, clientHeight } = scrollRef.current;
                    if (scrollHeight <= clientHeight + 5) {
                        setHasScrolledToBottom(true);
                    }
                }
            }, 100);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

        // Check if scrolled to bottom (with 20px buffer)
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setHasScrolledToBottom(true);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/90 backdrop-blur-md"
                    onClick={onDecline}
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-black border border-border rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[60vh] min-h-0"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-5 border-b border-border bg-muted/20">
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-lg font-semibold tracking-tight uppercase">LEXBASE — Terms of Use & Consent</h2>
                            <span className="text-sm text-muted-foreground">Please read before continuing</span>
                        </div>
                        <button
                            onClick={onDecline}
                            className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Content Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar"
                    >
                        {/* Section 1: What Lexbase is NOT */}
                        <section>
                            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide uppercase">
                                What Lexbase Is NOT
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Lexbase is an AI-powered immigration information assistant. It is not a lawyer, not a law firm, and does not provide legal advice. Nothing you receive from Lexbase constitutes legal counsel. Lexbase is not affiliated with USCIS, the U.S. Department of State, or any government agency.
                            </p>
                        </section>

                        {/* Section 2: AI Tech */}
                        <section>
                            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide uppercase">
                                How Lexbase Works — AI Technology
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                                Lexbase runs on third-party AI systems. Every message you send is processed by:
                            </p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground pl-4 list-disc opacity-90">
                                <li><strong>OpenAI GPT-5</strong> — generates responses</li>
                                <li><strong>OpenAI GPT-4o-mini</strong> — classifies your intent before routing your query</li>
                                <li><strong>ElevenLabs API</strong> — powers the voice interface</li>
                            </ul>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                                Your inputs are transmitted to and processed by these external platforms, each governed by their own privacy policies.
                            </p>
                        </section>

                        {/* Section 3: Do Not Share */}
                        <section>
                            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide uppercase">
                                Do Not Share Personal Information
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                                Because your messages are sent to third-party AI models, do not share:
                            </p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground pl-4 list-disc opacity-90">
                                <li>Social Security Numbers (SSN) or A-Numbers</li>
                                <li>Passport or visa numbers / USCIS receipt numbers</li>
                                <li>Full date of birth with name and address</li>
                                <li>Financial account details or tax information</li>
                                <li>Any document you would not share publicly</li>
                            </ul>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-3 border-l-2 border-primary/40 pl-3">
                                Ask general questions only. You do not need personal case details to get useful guidance.
                            </p>
                        </section>

                        {/* Section 4: Liability */}
                        <section>
                            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide uppercase">
                                No Legal Advice — No Liability
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed pb-2">
                                Information from Lexbase is general and educational only. It may be outdated, incomplete, or inapplicable to your situation. Immigration decisions carry serious legal consequences including visa denial, loss of status, or deportation. Lexbase and its operators accept no liability for any immigration outcome resulting from your use of this service. Always consult a licensed immigration attorney before taking any action.
                            </p>
                        </section>

                        {/* Agreement Checklist summary */}
                        <div className="pt-5 border-t border-border">
                            <p className="text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">
                                Consent
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">By clicking "I Agree & Continue" you confirm that:</p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground pl-4 list-disc">
                                <li>You understand Lexbase is an AI assistant, not a lawyer.</li>
                                <li>You will not share sensitive personal or case information.</li>
                                <li>You understand your messages are processed by OpenAI and ElevenLabs.</li>
                                <li>You will consult a licensed attorney for case-specific legal advice.</li>
                                <li>You will not hold Lexbase liable for any immigration consequences.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 py-4 border-t border-border bg-muted/10 relative">
                        {/* Read to bottom warning */}
                        <AnimatePresence>
                            {!hasScrolledToBottom && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-10 left-0 w-full text-xs font-medium text-foreground/80 flex justify-center drop-shadow-md"
                                >
                                    <span className="bg-background/90 px-3 py-1 rounded-full border border-border">
                                        Please scroll to the bottom to agree
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-lg h-10 border-border font-medium"
                                onClick={onDecline}
                            >
                                I do not agree
                            </Button>
                            <Button
                                className="flex-1 rounded-lg h-10 font-bold"
                                disabled={!hasScrolledToBottom}
                                onClick={onAgree}
                            >
                                I Agree & Continue
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
