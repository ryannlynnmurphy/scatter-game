import type { Metadata } from "next";
import "./sureality.css";

export const metadata: Metadata = {
  title: "Sureality · Scatter Game",
  description: "One room listens. Low-poly dusk, rain, and interpretive atmosphere.",
};

export default function SurealityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
