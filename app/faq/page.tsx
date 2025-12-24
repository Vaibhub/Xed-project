import React from "react";
import HeroCommon from "../components/Hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
question:"Do XED faculty teach the courses?",
answer:"Our courses are authored and delivered by the world’s finest schools and coaches. The live instruction and interaction are provided by industry-leading experts and award-winning faculty"
    },
  {
    question: "What programs does XED offer?",
    answer:
      "XED offers customized executive education programs for organizations in both classroom and online formats. In addition, we provide pre-designed courses for executives such as the Cornell EPM and Cornell DBLP.",
  },
  {
    question: "Which universities and institutions does XED partner with?",
    answer:
      "XED partners with the worlds best universities and Ivy League schools including Cornell. Chicago Booth Singapore Management University. The National University of Singapore. The University of Leeds. Rutgers. UNC among others. For more information on University Partners. please click here.",
  },
  {
    question: "How is XED different from other online higher education platforms in the market?",
    answer:
      "A majority of online learning platforms offer canned learning solutions that don’t meet the challenges faced by modern leaders and corporates. XED offers a range of custom-designed learning solutions both for individuals and corporates that target the specific learning needs and challenges of the fast-paced digital economy of today XED’s value proposition lies in partnering with the world’s best universities to make world-class education available and accessible for companies and senior leaders.",
  },
  {
    question: "How can I enroll?",
    answer:
      "We are happy to know that you are considering XED as an online learning solution for your professional development goals. To enroll with any of X’s programs. browse through our list of current and upcoming programs. speaker series. and webinars here",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "For both our custom learning and pre-designed courses. participants will get a certificate for the successful completion of the program.",
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <HeroCommon title="Frequently Asked Questions" subtitle="" />

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-semibold py-4 pb-6">Overview</h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="  px-4"
            >
              <AccordionTrigger className="text-left font-medium text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
