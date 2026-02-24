"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OrbProps {
    dimension?: string
    className?: string
    tones?: {
        base?: string
        accent1?: string
        accent2?: string
        accent3?: string
    }
    spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
    dimension = "192px",
    className,
    tones,
    spinDuration = 20,
}) => {
    const fallbackTones = {
        base: "oklch(95% 0.02 264.695)",
        accent1: "oklch(75% 0.15 350)",
        accent2: "oklch(80% 0.12 200)",
        accent3: "oklch(78% 0.14 280)",
    }

    const palette = { ...fallbackTones, ...tones }

    const dimValue = parseInt(dimension.replace("px", ""), 10)

    const blurStrength =
        dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

    const contrastStrength =
        dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

    const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

    const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

    const maskRadius =
        dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

    const adjustedContrast =
        dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

    return (
        <div
            className={cn("color-orb", className)}
            style={{
                width: dimension,
                height: dimension,
                "--base": palette.base,
                "--accent1": palette.accent1,
                "--accent2": palette.accent2,
                "--accent3": palette.accent3,
                "--spin-duration": `${spinDuration}s`,
                "--blur": `${blurStrength}px`,
                "--contrast": adjustedContrast,
                "--dot": `${pixelDot}px`,
                "--shadow": `${shadowRange}px`,
                "--mask": maskRadius,
            } as React.CSSProperties}
        >
            <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
        </div>
    )
}

const SPEED_FACTOR = 1

interface ContextShape {
    showForm: boolean
    successFlag: boolean
    isInitialGlow: boolean
    triggerOpen: () => void
    triggerClose: () => void
    onSubmit?: (message: string) => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

interface MorphPanelProps {
    onSubmit?: (message: string) => void;
    onOpen?: () => void;
}

export function MorphPanel({ onSubmit, onOpen }: MorphPanelProps) {
    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    const [showForm, setShowForm] = React.useState(false)
    const [successFlag, setSuccessFlag] = React.useState(false)
    const [isInitialGlow, setIsInitialGlow] = React.useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialGlow(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    const triggerClose = React.useCallback(() => {
        setShowForm(false)
        textareaRef.current?.blur()
    }, [])

    const triggerOpen = React.useCallback(() => {
        setIsInitialGlow(false)
        if (onOpen) onOpen(); // added onOpen
        setShowForm(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }, [onOpen]) // added onOpen to deps

    const handleSuccess = React.useCallback((message: string) => {
        // triggerClose() // Removed to persist window
        setSuccessFlag(true)
        setTimeout(() => setSuccessFlag(false), 1500)
        if (onSubmit) {
            onSubmit(message);
        }
    }, [onSubmit]) // Removed triggerClose from dependency

    React.useEffect(() => {
        function clickOutsideHandler(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
                triggerClose()
            }
        }

        let lastScrollY = window.scrollY;
        function scrollHandler() {
            const currentScrollY = window.scrollY;
            if (currentScrollY < lastScrollY && showForm && Math.abs(currentScrollY - lastScrollY) > 10) {
                // Scrolled up
                triggerClose();
            }
            lastScrollY = currentScrollY;
        }

        document.addEventListener("mousedown", clickOutsideHandler)
        window.addEventListener("scroll", scrollHandler, { passive: true })
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [showForm, triggerClose])

    const ctx = React.useMemo(
        () => ({ showForm, successFlag, isInitialGlow, triggerOpen, triggerClose, onSubmit: handleSuccess }),
        [showForm, successFlag, isInitialGlow, triggerOpen, triggerClose, handleSuccess]
    )

    return (
        <div className="flex items-center justify-center w-full" style={{ width: "100%", height: 60 }}>
            <motion.div
                ref={wrapperRef}
                data-panel
                className={cx(
                    "relative z-3 flex flex-col items-center overflow-hidden transition-all duration-300",
                    showForm
                        ? "border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-background/10 backdrop-blur-sm"
                        : isInitialGlow
                            ? "border border-primary/40 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-background/60 backdrop-blur-md"
                            : "bg-transparent"
                )}
                initial={false}
                animate={{
                    width: showForm ? "100%" : "auto",
                    height: showForm ? FORM_HEIGHT : 44,
                    borderRadius: showForm ? 32 : 22,
                }}
                transition={{
                    type: "spring",
                    stiffness: 550 / SPEED_FACTOR,
                    damping: 45,
                    mass: 0.7,
                    delay: showForm ? 0 : 0.08,
                }}
            >
                <FormContext.Provider value={ctx}>
                    <DockBar />
                    <InputForm ref={textareaRef} onSuccess={handleSuccess} />
                </FormContext.Provider>
            </motion.div>
        </div>
    )
}

function DockBar() {
    const { showForm, triggerOpen, isInitialGlow } = useFormContext()
    return (
        <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none w-full">
            <div
                className="flex items-center justify-center gap-2 px-3 max-sm:h-10 max-sm:px-2 w-full cursor-pointer"
                onClick={triggerOpen}
            >
                <div className="flex w-fit items-center gap-2">
                    <AnimatePresence mode="wait">
                        {showForm ? (
                            <motion.div
                                key="blank"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                className="h-5 w-5"
                            />
                        ) : (
                            <motion.div
                                key="orb-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3"
                            >
                                <ColorOrb dimension={isInitialGlow ? "28px" : "24px"} tones={{ base: "oklch(22.64% 0 0)" }} />
                                <AnimatePresence>
                                    {isInitialGlow && (
                                        <motion.span
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "auto", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden text-sm font-semibold text-primary/90 pr-2"
                                        >
                                            Lexbase Chat
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </footer>
    )
}

const FORM_HEIGHT = 100

function InputForm({ ref, onSuccess }: { ref: React.Ref<HTMLTextAreaElement>; onSuccess: (message: string) => void }) {
    const { triggerClose, showForm } = useFormContext()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message") as string;
        if (message?.trim()) {
            onSuccess(message);
            e.currentTarget.reset();
        }
    }

    function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Escape") triggerClose()
        if (e.key === "Enter" && e.metaKey) {
            e.preventDefault()
            btnRef.current?.click()
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0"
            style={{ width: "100%", height: FORM_HEIGHT, pointerEvents: showForm ? "all" : "none" }}
        >
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
                        className="flex h-full flex-col p-1 w-full"
                    >
                        <div className="flex justify-between py-1 px-2">
                            <div className="flex items-center gap-2 ml-auto">
                                <button
                                    type="submit"
                                    ref={btnRef}
                                    className="text-foreground flex cursor-pointer items-center justify-center gap-1 rounded-[12px] bg-transparent pr-1 text-center select-none hover:bg-muted/50 transition-colors p-1"
                                >
                                    <KeyHint>⌘</KeyHint>
                                    <KeyHint className="w-fit">Enter</KeyHint>
                                </button>
                                <button
                                    type="button"
                                    onClick={triggerClose}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <textarea
                            ref={ref}
                            placeholder="Ask me anything..."
                            name="message"
                            className="h-full w-full resize-none scroll-py-2 rounded-md p-4 outline-none bg-transparent text-sm placeholder:text-muted-foreground"
                            required
                            onKeyDown={handleKeys}
                            spellCheck={false}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-3 left-3"
                    >
                        <ColorOrb dimension="24px" tones={{ base: "oklch(22.64% 0 0)" }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    )
}



function KeyHint({ children, className }: { children: string; className?: string }) {
    return (
        <kbd
            className={cx(
                "text-muted-foreground flex h-5 w-fit items-center justify-center rounded-[4px] border border-border bg-muted px-[6px] font-sans text-[10px] font-medium shadow-[0px_1px_0px_0px_rgba(0,0,0,0.08)]",
                className
            )}
        >
            {children}
        </kbd>
    )
}

export default MorphPanel
