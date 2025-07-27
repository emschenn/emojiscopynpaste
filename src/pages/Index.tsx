import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import EmojiCard from '@/components/EmojiCard';
import AddEmojiDialog from '@/components/AddEmojiDialog';
import SearchBar from '@/components/SearchBar';

interface EmojiItem {
  id: string;
  emoji: string;
  description: string;
}

const DEFAULT_EMOJIS: EmojiItem[] = [
  { id: '1', emoji: '😀', description: 'Grinning Face' },
  { id: '2', emoji: '😍', description: 'Heart Eyes' },
  { id: '3', emoji: '🤔', description: 'Thinking Face' },
  { id: '4', emoji: '😂', description: 'Laughing' },
  { id: '5', emoji: '🎉', description: 'Party' },
  { id: '6', emoji: '👍', description: 'Thumbs Up' },
  { id: '7', emoji: ':)', description: 'Happy' },
  { id: '8', emoji: ':D', description: 'Very Happy' },
  { id: '9', emoji: ':(', description: 'Sad' },
  { id: '10', emoji: ':P', description: 'Tongue Out' },
  { id: '11', emoji: ';)', description: 'Wink' },
  { id: '12', emoji: '<3', description: 'Heart' },
];

const Index = () => {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('emojis');
    if (stored) {
      setEmojis(JSON.parse(stored));
    } else {
      setEmojis(DEFAULT_EMOJIS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emojis', JSON.stringify(emojis));
  }, [emojis]);

  const handleAddEmoji = (emoji: string, description: string) => {
    const newEmoji: EmojiItem = {
      id: Date.now().toString(),
      emoji,
      description,
    };
    setEmojis([newEmoji, ...emojis]);
  };

  const handleRemoveEmoji = (id: string) => {
    setEmojis(emojis.filter(emoji => emoji.id !== id));
  };

  const filteredEmojis = emojis.filter(emoji =>
    emoji.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emoji.emoji.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Emoji Manager
          </h1>
          <p className="text-muted-foreground text-lg">
            Store, organize, and copy your favorite emojis and emoticons with ease
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search emojis and emoticons..."
          />
          <AddEmojiDialog onAdd={handleAddEmoji} />
        </div>

        {/* Stats */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredEmojis.length} of {emojis.length} emojis
            {searchTerm && ' matching your search'}
          </p>
        </div>

        {/* Emoji Grid */}
        {filteredEmojis.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredEmojis.map((emoji) => (
              <EmojiCard
                key={emoji.id}
                id={emoji.id}
                emoji={emoji.emoji}
                description={emoji.description}
                onRemove={handleRemoveEmoji}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No emojis found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try a different search term' : 'Add some emojis to get started'}
            </p>
            {!searchTerm && <AddEmojiDialog onAdd={handleAddEmoji} />}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for emoji lovers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
