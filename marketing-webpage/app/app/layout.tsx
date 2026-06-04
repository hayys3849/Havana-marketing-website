import "./havana-app.css";

export const metadata = {
  title: "Havana App",
  description: "Havana Flowers web application",
};

export default function WebAppLayout({ children }: { children: React.ReactNode }) {
  return <div className="havana-app">{children}</div>;
}
