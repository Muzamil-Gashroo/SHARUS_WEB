import type { Metadata } from 'next';
import { ContactPageContent } from "@/components/contact/ContactPageContent";

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Sharik Rasool - SEO Services",
        "description": "Professional SEO strategy and link building services",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Srinagar",
            "addressRegion": "Jammu & Kashmir",
            "addressCountry": "India",
        },
        "telephone": "+91-7006500941",
        "email": "hi@sharikrasool.com",
        "url": "https://sharikrasool.com",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
    },
};

export const metadata: Metadata = {
    title: "Contact Sharik Rasool | SEO Consultant",
    description: "Get in touch with Sharik Rasool for SEO strategy and link building services. Based in Srinagar, J&K, serving clients worldwide.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <ContactPageContent />
        </>
    );
}
