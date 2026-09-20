import { FileCheck2 } from "lucide-react";
import { ContentPage } from "./components/content-page";
import { LegalDocument } from "./components/legal-document";

const TERMS_SECTIONS = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using the Coral Shop website and services, you agree to these Terms of Service. If you do not agree, please do not use our services.",
  },
  {
    title: "Account Registration",
    content:
      "Some features may require an account. You are responsible for keeping your credentials confidential and for activity that takes place through your account.",
  },
  {
    title: "Products and Pricing",
    content:
      "We work to keep product descriptions, availability, and prices accurate. We reserve the right to correct errors and update information when necessary.",
  },
  {
    title: "Orders and Payment",
    content:
      "By placing an order, you confirm that the supplied information is accurate. We may refuse or cancel orders due to availability, payment issues, or incorrect product information.",
  },
  {
    title: "Shipping and Returns",
    content:
      "Delivery and return conditions are described on our Shipping Information and Returns pages. By completing a purchase, you agree to those conditions.",
  },
  {
    title: "Intellectual Property",
    content:
      "Text, graphics, branding, and images on this website belong to Coral Shop or their respective owners and may not be reproduced without permission.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the extent permitted by law, Coral Shop is not responsible for indirect, incidental, or consequential damages arising from use of our services or products.",
  },
  {
    title: "Changes to These Terms",
    content:
      "We may update these terms when our services or legal obligations change. Continued use after an update indicates acceptance of the revised terms.",
  },
];

export function TermsOfServicePage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms designed to be understood"
      description="Last updated September 2026. These terms describe the agreement between you and Coral when using our store."
      icon={FileCheck2}
    >
      <LegalDocument
        sections={TERMS_SECTIONS}
        contactEmail="terms@coralshop.com"
      />
    </ContentPage>
  );
}
