import { useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EmojiCardProps {
  id: string;
  emoji: string;
  description: string;
  onRemove: (id: string) => void;
}

const EmojiCard = ({ id, emoji, description, onRemove }: EmojiCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emoji);
      toast.success(`Copied ${emoji} to clipboard!`);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleRemove = () => {
    onRemove(id);
    toast.success('Emoji removed!');
  };

  return (
    <div
      className="relative group bg-gradient-card border border-border rounded-lg p-4 shadow-card hover:shadow-hover transition-all duration-200 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-4xl animate-bounce-in">{emoji}</div>
        <p className="text-sm text-muted-foreground text-center leading-tight">
          {description}
        </p>
      </div>
      
      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmojiCard;