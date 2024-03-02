import { Metadata } from "next";

export const metadata: Metadata = {
  title: "character",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
