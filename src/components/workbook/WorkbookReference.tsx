import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gem, Leaf, Star, Compass, Zap, Heart, BookOpen, 
  Sparkles, Moon, FlaskConical, ScrollText, Clock
} from "lucide-react";
import { 
  getZodiacCorrespondence, 
  getPhaseCorrespondence,
  type ZodiacCorrespondence,
  type PhaseCorrespondence
} from "@/data/chaperoneCorrespondences";
import { 
  getRitualsForPhase, 
  getPromptsForPhase,
  bodyPractices,
  lunarExperiments,
  type MoonRitual
} from "@/data/chaperoneRituals";
import { getLoreForSign, getMythsForPhase, lunarEphemera } from "@/data/chaperoneLore";

interface WorkbookReferenceProps {
  fromSign: string;
  toSign: string;
  startPhase: string;
  endPhase: string;
}

export const WorkbookReference = ({ 
  fromSign, 
  toSign, 
  startPhase, 
  endPhase 
}: WorkbookReferenceProps) => {
  const [activeTab, setActiveTab] = useState("correspondences");

  const fromZodiac = getZodiacCorrespondence(fromSign);
  const toZodiac = getZodiacCorrespondence(toSign);
  const startPhaseData = getPhaseCorrespondence(startPhase);
  const endPhaseData = getPhaseCorrespondence(endPhase);
  const fromLore = getLoreForSign(fromSign);
  const toLore = getLoreForSign(toSign);
  const rituals = [...getRitualsForPhase(startPhase), ...getRitualsForPhase(endPhase)];
  const prompts = [...getPromptsForPhase(startPhase), ...getPromptsForPhase(endPhase)];
  const myths = [...getMythsForPhase(startPhase), ...getMythsForPhase(endPhase)];

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-card/50 p-2 rounded-lg border border-border/50">
          <TabsTrigger value="correspondences" className="flex items-center gap-2 text-xs">
            <Gem className="w-3 h-3" />
            <span className="hidden sm:inline">Correspondences</span>
            <span className="sm:hidden">Corresp.</span>
          </TabsTrigger>
          <TabsTrigger value="rituals" className="flex items-center gap-2 text-xs">
            <Sparkles className="w-3 h-3" />
            Rituals
          </TabsTrigger>
          <TabsTrigger value="body" className="flex items-center gap-2 text-xs">
            <Heart className="w-3 h-3" />
            Body
          </TabsTrigger>
          <TabsTrigger value="lore" className="flex items-center gap-2 text-xs">
            <ScrollText className="w-3 h-3" />
            Lore
          </TabsTrigger>
          <TabsTrigger value="experiments" className="flex items-center gap-2 text-xs">
            <FlaskConical className="w-3 h-3" />
            Experiments
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Correspondences Tab */}
            <TabsContent value="correspondences" className="mt-6 space-y-6">
              {/* Zodiac Correspondences */}
              <div className="grid md:grid-cols-2 gap-6">
                {fromZodiac && (
                  <ZodiacCard zodiac={fromZodiac} label="Origin Sign" />
                )}
                {toZodiac && (
                  <ZodiacCard zodiac={toZodiac} label="Destination Sign" />
                )}
              </div>

              {/* Phase Correspondences */}
              <div className="grid md:grid-cols-2 gap-6">
                {startPhaseData && (
                  <PhaseCard phase={startPhaseData} label="Starting Phase" />
                )}
                {endPhaseData && (
                  <PhaseCard phase={endPhaseData} label="Ending Phase" />
                )}
              </div>
            </TabsContent>

            {/* Rituals Tab */}
            <TabsContent value="rituals" className="mt-6 space-y-6">
              <div className="grid gap-4">
                {rituals.map((ritual, index) => (
                  <RitualCard key={index} ritual={ritual} />
                ))}
              </div>
              
              {/* Journaling Prompts */}
              <div className="node-card">
                <h4 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  Journaling Prompts
                </h4>
                <div className="space-y-4">
                  {prompts.map((prompt, index) => (
                    <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                      <span className="system-label text-gold mb-2 block">{prompt.theme}</span>
                      <p className="text-foreground italic mb-2">"{prompt.prompt}"</p>
                      <p className="text-xs text-muted-foreground">Follow-up: {prompt.followUp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Body Tab */}
            <TabsContent value="body" className="mt-6 space-y-6">
              <div className="node-card">
                <h4 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  Body Pathway: {fromZodiac?.body} → {toZodiac?.body}
                </h4>
                <p className="text-muted-foreground mb-6">
                  This workbook traces an arc from {fromZodiac?.body?.toLowerCase()} to {toZodiac?.body?.toLowerCase()}, 
                  inviting somatic awareness of how energy moves through these regions during this lunar transition.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {bodyPractices.slice(0, 4).map((practice, index) => (
                  <div key={index} className="node-card">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-serif text-foreground">{practice.name}</h5>
                      <span className="text-xs text-accent">{practice.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{practice.bodyArea}</p>
                    <p className="text-sm text-muted-foreground mb-3">{practice.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {practice.benefits.map((benefit, i) => (
                        <span key={i} className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Lore Tab */}
            <TabsContent value="lore" className="mt-6 space-y-6">
              {/* Zodiac Mythology */}
              <div className="grid md:grid-cols-2 gap-6">
                {fromLore && (
                  <div className="node-card">
                    <span className="system-label text-gold mb-2 block">{fromLore.ancientName}</span>
                    <h4 className="font-serif text-xl text-foreground mb-3">{fromSign} Mythology</h4>
                    <p className="text-sm text-muted-foreground mb-4">{fromLore.mythology}</p>
                    <div className="space-y-2 text-xs">
                      <div><span className="text-accent">Archetype:</span> <span className="text-muted-foreground">{fromLore.archetype}</span></div>
                      <div><span className="text-accent">Shadow:</span> <span className="text-muted-foreground">{fromLore.shadow}</span></div>
                      <div><span className="text-accent">Gift:</span> <span className="text-muted-foreground">{fromLore.gift}</span></div>
                    </div>
                  </div>
                )}
                {toLore && (
                  <div className="node-card">
                    <span className="system-label text-gold mb-2 block">{toLore.ancientName}</span>
                    <h4 className="font-serif text-xl text-foreground mb-3">{toSign} Mythology</h4>
                    <p className="text-sm text-muted-foreground mb-4">{toLore.mythology}</p>
                    <div className="space-y-2 text-xs">
                      <div><span className="text-accent">Archetype:</span> <span className="text-muted-foreground">{toLore.archetype}</span></div>
                      <div><span className="text-accent">Shadow:</span> <span className="text-muted-foreground">{toLore.shadow}</span></div>
                      <div><span className="text-accent">Gift:</span> <span className="text-muted-foreground">{toLore.gift}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lunar Myths */}
              {myths.length > 0 && (
                <div className="node-card">
                  <h4 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-accent" />
                    Lunar Mythology
                  </h4>
                  <div className="space-y-4">
                    {myths.map((myth, index) => (
                      <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gold font-serif">{myth.deity}</span>
                          <span className="text-xs text-muted-foreground">({myth.culture})</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{myth.story}</p>
                        <p className="text-xs text-accent italic">Lesson: {myth.lesson}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ephemera */}
              <div className="node-card">
                <h4 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Lunar Ephemera & Traditions
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {lunarEphemera.slice(0, 2).map((category, index) => (
                    <div key={index} className="space-y-3">
                      <span className="system-label">{category.category}</span>
                      {category.items.slice(0, 2).map((item, i) => (
                        <div key={i} className="p-3 bg-background/50 rounded border border-border/30">
                          <p className="text-foreground text-sm mb-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Experiments Tab */}
            <TabsContent value="experiments" className="mt-6 space-y-6">
              <div className="node-card mb-6">
                <p className="text-muted-foreground">
                  These lunar experiments invite you to become a scientist of your own cycles. 
                  Track, observe, and discover your unique relationship with the moon.
                </p>
              </div>
              
              <div className="grid gap-4">
                {lunarExperiments.map((experiment, index) => (
                  <div key={index} className="node-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-serif text-lg text-foreground">{experiment.title}</h5>
                        <span className="text-xs text-accent">{experiment.phase}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {experiment.duration}
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="system-label block mb-1">Hypothesis</span>
                        <p className="text-muted-foreground">{experiment.hypothesis}</p>
                      </div>
                      <div>
                        <span className="system-label block mb-1">Method</span>
                        <p className="text-muted-foreground">{experiment.method}</p>
                      </div>
                      <div>
                        <span className="system-label block mb-1">What to Observe</span>
                        <p className="text-muted-foreground">{experiment.observation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

// Sub-components
const ZodiacCard = ({ zodiac, label }: { zodiac: ZodiacCorrespondence; label: string }) => (
  <div className="node-card">
    <span className="system-label block mb-2">{label}</span>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-4xl">{zodiac.glyph}</span>
      <div>
        <h4 className="font-serif text-xl text-foreground">{zodiac.sign}</h4>
        <p className="text-xs text-muted-foreground">{zodiac.element} · {zodiac.modality} · {zodiac.ruler}</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <Gem className="w-4 h-4 text-accent mt-0.5" />
        <div>
          <span className="text-xs text-muted-foreground block">Crystals</span>
          <span className="text-sm text-foreground">{zodiac.crystals.join(", ")}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Leaf className="w-4 h-4 text-accent mt-0.5" />
        <div>
          <span className="text-xs text-muted-foreground block">Herbs</span>
          <span className="text-sm text-foreground">{zodiac.herbs.join(", ")}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Star className="w-4 h-4 text-gold mt-0.5" />
        <div>
          <span className="text-xs text-muted-foreground block">Tarot</span>
          <span className="text-sm text-foreground">{zodiac.tarot}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Compass className="w-4 h-4 text-accent mt-0.5" />
        <div>
          <span className="text-xs text-muted-foreground block">Body Region</span>
          <span className="text-sm text-foreground">{zodiac.body}</span>
        </div>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-border/30 flex flex-wrap gap-1">
      {zodiac.keywords.map((keyword, i) => (
        <span key={i} className="px-2 py-0.5 bg-card text-xs text-muted-foreground rounded-full">
          {keyword}
        </span>
      ))}
    </div>
  </div>
);

const PhaseCard = ({ phase, label }: { phase: PhaseCorrespondence; label: string }) => (
  <div className="node-card bg-gradient-to-br from-card to-accent/5">
    <span className="system-label block mb-2">{label}</span>
    <h4 className="font-serif text-xl text-foreground mb-4">{phase.phase}</h4>
    
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <span className="text-xs text-muted-foreground block">Solfeggio</span>
        <span className="text-accent font-mono">{phase.solfeggio} Hz</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Chakra</span>
        <span className="text-foreground">{phase.chakra}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Element</span>
        <span className="text-foreground">{phase.element}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Direction</span>
        <span className="text-foreground">{phase.direction}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Time</span>
        <span className="text-foreground">{phase.time}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">Energy</span>
        <span className="text-gold">{phase.energy}</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-border/30">
      <span className="text-xs text-muted-foreground block mb-2">Magical Focus</span>
      <p className="text-sm text-foreground">{phase.magicalFocus}</p>
    </div>
  </div>
);

const RitualCard = ({ ritual }: { ritual: MoonRitual }) => (
  <div className="node-card">
    <div className="flex items-start justify-between mb-4">
      <div>
        <span className="system-label text-gold block mb-1">{ritual.phase}</span>
        <h4 className="font-serif text-xl text-foreground">{ritual.name}</h4>
      </div>
      <span className="text-xs text-muted-foreground">{ritual.duration}</span>
    </div>
    
    <p className="text-sm text-accent italic mb-4">"{ritual.intention}"</p>
    
    <div className="mb-4">
      <span className="system-label block mb-2">Materials</span>
      <div className="flex flex-wrap gap-1">
        {ritual.materials.map((material, i) => (
          <span key={i} className="px-2 py-1 bg-card text-xs text-muted-foreground rounded border border-border/50">
            {material}
          </span>
        ))}
      </div>
    </div>
    
    <div>
      <span className="system-label block mb-2">Steps</span>
      <ol className="space-y-2">
        {ritual.steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="text-accent font-mono">{i + 1}.</span>
            <span className="text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default WorkbookReference;
