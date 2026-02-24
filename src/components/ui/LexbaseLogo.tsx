import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from "@/lib/utils";

interface LexbaseLogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    animateGavel?: boolean;
}

const LexbaseLogo: React.FC<LexbaseLogoProps> = ({ className, animateGavel = true, ...props }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            className={cn("w-8 h-8", className)}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* L Shape */}
            <path
                d="M25 25 V 70 Q 25 75 30 75 H 65 V 60 H 42 Q 40 60 40 58 V 25 Z"
                fill="currentColor"
            />

            {/* Network Nodes */}
            <g stroke="currentColor" strokeWidth="0.5" fill="currentColor">
                <circle cx="38" cy="40" r="1.5" />
                <circle cx="48" cy="35" r="1.5" />
                <circle cx="52" cy="46" r="1" />
                <circle cx="42" cy="50" r="1" />
                <circle cx="55" cy="40" r="1.5" />

                <line x1="38" y1="40" x2="48" y2="35" />
                <line x1="48" y1="35" x2="52" y2="46" />
                <line x1="52" y1="46" x2="42" y2="50" />
                <line x1="42" y1="50" x2="38" y2="40" />
                <line x1="48" y1="35" x2="55" y2="40" />
            </g>

            {/* Curved Arrow */}
            {/* Starting bottom-left, sweeping up-right */}
            <path
                d="M 15 50 C 35 70, 65 60, 80 20 L 72 17 L 88 10 L 85 27 L 78 23 C 65 53, 40 63, 15 50 Z"
                fill="currentColor"
            />

            {/* Gavel */}
            <motion.g
                initial={animateGavel ? { rotate: 0 } : false}
                animate={animateGavel ? { rotate: [-15, 5, 0, -15] } : false}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                }}
                style={{ transformOrigin: "60px 60px" }}
            >
                {/* Handle */}
                <line x1="60" y1="60" x2="85" y2="85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />

                {/* Gavel Head Body */}
                <rect x="48" y="53" width="24" height="14" rx="2" transform="rotate(-45 60 60)" fill="currentColor" />
                {/* Gavel Head Striking pads */}
                <rect x="45" y="55" width="3" height="10" rx="1" transform="rotate(-45 60 60)" fill="currentColor" />
                <rect x="72" y="55" width="3" height="10" rx="1" transform="rotate(-45 60 60)" fill="currentColor" />
            </motion.g>
        </svg>
    );
};

export default LexbaseLogo;
