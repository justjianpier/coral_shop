import { ShieldCheck } from "lucide-react";
import { ContentPage } from "./components/content-page";
import { LegalDocument } from "./components/legal-document";

const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, including your name, email address, shipping address, payment information, and details shared when you contact our team or create an account.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use this information to process transactions, provide order updates, respond to questions, support your account, improve our services, and send marketing communications when you have given consent.",
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell or trade your personal information. We may share necessary information with trusted service providers who help operate our store and who agree to protect its confidentiality.",
  },
  {
    title: "Data Security",
    content:
      "We use appropriate technical and organizational safeguards to protect personal information. Access is limited to authorized people who need it to provide our services.",
  },
  {
    title: "Cookies",
    content:
      "Cookies help us remember preferences, understand how the store is used, and improve your experience. You can manage or disable cookies through your browser settings.",
  },
  {
    title: "Your Rights",
    content:
      "You may request access to, correction of, or deletion of your personal information. You can also unsubscribe from marketing emails at any time using the link included in each message.",
  },
];

export function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy, explained clearly"
      description="Last updated September 2026. This policy explains what we collect, why we use it, and the choices available to you."
      icon={ShieldCheck}
    >
      <LegalDocument
        sections={PRIVACY_SECTIONS}
        contactEmail="privacy@coralshop.com"
      />
    </ContentPage>
  );
}
