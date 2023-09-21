import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaretRight } from '@phosphor-icons/react';
import toolsData from '../../toolsData.json';

interface Tool {
  name: string;
  active: boolean;
  created_at: string;
  url: string;
  logo: string;
}

interface BadgeInfo {
  text: string;
  variant: 'radiant' | 'secondary';
}

export default function OtherTools(): JSX.Element {
  const isNew = (createdAt: string): boolean => {
    const currentDate = new Date();
    const toolDate = new Date(createdAt);
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    return currentDate.getTime() - toolDate.getTime() < oneMonth;
  };

  const getBadgeInfo = (tool: Tool): BadgeInfo | null => {
    if (!tool.active) {
      return { text: 'Coming Soon', variant: 'secondary' };
    } else if (isNew(tool.created_at)) {
      return { text: 'New', variant: 'radiant' };
    }
    return null;
  };

  return (
    <div className="w-full lg:w-72 py-2 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="font-bold">Other tools</div>
        <Button variant="outline" className="border-primary font-medium">
          See more <CaretRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {toolsData.map((tool) => {
          const badgeInfo = getBadgeInfo(tool);
          return (
            <li key={tool.name} className="flex gap-3">
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 items-center underline transition-colors hover:text-primary text-foreground"
              >
                <img src={tool.logo} alt={`${tool.name} logo`} className="h-6" /> {tool.name}
              </a>
              {badgeInfo !== null && <Badge variant={badgeInfo.variant}>{badgeInfo.text}</Badge>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
