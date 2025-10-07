import React from "react";
import Header from "@/features/Header";
import Footer from "@/features/Footer";
import Banner from "@/features/Banner";

interface WrapperProps {
  hideBanner?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
}

const Wrapper = ({
  hideBanner = false,
  hideFooter,
  children,
}: WrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 mt-[65px] mb-[85px] overflow-y-auto"
        style={{
          maxHeight: hideFooter ? "calc(100vh - 65px)" : "calc(100vh - 145px)",
        }}
      >
        {!hideBanner && <Banner />}
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Wrapper;
