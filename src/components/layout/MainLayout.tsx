import Header from '@/components/Header';
import OtherTools from '../OtherTools';
import Footer from '../Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header />
      <div className="flex justify-between px-4 py-14 lg:px-16 xl:px-40 gap-20">
        {children}
        <div className="hidden xl:block">
          <OtherTools />
        </div>
      </div>
      <Footer />
    </div>
  );
}
