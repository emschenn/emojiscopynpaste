import { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Tag from '@/components/Tag';
import { toast } from 'sonner';

interface AddEmojiDialogProps {
  onAdd: (emoji: string, description?: string, tags?: string[]) => void;
}

const AddEmojiDialog = ({ onAdd }: AddEmojiDialogProps) => {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emoji.trim()) {
      toast.error('Please enter an emoji');
      return;
    }

    onAdd(
      emoji.trim(),
      description.trim() || undefined,
      tags
    );
    
    // Reset form
    setEmoji('');
    setDescription('');
    setTags([]);
    setTagInput('');
    setOpen(false);
    toast.success('Emoji added successfully!');
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Emoji
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add New Emoji</DialogTitle>
          <DialogDescription className="text-notion-gray-600">
            Add a new emoji to your collection. Description and tags are optional.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="emoji" className="text-sm font-medium">
              Emoji <span className="text-destructive">*</span>
            </Label>
            <Input
              id="emoji"
              placeholder="😀 or ✨"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="text-center text-2xl h-12"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-notion-gray-600 font-normal">(optional)</span>
            </Label>
            <Input
              id="description"
              placeholder="Happy face, sparkles, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags <span className="text-notion-gray-600 font-normal">(optional)</span>
            </Label>
            <Input
              id="tags"
              placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                    removable
                    onRemove={removeTag}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Emoji
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmojiDialog;