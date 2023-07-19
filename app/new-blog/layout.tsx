export const metadata = {
  title: "New Blog | Venlo Seeds",
  description: "Create a new blog post",
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="grow pt-16 md:pt-20">{children}</main>
    </>
  );
}
