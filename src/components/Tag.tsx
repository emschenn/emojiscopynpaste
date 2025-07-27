import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TagProps {
  tag: string;
  onRemove?: (tag: string) => void;
  removable?: boolean;
  size?: 'sm' | 'md';
}

const Tag = ({ tag, onRemove, removable = false, size = 'sm' }: TagProps) => {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(tag);
    }
  };

  return (
    <span className={`
      inline-flex items-center gap-1 
      ${size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
      bg-notion-gray-100 text-notion-gray-900 
      rounded-md border border-notion-gray-200
      transition-colors
    `}>
      {tag}
      {removable && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto w-auto p-0.5 hover:bg-notion-gray-200 rounded-sm"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </span>
  );
};

export default Tag;