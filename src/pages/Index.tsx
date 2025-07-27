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
  // Travel & Places ✈️
  { id: '1', emoji: '✈️', description: 'Airplane Travel' },
  { id: '2', emoji: '🏖️', description: 'Beach Vacation' },
  { id: '3', emoji: '🗼', description: 'Tokyo Tower' },
  { id: '4', emoji: '🏛️', description: 'Classical Building' },
  { id: '5', emoji: '🌸', description: 'Cherry Blossom' },
  { id: '6', emoji: '🌺', description: 'Hibiscus Flower' },
  { id: '7', emoji: '🌴', description: 'Palm Tree' },
  { id: '8', emoji: '🏔️', description: 'Snow Mountain' },
  
  // Aesthetic Vibes ✨
  { id: '9', emoji: '✨', description: 'Sparkles' },
  { id: '10', emoji: '🌙', description: 'Crescent Moon' },
  { id: '11', emoji: '⭐', description: 'Star' },
  { id: '12', emoji: '💫', description: 'Dizzy Star' },
  { id: '13', emoji: '🌟', description: 'Glowing Star' },
  { id: '14', emoji: '💖', description: 'Sparkling Heart' },
  { id: '15', emoji: '💕', description: 'Two Hearts' },
  { id: '16', emoji: '🎀', description: 'Ribbon Bow' },
  
  // Food & Lifestyle 🍓
  { id: '17', emoji: '🍓', description: 'Strawberry' },
  { id: '18', emoji: '🥐', description: 'Croissant' },
  { id: '19', emoji: '☕', description: 'Coffee' },
  { id: '20', emoji: '🧋', description: 'Bubble Tea' },
  { id: '21', emoji: '🍰', description: 'Cake Slice' },
  { id: '22', emoji: '🌸', description: 'Sakura' },
  { id: '23', emoji: '🦋', description: 'Butterfly' },
  { id: '24', emoji: '🌈', description: 'Rainbow' },
  
  // Nature & Weather 🌸
  { id: '25', emoji: '🌊', description: 'Ocean Wave' },
  { id: '26', emoji: '☀️', description: 'Sun' },
  { id: '27', emoji: '🌤️', description: 'Sun Behind Cloud' },
  { id: '28', emoji: '🌙', description: 'Moon' },
  { id: '29', emoji: '🌸', description: 'Pink Flowers' },
  { id: '30', emoji: '🍃', description: 'Leaves' },
  
  // Fashion & Beauty 💄
  { id: '31', emoji: '💄', description: 'Lipstick' },
  { id: '32', emoji: '👗', description: 'Dress' },
  { id: '33', emoji: '👠', description: 'High Heel' },
  { id: '34', emoji: '💍', description: 'Ring' },
  { id: '35', emoji: '💎', description: 'Diamond' },
  { id: '36', emoji: '🌹', description: 'Red Rose' },
  
  // Camera & Social 📸
  { id: '37', emoji: '📸', description: 'Camera Flash' },
  { id: '38', emoji: '🎬', description: 'Movie Camera' },
  { id: '39', emoji: '🎨', description: 'Artist Palette' },
  { id: '40', emoji: '📚', description: 'Books' },
  { id: '41', emoji: '🎵', description: 'Musical Note' },
  { id: '42', emoji: '🎭', description: 'Theater Masks' },
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
