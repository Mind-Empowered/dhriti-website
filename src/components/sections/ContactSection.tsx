import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Sparkles, Send, ShieldCheck, HeartHandshake, Instagram, Linkedin, Mail, X } from "lucide-react";
import { Button } from "../ui/button";

export function ContactSection() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <section id="contact" className="py-24 md:py-40 bg-[#fffaf0] border-y border-[#D4AF37]/10 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[5%] text-[#800020]/5"
                >
                    <Heart className="w-64 h-64" fill="currentColor" />
                </motion.div>
                <div className="absolute top-[-10%] left-[-5%] w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#D4AF37]/20 p-8 md:p-16 text-center">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#800020] via-[#D4AF37] to-[#800020]"></div>

                        {/* Decorative Icons */}
                        <motion.div
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 text-[#D4AF37]/20 hidden md:block"
                        >
                            <MessageCircle className="w-32 h-32" />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-10 left-10 text-[#800020]/10 hidden md:block"
                        >
                            <HeartHandshake className="w-24 h-24" />
                        </motion.div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#800020]/5 border border-[#800020]/10 text-[#800020] text-sm font-bold uppercase tracking-wider mb-8">
                                    <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Safe & Anonymous Space
                                </div>

                                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2A0A12] leading-tight">
                                    Voice Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800020] to-[#D4AF37]">Worries</span>
                                </h2>

                                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                    If you or anyone you know is going through a tough time, feeling traumatized, scared, lost, or lonely—we are here to listen.
                                    <br className="hidden md:block" />
                                    Share your thoughts anonymously, and let our experts address them at the festival.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                                    <div className="bg-[#fffaf0] p-6 rounded-2xl border border-[#D4AF37]/10">
                                        <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-4" />
                                        <h4 className="font-bold text-[#800020] mb-2">100% Anonymous</h4>
                                        <p className="text-sm text-gray-600">Your identity remains completely hidden. We value your privacy above all.</p>
                                    </div>
                                    <div className="bg-[#fffaf0] p-6 rounded-2xl border border-[#D4AF37]/10">
                                        <MessageCircle className="w-8 h-8 text-[#D4AF37] mb-4" />
                                        <h4 className="font-bold text-[#800020] mb-2">Expert Answers</h4>
                                        <p className="text-sm text-gray-600">Selected questions will be answered live by mental health experts.</p>
                                    </div>
                                    <div className="bg-[#fffaf0] p-6 rounded-2xl border border-[#D4AF37]/10">
                                        <Heart className="w-8 h-8 text-[#D4AF37] mb-4" />
                                        <h4 className="font-bold text-[#800020] mb-2">Safe Support</h4>
                                        <p className="text-sm text-gray-600">A judgment-free zone to express your overwhelming emotions.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <Button
                                        onClick={() => setIsFormOpen(true)}
                                        className="bg-[#800020] hover:bg-[#600018] text-white px-10 py-8 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            Share Your Thoughts Now <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#A0153E] to-[#800020] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </Button>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Secure Google Form
                                    </p>

                                    {/* Social Media Links */}
                                    <div className="flex items-center gap-6 mt-8">
                                        <a
                                            href="https://www.instagram.com/mind.empowered?igsh=bGNmYXI1czlrcDhi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white border border-[#800020]/10 text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                            aria-label="Instagram"
                                        >
                                            <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/company/mind-empowered/posts/?feedView=all"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white border border-[#800020]/10 text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        </a>
                                        <a
                                            href="mailto:mindemowered2020@gmail.com"
                                            className="p-3 rounded-full bg-white border border-[#800020]/10 text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                            aria-label="Email"
                                        >
                                            <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Google Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFormOpen(false)}
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
                                    <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Share Your Thoughts
                                </h3>
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                    aria-label="Close form"
                                >
                                    <X className="w-6 h-6 text-[#800020]" />
                                </button>
                            </div>
                            <div className="flex-1 bg-white relative">
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSdRdX19XoYFkuJq3yklwYireMzul6zZyRIF-oKlFEWxf3BG7A/viewform?embedded=true"
                                    className="absolute inset-0 w-full h-full border-0"
                                    title="Feedback Form"
                                >
                                    Loading...
                                </iframe>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
