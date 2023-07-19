export const metadata = {
  title: "Blog | Venlo Seeds",
  description: "Create a new blog post",
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
