import { ReactNode, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isRTL } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[oklch(0.65_0.1_70)] border-t-transparent animate-spin" />
            </div>
          }
        >
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
