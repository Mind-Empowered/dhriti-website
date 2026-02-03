import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface VolunteerModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function VolunteerModal({ isOpen, onOpenChange }: VolunteerModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl h-[85vh] shadow-2xl relative z-10 flex flex-col"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-[#D4AF37]/20 bg-[#FAF9F6]">
                            <h3 className="text-xl font-bold text-[#800020] flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Join as Volunteer
                            </h3>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                aria-label="Close form"
                            >
                                <X className="w-6 h-6 text-[#800020]" />
                            </button>
                        </div>
                        <div className="flex-1 bg-white relative">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfePtLZkWoIhhsnl2Bry1afXVySetPY1rwEgGcO0fxvEOuDPg/viewform?embedded=true"
                                className="absolute inset-0 w-full h-full border-0"
                                title="Volunteer Registration Form"
                            >
                                Loading...
                            </iframe>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
