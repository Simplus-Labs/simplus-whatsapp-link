import { useState, useEffect } from 'react';
import { GithubLogo, List } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import OtherTools from './OtherTools';
import Logo from '@/components/Logo';

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div className="sticky top-0 z-50">
      <div className="flex flex-col items-center justify-between px-4 py-3 lg:px-40 lg:flex-row bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <a href="/">
            <Logo className="h-14" />
          </a>
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <nav className="font-medium lg:flex items-center gap-4 hidden">
          <ul className="flex gap-4">
            <li>
              <a
                href="https://github.com/Simplus-Labs/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary text-foreground"
              >
                <GithubLogo size="20" weight="fill" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://simplus-labs.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary text-foreground"
              >
                All the tools
              </a>
            </li>
            <li>
              <a href="/our-team" className="transition-colors hover:text-primary text-foreground">
                Our team
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="fixed left-0 top-20 z-50 flex h-full w-full flex-col gap-6 px-4 py-2 lg:hidden bg-background/80 backdrop-blur-sm">
          <nav className="font-medium gap-4 flex flex-col">
            <ul className="flex flex-col">
              <li>
                <a
                  href="https://github.com/Simplus-Labs/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
                >
                  <GithubLogo size="20" weight="fill" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://simplus-labs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
                >
                  All the tools
                </a>
              </li>
              <li>
                <a
                  href="/our-team"
                  className="flex items-center transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
                >
                  Our team
                </a>
              </li>
            </ul>
          </nav>
          <OtherTools />
        </div>
      )}
    </div>
  );
}
