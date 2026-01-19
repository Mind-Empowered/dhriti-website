import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
    return (
        <section id="faq" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#800020] mb-4">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <Accordion type="single" collapsible className="w-full">
                    {[
                        {
                            q: "Is the festival free to attend?",
                            a: "Yes! Dhriti is an open community festival. Most activities, stalls, and performances are free for everyone. Some specialized workshops may have a nominal registration fee to cover materials."
                        },
                        {
                            q: "Who can attend the festival?",
                            a: "Everyone! Dhriti is designed for all age groups - from children to the elderly. We have specific activities curated for youth, families, and seniors."
                        },
                        {
                            q: "Where is the festival taking place?",
                            a: "The festival will be held at Pallathuraman Memorial Park, Thamaraparambu, Kochi. Detailed venue maps and accessibility guides are available in the Venue section."
                        },
                        {
                            q: "How can I volunteer?",
                            a: "We love our volunteers! You can sign up through the 'Join the Movement' button above. We have roles in event management, stall coordination, and guest guidance."
                        },
                        {
                            q: "Is there parking available?",
                            a: "Yes, there is ample parking at the venue. we highly recommend using public transport or our festival shuttle services to reduce traffic congestion."
                        }
                    ].map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#D4AF37]/20">
                            <AccordionTrigger className="text-lg font-semibold text-[#8B4513] hover:text-[#D4AF37] text-left">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
