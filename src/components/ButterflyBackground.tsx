
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Helper to find visible valid landing spots
const getLandingSpots = () => {
    if (typeof document === 'undefined') return [];

    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, button, .card-content, img, span'));

    const visibleElements = elements.filter(el => {
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

const Butterfly = ({ isFlying, delay, mousePos, index }: { isFlying: boolean, delay: number, mousePos: { x: number, y: number }, index: number }) => {
    const controls = useAnimation();
    const wingControls = useAnimation();

    // Physics-based movement for mouse interaction
    const x = useMotionValue(Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000));
    const y = useMotionValue(Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000));

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
                duration: isFlying ? 0.6 : 3, // Fast when flying, slow breathing when resting
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [isFlying, wingControls]);

    useEffect(() => {
        if (isFlying) {
            // CHAOTIC FLIGHT MODE
            controls.start({
                x: [
                    null,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                ],
                y: [
                    null,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                ],
                rotate: [0, 15, -15, 10, -10, 0],
                transition: {
                    duration: 10 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }
            });
        } else {
            // LANDING MODE
            const spots = getLandingSpots();
            let destX, destY;

            if (spots.length > 0 && Math.random() > 0.2) { // 80% chance to land on element
                // Smart Distribution: Use index to round-robin through available spots
                // This prevents all butterflies from picking the same random element
                const el = spots[index % spots.length];

                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Add some randomness within the element
                    destX = rect.left + Math.random() * rect.width;
                    destY = rect.top + Math.random() * rect.height;
                } else {
                    // Fallback if accessed element is somehow undefined
                    destX = Math.random() * window.innerWidth;
                    destY = Math.random() * window.innerHeight;
                }
            } else {
                // Land anywhere
                destX = Math.random() * window.innerWidth;
                destY = Math.random() * window.innerHeight;
            }

            controls.start({
                x: destX,
                y: destY,
                rotate: Math.random() * 360,
                transition: {
                    duration: 2 + Math.random(),
                    type: "spring",
                    stiffness: 40
                }
            });
        }
    }, [isFlying, controls, index]);

    // Mouse Interaction: Fly away slightly if mouse gets too close
    useEffect(() => {
        if (!isFlying) {
            const dx = x.get() - mousePos.x;
            const dy = y.get() - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Scatter effect
                controls.start({
                    x: x.get() + (dx / distance) * 150, // Move away by 150px
                    y: y.get() + (dy / distance) * 150,
                    transition: { duration: 0.5, ease: "backOut" }
                });
            }
        }
    }, [mousePos, isFlying, controls, x, y]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={controls}
            whileInView={{ opacity: 0.9, scale: 1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.2, zIndex: 100 }}
            style={{ x: springX, y: springY }}
            className={`absolute pointer-events-auto z-40 transition-colors duration-300 cursor-pointer ${isHovered ? 'brightness-125' : ''}`}
        // Made pointer-events-auto so user can interact with them specifically
        >
            <motion.div animate={wingControls} className="origin-center">
                {/* Double Wing Layer for 3D Feel */}
                <svg width="25" height="25" viewBox="0 0 50 50" fill="none" className="drop-shadow-lg">
                    {/* Lower Wing (Gold) */}
                    <path d="M25 25 C 15 15, 5 15, 10 30 C 5 45, 20 45, 25 25" fill="#D4AF37" opacity="0.6" />
                    <path d="M25 25 C 35 15, 45 15, 40 30 C 45 45, 30 45, 25 25" fill="#D4AF37" opacity="0.6" />

                    {/* Upper Wing (Creamy White with Gold Border) */}
                    <path d="M25 25 C 20 5, 5 5, 10 25 C 5 35, 20 35, 25 25" fill="#FFF8DC" stroke="#D4AF37" strokeWidth="0.5" opacity="0.95" />
                    <path d="M25 25 C 30 5, 45 5, 40 25 C 45 35, 30 35, 25 25" fill="#FFF8DC" stroke="#D4AF37" strokeWidth="0.5" opacity="0.95" />

                    {/* Body */}
                    <path d="M25 15 L25 35" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />

                    {/* Interactive Click Effect Ripple (Hidden by default) */}
                    {isHovered && (
                        <circle cx="25" cy="25" r="20" stroke="#FFF" strokeWidth="1" opacity="0.5" className="animate-ping" />
                    )}
                </svg>
            </motion.div>
        </motion.div>
    );
};

export function ButterflyBackground() {
    const [mounted, setMounted] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [butterflyCount, setButterflyCount] = useState(8);

    useEffect(() => {
        setMounted(true);

        // Initial check for screen size
        const updateCount = () => {
            const isMobile = window.innerWidth < 768;
            setButterflyCount(isMobile ? 3 : 8);
        };

        updateCount();

        let scrollTimeout: NodeJS.Timeout;

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
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[50]">
            {[...Array(butterflyCount)].map((_, i) => (
                <Butterfly key={i} index={i} isFlying={isScrolling} delay={i * 0.3} mousePos={mousePos} />
            ))}
        </div>
    );
}
