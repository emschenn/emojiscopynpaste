import { useState } from 'react';
import { Plus } from 'lucide-react';
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
import { toast } from 'sonner';

interface AddEmojiDialogProps {
  onAdd: (emoji: string, description: string) => void;
}

const AddEmojiDialog = ({ onAdd }: AddEmojiDialogProps) => {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emoji.trim()) {
      toast.error('Please enter an emoji or emoticon');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }

    onAdd(emoji.trim(), description.trim());
    setEmoji('');
    setDescription('');
    setOpen(false);
    toast.success('Emoji added successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-hover">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Emoji</DialogTitle>
          <DialogDescription>
            Add a new emoji or emoticon to your collection for easy copying.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emoji">Emoji / Emoticon</Label>
            <Input
              id="emoji"
              placeholder="😀 or :)"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="text-center text-2xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Happy face"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-gradient-primary">
              Add Emoji
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmojiDialog;