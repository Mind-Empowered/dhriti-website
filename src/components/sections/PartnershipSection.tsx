import { motion } from "framer-motion";
import { Award, Target, Handshake, Building2, HeartPulse, Leaf, Tv, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnershipSection() {
    const CURRENT_PARTNERS = [
        {
            name: "Partner Name",
            role: "Title Sponsor",
            icon: HeartPulse,
            color: "text-gray-800",
            bg: "bg-gray-50",
            border: "border-gray-200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            name: "Partner Name",
            role: "Sustainability Partner",
            icon: Leaf,
            color: "text-gray-800",
            bg: "bg-gray-50",
            border: "border-gray-200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            name: "Partner Name",
            role: "Media Partner",
            icon: Tv,
            color: "text-gray-800",
            bg: "bg-gray-50",
            border: "border-gray-200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            name: "Partner Name",
            role: "Food Partner",
            icon: Coffee,
            color: "text-gray-800",
            bg: "bg-gray-50",
            border: "border-gray-200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        }
    ];

    return (
        <section id="partnership" className="py-20 md:py-32 bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#800020] mb-4">
                            Partner with Dhriti
                        </h2>
                        <p className="text-xl text-[#3E2723] max-w-2xl mx-auto">
                            Align your organization with Kerala's groundbreaking mental health initiative
                        </p>
                        <div className="inline-block mt-4 px-4 py-2 bg-[#D4AF37]/20 rounded-lg hidden md:inline-block">
                            <p className="text-[#800020] font-semibold">
                                Perfect timing for March CSR closing
                            </p>
                        </div>
                    </div>

                    {/* Impact Stats / Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-16">
                        {[
                            {
                                icon: Award,
                                title: "High-Visibility Branding",
                                description: "Prominent logo placement across festival materials, social media campaigns, and community touchpoints reaching thousands."
                            },
                            {
                                icon: Target,
                                title: "CSR Alignment",
                                description: "Direct contribution to UN SDG 3 (Good Health & Well-being) and SDG 4 (Quality Education) with measurable community impact."
                            },
                            {
                                icon: Handshake,
                                title: "Employee Engagement",
                                description: "Unique volunteering opportunities for your team to actively participate in breaking mental health stigma."
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-[#800020]/20 hover:bg-white/80 transition-all duration-300 flex items-start gap-4">
                                    <benefit.icon className="w-8 h-8 text-[#800020] shrink-0" />
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-[#3E2723] mb-1">{benefit.title}</h3>
                                        <p className="text-[#3E2723]/80 text-sm hidden md:block">{benefit.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Current Partners Section */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-[#800020] text-center mb-8 flex items-center justify-center gap-3">
                            <Handshake className="w-6 h-6" /> Proudly Supported By
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {CURRENT_PARTNERS.map((partner, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={`
                                        bg-white rounded-2xl p-6 flex flex-col items-center justify-center 
                                        text-center shadow-lg hover:shadow-xl transition-all
                                        border border-gray-100 hover:border-[#D4AF37]/30
                                        group relative overflow-hidden
                                    `}
                                >
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <partner.icon className="w-24 h-24 rotate-12" />
                                    </div>

                                    <div className={`
                                        w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 
                                        flex items-center justify-center mb-4 shadow-inner 
                                        border border-gray-200 group-hover:scale-110 transition-transform duration-500
                                    `}>
                                        <span className="text-xs text-gray-400 font-serif italic">Logo</span>
                                    </div>

                                    <div className="relative z-10">
                                        <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-[#800020] transition-colors">
                                            {partner.name}
                                        </h4>
                                        <div className="inline-block px-3 py-1 rounded-full bg-gray-100 mb-3 group-hover:bg-[#800020]/5 transition-colors">
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${partner.color}`}>
                                                {partner.role}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed px-2">
                                            {partner.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Open Opportunities */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-[#800020] text-center mb-8">Open Opportunities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Tech Partner",
                                "Venue Partner",
                                "Gift Partner",
                                "Community Partner"
                            ].map((role, index) => (
                                <div
                                    key={index}
                                    className="border-2 border-dashed border-[#800020]/30 bg-white/40 rounded-xl p-3 md:p-6 flex flex-col items-center justify-center aspect-[2/1] md:aspect-video group hover:bg-[#800020]/5 hover:border-[#800020]/50 transition-all cursor-pointer"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#800020]/10 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-[#800020] group-hover:text-white transition-all">
                                        <span className="text-[#800020] text-xl md:text-2xl group-hover:text-white font-bold">+</span>
                                    </div>
                                    <span className="text-[#3E2723] font-medium text-xs md:text-sm text-center group-hover:text-[#800020]">{role}</span>
                                    <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Join Us
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            size="lg"
                            className="bg-[#D4AF37] hover:bg-[#C4A137] text-[#8B4513] font-bold text-lg px-10 py-6 h-auto shadow-2xl"
                        >
                            <Building2 className="w-5 h-5" />
                            Become a Partner
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
