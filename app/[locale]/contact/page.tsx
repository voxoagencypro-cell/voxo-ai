import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { InnerPage } from "@/components/inner-page";
import { isLocale } from "@/lib/i18n";
import {
  PROSPECT_PROFILE_COOKIE,
  verifyProspectProfileCookie,
} from "@/lib/site-access";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const profileToken = cookieStore.get(PROSPECT_PROFILE_COOKIE)?.value;
  const profile = await verifyProspectProfileCookie(profileToken);

  const prefill = profile
    ? {
        name: profile.contactName,
        company: profile.company,
        phone: profile.phone,
        email: profile.email,
      }
    : undefined;

  return (
    <InnerPage
      locale={locale}
      eyebrow="CONTACT"
      title="Échangeons sur votre système IA"
      text="Demandez une démo gratuite ou posez vos questions. Si vous avez déjà rempli le questionnaire d'accès, vos coordonnées sont reprises ci-dessous."
    >
      <ContactForm locale={locale} prefill={prefill} />
    </InnerPage>
  );
}
