import { useState, useEffect } from "react";
import { Github, Heart, Pointer, Sparkles, Tag as TagIcon } from "lucide-react";
import EmojiCard from "@/components/EmojiCard";
import AddEmojiDialog from "@/components/AddEmojiDialog";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { EmojiService, EmojiItem } from "@/lib/supabase";
import { toast } from "sonner";

const DEFAULT_EMOJIS: Omit<EmojiItem, "id" | "created_at" | "updated_at">[] = [
  // Travel & Places ✈️
  {
    emoji: "✈️",
    description: "Airplane Travel",
    tags: ["travel", "transport"],
  },
  {
    emoji: "🏖️",
    description: "Beach Vacation",
    tags: ["travel", "beach", "vacation"],
  },
  {
    emoji: "🗼",
    description: "Tokyo Tower",
    tags: ["travel", "landmark", "japan"],
  },
  {
    emoji: "🏛️",
    description: "Classical Building",
    tags: ["travel", "architecture", "culture"],
  },
  {
    emoji: "🌸",
    description: "Cherry Blossom",
    tags: ["nature", "spring", "aesthetic"],
  },
  {
    emoji: "🌺",
    description: "Hibiscus Flower",
    tags: ["nature", "tropical", "aesthetic"],
  },
  {
    emoji: "🌴",
    description: "Palm Tree",
    tags: ["nature", "tropical", "vacation"],
  },
  {
    emoji: "🏔️",
    description: "Snow Mountain",
    tags: ["nature", "mountain", "winter"],
  },

  // Aesthetic Vibes ✨
  {
    emoji: "✨",
    description: "Sparkles",
    tags: ["aesthetic", "magic", "vibes"],
  },
  {
    emoji: "🌙",
    description: "Crescent Moon",
    tags: ["aesthetic", "night", "mystical"],
  },
  { emoji: "⭐", description: "Star", tags: ["aesthetic", "night", "dreams"] },
  {
    emoji: "💫",
    description: "Dizzy Star",
    tags: ["aesthetic", "magic", "sparkle"],
  },
  {
    emoji: "🌟",
    description: "Glowing Star",
    tags: ["aesthetic", "bright", "special"],
  },
  {
    emoji: "💖",
    description: "Sparkling Heart",
    tags: ["love", "aesthetic", "cute"],
  },
  {
    emoji: "💕",
    description: "Two Hearts",
    tags: ["love", "cute", "relationship"],
  },
  {
    emoji: "🎀",
    description: "Ribbon Bow",
    tags: ["cute", "feminine", "gift"],
  },

  // Food & Lifestyle 🍓
  { emoji: "🍓", description: "Strawberry", tags: ["food", "fruit", "sweet"] },
  {
    emoji: "🥐",
    description: "Croissant",
    tags: ["food", "breakfast", "french"],
  },
  { emoji: "☕", description: "Coffee", tags: ["drink", "morning", "cafe"] },
  {
    emoji: "🧋",
    description: "Bubble Tea",
    tags: ["drink", "asian", "trendy"],
  },
  {
    emoji: "🍰",
    description: "Cake Slice",
    tags: ["food", "dessert", "celebration"],
  },
  {
    emoji: "🦋",
    description: "Butterfly",
    tags: ["nature", "transformation", "aesthetic"],
  },
  {
    emoji: "🌈",
    description: "Rainbow",
    tags: ["nature", "colorful", "pride"],
  },

  // Nature & Weather 🌸
  {
    emoji: "🌊",
    description: "Ocean Wave",
    tags: ["nature", "water", "beach"],
  },
  { emoji: "☀️", description: "Sun", tags: ["weather", "sunny", "happy"] },
  {
    emoji: "🌤️",
    description: "Sun Behind Cloud",
    tags: ["weather", "partly-sunny"],
  },
  { emoji: "🍃", description: "Leaves", tags: ["nature", "green", "plants"] },

  // Fashion & Beauty 💄
  {
    emoji: "💄",
    description: "Lipstick",
    tags: ["beauty", "makeup", "fashion"],
  },
  {
    emoji: "👗",
    description: "Dress",
    tags: ["fashion", "clothing", "feminine"],
  },
  {
    emoji: "👠",
    description: "High Heel",
    tags: ["fashion", "shoes", "elegant"],
  },
  { emoji: "💍", description: "Ring", tags: ["jewelry", "wedding", "luxury"] },
  {
    emoji: "💎",
    description: "Diamond",
    tags: ["luxury", "jewelry", "precious"],
  },
  {
    emoji: "🌹",
    description: "Red Rose",
    tags: ["love", "romance", "elegant"],
  },

  // Camera & Social 📸
  {
    emoji: "📸",
    description: "Camera Flash",
    tags: ["photography", "social", "memories"],
  },
  {
    emoji: "🎬",
    description: "Movie Camera",
    tags: ["entertainment", "film", "creative"],
  },
  {
    emoji: "🎨",
    description: "Artist Palette",
    tags: ["art", "creative", "painting"],
  },
  {
    emoji: "📚",
    description: "Books",
    tags: ["education", "reading", "knowledge"],
  },
  {
    emoji: "🎵",
    description: "Musical Note",
    tags: ["music", "entertainment", "sound"],
  },
  {
    emoji: "🎭",
    description: "Theater Masks",
    tags: ["entertainment", "drama", "performance"],
  },
];

const Index = () => {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    loadEmojis();
  }, []);

  const loadEmojis = async () => {
    try {
      setLoading(true);
      const data = await EmojiService.getAll();

      // If no emojis exist, seed with default ones
      if (data.length === 0) {
        await seedDefaultEmojis();
      } else {
        setEmojis(data);
      }
    } catch (error) {
      console.error("Error loading emojis:", error);
      toast.error("Failed to load emojis");
    } finally {
      setLoading(false);
    }
  };

  const seedDefaultEmojis = async () => {
    try {
      const promises = DEFAULT_EMOJIS.map((emoji) =>
        EmojiService.create(emoji.emoji, emoji.description, emoji.tags)
      );
      const createdEmojis = await Promise.all(promises);
      setEmojis(createdEmojis);
      toast.success("Loaded default emoji collection");
    } catch (error) {
      console.error("Error seeding emojis:", error);
      toast.error("Failed to load default emojis");
    }
  };

  const handleAddEmoji = async (
    emoji: string,
    description?: string,
    tags: string[] = []
  ) => {
    try {
      const newEmoji = await EmojiService.create(emoji, description, tags);
      setEmojis([newEmoji, ...emojis]);
    } catch (error) {
      console.error("Error adding emoji:", error);
      toast.error("Failed to add emoji");
    }
  };

  const handleRemoveEmoji = async (id: string) => {
    try {
      await EmojiService.delete(id);
      setEmojis(emojis.filter((emoji) => emoji.id !== id));
      toast.success("Emoji removed");
    } catch (error) {
      console.error("Error removing emoji:", error);
      toast.error("Failed to remove emoji");
    }
  };

  const filteredEmojis = emojis.filter((emoji) => {
    const matchesSearch =
      !searchTerm ||
      emoji.emoji.includes(searchTerm) ||
      emoji.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emoji.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => emoji.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Get all unique tags for filtering
  const allTags = Array.from(
    new Set(emojis.flatMap((emoji) => emoji.tags))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-6 w-6 animate-spin text-primary mx-auto mb-3">
            ✨
          </div>
          <p className="text-claude-gray-600 text-sm font-medium">
            Loading your emoji collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-4 md:mb-12 px-8">
          <h1 className="text-4xl font-medium text-foreground mb-1 tracking-tight font-bitcount">
            emojis copynpaste
          </h1>
          <p className="text-claude-gray-600 text-base max-w-xl mx-auto leading-relaxed">
            collect all the emoji vibes and copy with one tap{" "}
            <Pointer className="inline w-4 h-4" />
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-row items-center max-md:justify-center justify-between gap-4 mb-10">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search emojis"
          />
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTags(!showTags)}
              className="flex items-center gap-2"
            >
              <TagIcon className="h-4 w-4" />
              {showTags ? "Hide Tags" : "Show Tags"}
            </Button>
            <AddEmojiDialog onAdd={handleAddEmoji} />
          </div>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex  max-md:justify-center flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className={`
                    px-2.5 py-1 text-xs font-medium rounded border transition-all duration-150
                    ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-primary-foreground border-primary shadow-subtle"
                        : "bg-card hover:bg-claude-beige-100 border-border text-claude-gray-800"
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="text-center mb-10">
          <p className="text-sm text-claude-gray-600 font-medium">
            {filteredEmojis.length} of {emojis.length} emojis
            {searchTerm && " matching your search"}
          </p>
        </div>

        {/* Emoji Grid */}
        {filteredEmojis.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {filteredEmojis.map((emoji) => (
              <EmojiCard
                key={emoji.id}
                emoji={emoji}
                onRemove={handleRemoveEmoji}
                showTags={showTags}
              />
            ))}
            {/* Mobile Add Button Card */}
            <div className="md:hidden">
              <AddEmojiDialog onAdd={handleAddEmoji}>
                <div className="group relative bg-card border border-dashed border-border rounded p-3 shadow-subtle hover:shadow-card transition-all duration-150 cursor-pointer hover:border-primary/50">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-lg sm:text-xl text-claude-gray-400 group-hover:text-primary transition-colors">
                      +
                    </div>
                    <p className="text-xs text-claude-gray-400 text-center leading-tight font-medium group-hover:text-claude-gray-700 transition-colors">
                      Add Emojis
                    </p>
                  </div>
                </div>
              </AddEmojiDialog>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">{searchTerm ? "🔍" : "✨"}</div>
            <h3 className="text-lg font-medium mb-2 text-foreground">
              {searchTerm ? "No emojis found" : "No emojis yet"}
            </h3>
            <p className="text-claude-gray-600 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              {searchTerm
                ? "Try a different search term or browse by tags"
                : "Add your first emoji to get started"}
            </p>
            {!searchTerm && <AddEmojiDialog onAdd={handleAddEmoji} />}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-20 pt-6 border-t border-border">
          <p className="text-xs text-claude-gray-400 font-medium flex items-center justify-center gap-1">
            <span className=" font-bitcount font-light text-claude-gray-800">
              made with 🤍 for emoji lovers{" "}
            </span>{" "}
            •
            <a
              href="https://github.com/emschenn/emojiscopynpaste"
              target="_blank"
              rel="noopener noreferrer"
              className="flex hover:text-claude-gray-700 transition-colors"
            >
              view source code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
