import { useState } from 'react';
import { Copy, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Tag from '@/components/Tag';
import { toast } from 'sonner';
import { EmojiItem } from '@/lib/supabase';

interface EmojiCardProps {
  emoji: EmojiItem;
  onRemove: (id: string) => void;
}

const EmojiCard = ({ emoji, onRemove }: EmojiCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emoji.emoji);
      toast.success(`Copied ${emoji.emoji}`);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy');
    }
  };

  const handleRemove = () => {
    onRemove(emoji.id);
  };

  return (
    <div
      className="group relative bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-card transition-all duration-150 cursor-pointer animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
    >
      {/* Emoji Display */}
      <div className="flex flex-col items-center space-y-3">
        <div className="text-4xl select-none">{emoji.emoji}</div>
        
        {/* Description */}
        {emoji.description && (
          <p className="text-sm text-notion-gray-600 text-center leading-tight font-medium">
            {emoji.description}
          </p>
        )}
        
        {/* Tags */}
        {emoji.tags && emoji.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center max-w-full">
            {emoji.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} tag={tag} size="sm" />
            ))}
            {emoji.tags.length > 3 && (
              <span className="text-xs text-notion-gray-600 px-1">
                +{emoji.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Actions Menu */}
      {isHovered && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-card/80 backdrop-blur-sm hover:bg-notion-gray-100 border border-notion-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="text-sm"
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="text-sm text-destructive focus:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default EmojiCard;