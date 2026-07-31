import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale } from "@/lib/i18n";
export function generateStaticParams(){return [{locale:"fr"},{locale:"de"},{locale:"en"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) { const {locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <><Navbar locale={locale} nav={d.nav}/>{children}<Footer locale={locale} d={d.footer}/></> }
