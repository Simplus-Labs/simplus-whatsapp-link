import Header from '@/components/Header';
import OtherTools from '../OtherTools';
import Footer from '../Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex justify-between px-4 py-14 lg:px-40 gap-20">
        {children}
        <div className="hidden lg:block">
          <OtherTools />
        </div>
      </div>
      <Footer />
    </>
  );
}
