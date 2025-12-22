
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Helper to find visible valid landing spots
const getLandingSpots = () => {
    if (typeof document === 'undefined') return [];

    // Select containers, images, and structural elements. explicitly avoid text tags.
    const elements = Array.from(document.querySelectorAll('button, img, section, .card, .border, [class*="rounded-"], [class*="bg-"]'));

    const visibleElements = elements.filter(el => {
        // Double check to ensure we didn't accidentally pick up a text element with a class
        const tagName = el.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'i', 'b', 'strong'].includes(tagName)) return false;

        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 50 &&
            rect.left >= 20 &&
            rect.bottom <= (window.innerHeight - 50) &&
            rect.right <= (window.innerWidth - 20) &&
            rect.width > 20 && rect.height > 20
        );
    });

    return visibleElements;
};

const isOverlappingText = (x: number, y: number) => {
    if (typeof document === 'undefined') return false;
    // Check collision with text elements. Adding a buffer for the butterfly size.
    // limiting to block-level-ish text to avoid checking every single span in intricate layouts if possible, 
    // but including span for safety as many styled texts use it.
    const textEls = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, a, label, strong, em');

    for (const el of textEls) {
        const rect = el.getBoundingClientRect();
        // Simple point-in-rect check with buffer
        if (
            x >= rect.left - 20 && x <= rect.right + 20 &&
            y >= rect.top - 20 && y <= rect.bottom + 20
        ) {
            return true;
        }
    }
    return false;
};

const Butterfly = ({ isFlying, delay, mousePos, index, isSpecial, onClick, attractionTarget }: { isFlying: boolean, delay: number, mousePos: { x: number, y: number }, index: number, isSpecial?: boolean, onClick?: () => void, attractionTarget?: HTMLElement | null }) => {
    const controls = useAnimation();
    const rotateControls = useAnimation(); // New controller for rotation only
    const wingControls = useAnimation();

    // Physics-based movement for mouse interaction
    const initialX = isSpecial && typeof window !== 'undefined' ? window.innerWidth / 2 + (Math.random() * 200 - 100) : Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
    const initialY = isSpecial && typeof window !== 'undefined' ? window.innerHeight / 2 + (Math.random() * 200 - 100) : Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000);

    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);

    // Smooth spring animation for mouse following/avoiding
    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Continuous wing flapping
        wingControls.start({
            scaleX: [1, 0.2, 1], // Flapping effect
            transition: {
                duration: isFlying ? 0.8 : 4, // Fast when flying, slow breathing when resting
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [isFlying, wingControls]);

    // Initial fade in
    useEffect(() => {
        controls.start({ opacity: 0.9, scale: 1, transition: { duration: 1 } });
    }, [controls]);

    useEffect(() => {
        if (isHovered) return;

        if (isFlying) {
            // CHAOTIC FLIGHT MODE - Position
            controls.start({
                x: [
                    null,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                ],
                y: [
                    null,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                ],
                opacity: 0.9,
                scale: 1,
                transition: {
                    duration: 15 + Math.random() * 15, // Reduced min duration for faster dispersal
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear" // Linear ease prevents 'hanging' at endpoints, making it look more continuous
                }
            });

            // CHAOTIC FLIGHT MODE - Rotation (Separate)
            rotateControls.start({
                rotate: [0, 15, -15, 10, -10, 0],
                transition: {
                    duration: 25 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }
            });

        } else {
            // LANDING MODE
            const spots = getLandingSpots();
            let destX, destY;

            // PRIORITY: Check for Attraction Target (Swarm Mode)
            if (attractionTarget) {
                const rect = attractionTarget.getBoundingClientRect();
                // Check if target is actually in viewport/visible
                const isVisible = (
                    rect.top >= -100 &&
                    rect.left >= -100 &&
                    rect.bottom <= (window.innerHeight + 100) &&
                    rect.right <= (window.innerWidth + 100)
                );

                if (isVisible) {
                    // Swarm the center with some randomness
                    destX = rect.left + (rect.width / 2) + ((Math.random() - 0.5) * rect.width * 1.5); // Spread slightly wider than the box
                    destY = rect.top + (rect.height / 2) + ((Math.random() - 0.5) * rect.height * 1.5);
                } else {
                    // Fallback if target is off-screen
                    // We must set destX/destY here to avoid undefined usage later if we fall through
                    destX = Math.random() * window.innerWidth;
                    destY = Math.random() * window.innerHeight;
                }
            }
            // NORMAL LANDING LOGIC
            else if (spots.length > 0 && Math.random() > 0.1) { // 90% chance to land on element
                // Smart Distribution: Use index to round-robin through available spots
                // For Special Butterfly, pick RANDOM spot to avoid getting stuck on a hidden first element
                const spotIndex = isSpecial ? Math.floor(Math.random() * spots.length) : (index % spots.length);
                const el = spots[spotIndex];

                if (el) {
                    const rect = el.getBoundingClientRect();

                    // LAND ON PERIMETER/BORDER LOGIC
                    const side = Math.floor(Math.random() * 4); // 0: Top, 1: Right, 2: Bottom, 3: Left

                    switch (side) {
                        case 0: // Top Edge
                            destX = rect.left + Math.random() * rect.width;
                            destY = rect.top;
                            break;
                        case 1: // Right Edge
                            destX = rect.right;
                            destY = rect.top + Math.random() * rect.height;
                            break;
                        case 2: // Bottom Edge
                            destX = rect.left + Math.random() * rect.width;
                            destY = rect.bottom;
                            break;
                        case 3: // Left Edge
                            destX = rect.left;
                            destY = rect.top + Math.random() * rect.height;
                            break;
                        default:
                            destX = rect.left;
                            destY = rect.top;
                    }

                } else {
                    destX = Math.random() * window.innerWidth;
                    destY = Math.random() * window.innerHeight;
                }
            } else {
                // Land anywhere
                destX = Math.random() * window.innerWidth;
                destY = Math.random() * window.innerHeight;
            }

            // SAFETY CHECK: If landing spot is on text, force it to screen edges
            if (isOverlappingText(destX, destY)) {
                const side = Math.floor(Math.random() * 4);
                const buffer = isSpecial ? 70 : 30; // Increased buffer for Mascot
                switch (side) {
                    case 0: // Top
                        destX = Math.random() * window.innerWidth;
                        destY = buffer;
                        break;
                    case 1: // Right
                        destX = window.innerWidth - buffer;
                        destY = Math.random() * window.innerHeight;
                        break;
                    case 2: // Bottom
                        destX = Math.random() * window.innerWidth;
                        destY = window.innerHeight - buffer;
                        break;
                    case 3: // Left
                        destX = buffer;
                        destY = Math.random() * window.innerHeight;
                        break;
                }
            }

            // animate position
            controls.start({
                x: destX,
                y: destY,
                opacity: 0.9,
                scale: 1,
                transition: {
                    duration: 5 + Math.random() * 2,
                    type: "spring",
                    stiffness: 40
                }
            });

            // animate rotation
            rotateControls.start({
                rotate: Math.random() * 360,
                transition: {
                    duration: 5 + Math.random() * 2,
                    type: "spring",
                    stiffness: 40
                }
            });
        }
    }, [isFlying, controls, rotateControls, index, isHovered, attractionTarget]);

    // Mouse Interaction: Fly away slightly if mouse gets too close
    // Mouse Interaction: Fly away slightly if mouse gets too close
    // DISABLE SCATTER for Special Mascot to make it easier to click
    useEffect(() => {
        if (!isFlying && !isSpecial) {
            const dx = x.get() - mousePos.x;
            const dy = y.get() - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Scatter effect
                controls.start({
                    x: x.get() + (dx / distance) * 150, // Move away by 150px
                    y: y.get() + (dy / distance) * 150,
                    transition: { duration: 1.0, ease: "backOut" }
                });
            }
        }
    }, [mousePos, isFlying, controls, x, y, isSpecial]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={controls}
            onHoverStart={() => { setIsHovered(true); controls.stop(); rotateControls.stop(); }} // Stop movement on hover to make clicking easier
            onHoverEnd={() => { setIsHovered(false); }}
            whileHover={{ scale: isSpecial ? 1.5 : 1.2, zIndex: 100 }}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            className={`absolute pointer-events-auto z-40 transition-colors duration-300 cursor-pointer ${isHovered ? 'brightness-125' : ''}`}
        // Made pointer-events-auto so user can interact with them specifically
        >
            {/* Invisible Hit Area Expansion for easier clicking */}
            <div className="absolute -inset-10 bg-transparent z-50 rounded-full" />

            {/* Bubble moved OUTSIDE rotating container to stay upright */}
            {isSpecial && !isFlying && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.8, 1, 1, 0.9],
                        y: [15, 0, 0, 10]
                    }}
                    transition={{
                        duration: 5, // Visible for 5s
                        times: [0, 0.15, 0.85, 1], // Smooth entry/exit
                        repeat: Infinity,
                        repeatDelay: 8, // Longer pause (8s) to be less annoying
                        delay: 3,
                        ease: "easeInOut"
                    }}
                    onClick={(e) => { e.stopPropagation(); onClick?.(); }} // Allow clicking the bubble too
                    className="absolute -top-14 -right-12 z-[60] cursor-pointer group"
                >
                    <div className="relative px-3 py-1.5 bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center gap-2 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_#FFD700]" />
                        <span className="text-[10px] tracking-widest font-medium text-[#FFE4B5] uppercase">Click Me</span>
                    </div>
                    {/* Connecting Line */}
                    <div className="absolute left-1/2 -bottom-2 w-[1px] h-2 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
                </motion.div>
            )}

            {/* Rotating Container for Butterfly Body/Wings */}
            <motion.div animate={rotateControls}>
                <motion.div animate={wingControls} className="origin-center relative">
                    {/* Special Glow & Sparkle Effect */}
                    {isSpecial && (
                        <motion.div
                            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-[#FFD700] blur-xl rounded-full -z-10"
                        />
                    )}

                    {/* Double Wing Layer for 3D Feel */}
                    <svg width={isSpecial ? "50" : "25"} height={isSpecial ? "50" : "25"} viewBox="0 0 50 50" fill="none" className="drop-shadow-lg">
                        {/* Lower Wing (Gold / Pink for Special) */}
                        <path d="M25 25 C 15 15, 5 15, 10 30 C 5 45, 20 45, 25 25" fill={isSpecial ? "#FF1493" : "#D4AF37"} opacity={isSpecial ? "0.9" : "0.6"} />
                        <path d="M25 25 C 35 15, 45 15, 40 30 C 45 45, 30 45, 25 25" fill={isSpecial ? "#FF1493" : "#D4AF37"} opacity={isSpecial ? "0.9" : "0.6"} />

                        {/* Upper Wing (Creamy White / Pinkish White for Special) */}
                        <path d="M25 25 C 20 5, 5 5, 10 25 C 5 35, 20 35, 25 25" fill={isSpecial ? "#FFF0F5" : "#FFF8DC"} stroke={isSpecial ? "#C71585" : "#D4AF37"} strokeWidth={isSpecial ? "1" : "0.5"} opacity="0.95" />
                        <path d="M25 25 C 30 5, 45 5, 40 25 C 45 35, 30 35, 25 25" fill={isSpecial ? "#FFF0F5" : "#FFF8DC"} stroke={isSpecial ? "#C71585" : "#D4AF37"} strokeWidth={isSpecial ? "1" : "0.5"} opacity="0.95" />

                        {/* Body */}
                        <path d="M25 15 L25 35" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />

                        {/* Interactive Click Effect Ripple (Hidden by default) */}
                        {isHovered && (
                            <circle cx="25" cy="25" r="20" stroke="#FFF" strokeWidth="1" opacity="0.5" className="animate-ping" />
                        )}
                    </svg>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export function ButterflyBackground({ attractionTarget }: { attractionTarget?: HTMLElement | null }) {
    const [mounted, setMounted] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [butterflyCount, setButterflyCount] = useState(8);
    const [showMascotPopup, setShowMascotPopup] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Initial check for screen size
        const updateCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setButterflyCount(3); // Mobile: 3
            } else if (width < 1024) {
                setButterflyCount(6); // Tablet: 6
            } else {
                setButterflyCount(9); // Desktop: 9
            }
        };

        updateCount();

        let scrollTimeout: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => setIsScrolling(false), 800);
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleResize = () => {
            updateCount();
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            clearTimeout(scrollTimeout);
        };
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-[90]">
                {[...Array(butterflyCount)].map((_, i) => (
                    <Butterfly
                        key={i}
                        index={i}
                        isFlying={isScrolling}
                        delay={i * 0.3}
                        mousePos={mousePos}
                        isSpecial={i === 0}
                        onClick={i === 0 ? () => setShowMascotPopup(true) : undefined}
                        attractionTarget={attractionTarget}
                    />
                ))}
            </div>

            {/* Mascot Info Popup */}
            {showMascotPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
                    onClick={() => setShowMascotPopup(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl border-2 border-[#D4AF37]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowMascotPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-[#800020] transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#FFF8DC] to-[#FFE4B5] rounded-full flex items-center justify-center border-2 border-[#D4AF37] shadow-inner mb-2 relative">
                                <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-20 animate-pulse rounded-full"></div>
                                <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                                    <path d="M25 25 C 15 15, 5 15, 10 30 C 5 45, 20 45, 25 25" fill="#FF69B4" opacity="0.6" />
                                    <path d="M25 25 C 35 15, 45 15, 40 30 C 45 45, 30 45, 25 25" fill="#FF69B4" opacity="0.6" />
                                    <path d="M25 25 C 20 5, 5 5, 10 25 C 5 35, 20 35, 25 25" fill="#FFF0F5" stroke="#FF1493" strokeWidth="0.5" />
                                    <path d="M25 25 C 30 5, 45 5, 40 25 C 45 35, 30 35, 25 25" fill="#FFF0F5" stroke="#FF1493" strokeWidth="0.5" />
                                    <path d="M25 15 L25 35" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-[#800020]">Meet Our Mascot</h3>
                            <div className="w-16 h-1 bg-[#D4AF37] rounded-full"></div>

                            <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                                <p className="mb-3">
                                    The <strong>Butterfly</strong> symbolizes <span className="text-[#800020] font-semibold">transformation</span>, hope, and the resilience of the human spirit.
                                </p>
                                <p>
                                    Just as a butterfly emerges from a cocoon, we believe in the power of every individual to rise, evolve, and find their wings. At Dhriti, we celebrate this journey of healing and growth.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowMascotPopup(false)}
                                className="mt-6 px-6 py-2 bg-[#800020] text-white rounded-full font-semibold hover:bg-[#A0153E] transition-colors shadow-lg active:scale-95"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
