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
      ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      bg-claude-beige-100 text-claude-gray-800 
      rounded border border-claude-beige-200 font-medium
      transition-colors
    `}>
      {tag}
      {removable && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto w-auto p-0.5 hover:bg-claude-beige-200 rounded-sm"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </span>
  );
};

export default Tag;