// import Navbar from "./navbar";
// import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
