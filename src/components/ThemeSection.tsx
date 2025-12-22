
import { motion } from "framer-motion";
import { Sparkles, Quote, Shield, TrendingUp, Users } from "lucide-react";

export function ThemeSection() {
    return (
        <div className="container mx-auto px-6 mb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-5xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#800020]/5 border border-[#800020]/10 text-[#800020] font-bold text-sm mb-8 uppercase tracking-widest shadow-sm">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Theme of 2026
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>

                <h2 className="text-5xl md:text-7xl font-bold text-[#800020] mb-12 leading-tight relative inline-block">
                    Celebrating{" "}
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B4941F] to-[#D4AF37] bg-300% animate-gradient">
                            Resilience
                        </span>
                        <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#D4AF37]" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
                        </svg>
                    </span>
                </h2>

                <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#800020] to-[#D4AF37] rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-700"></div>

                    <div className="bg-[#FFFaf0] rounded-[2rem] p-8 md:p-14 shadow-2xl border border-[#D4AF37]/20 relative overflow-hidden isolate">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                                <path d="M0 100 Q 50 120 100 80 T 200 150 T 300 100 T 400 180" stroke="#D4AF37" strokeWidth="2" fill="none" />
                                <path d="M400 300 Q 350 280 300 320 T 200 250 T 100 300 T 0 220" stroke="#D4AF37" strokeWidth="2" fill="none" />
                                <path d="M150 0 Q 180 50 140 100 T 180 200" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                                <path d="M250 400 Q 220 350 260 300 T 220 200" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20"
                        />
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 left-0 w-64 h-64 bg-[#800020]/5 rounded-full blur-3xl -ml-20 -mb-20"
                        />

                        <Quote className="absolute top-10 left-10 w-16 h-16 text-[#D4AF37]/20" />

                        <div className="space-y-8 text-lg md:text-2xl text-[#3E2723] leading-relaxed font-light relative z-10 font-serif">
                            <p>
                                This year, Dhriti honors the <span className="font-semibold text-[#800020]">indomitable human spirit</span>.
                                Resilience is not about never falling; it is about the <i className="text-[#800020]">courage to rise</i>, again and again.
                            </p>
                            <p className="text-base md:text-xl text-[#3E2723]/80">
                                Just like the art of <span className="font-semibold text-[#D4AF37]">Kintsugi</span> repairs broken pottery with gold,
                                we celebrate our scars not as flaws, but as beautiful proof of our survival and strength.
                            </p>
                        </div>

                        <div className="flex flex-row justify-center md:grid md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16 pt-8 md:pt-12 border-t border-[#D4AF37]/20">
                            {[
                                { icon: Shield, title: "Strength", desc: "Finding power in vulnerability" },
                                { icon: TrendingUp, title: "Growth", desc: "Evolving through challenges" },
                                { icon: Users, title: "Support", desc: "Lifting each other up" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex-1 text-center group/item hover:-translate-y-1 transition-transform duration-300">
                                    <div className="w-12 h-12 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-[#FFF8DC] to-[#FFE4B5] rounded-xl md:rounded-2xl rotate-3 group-hover/item:rotate-6 transition-transform duration-300 shadow-lg border border-[#D4AF37]/20 flex items-center justify-center mb-3 md:mb-6">
                                        <item.icon className="w-6 h-6 md:w-10 md:h-10 text-[#800020] group-hover/item:text-[#D4AF37] transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-sm md:text-xl text-[#800020] mb-1 md:mb-3">{item.title}</h3>
                                    <p className="text-[#3E2723]/70 text-[10px] md:text-base leading-tight md:leading-normal">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
