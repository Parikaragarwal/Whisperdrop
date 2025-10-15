import { BookOpen, Users, Shield, Lightbulb, Heart, Target } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
          <div className="mx-4">
            <BookOpen className="w-8 h-8 text-amber-950/50" />
          </div>
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-serif tracking-wide text-amber-950 mb-4" style={{textShadow: '0 1px 2px rgba(255,255,255,0.5)'}}>
          About Whisperdrop
        </h1>
        
        <p className="text-xl text-amber-950 italic font-serif leading-relaxed mb-8 font-medium">
          &quot;A digital sanctuary for the eternally curious&quot;
        </p>
      </div>

      {/* Origin Story */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-serif text-amber-950 font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-8 h-8" />
            The Genesis
          </h2>
          
          <div className="space-y-4 text-amber-950/90 font-serif leading-relaxed">
            <p>
              In an age where information flows endlessly yet meaningful dialogue grows scarce, Whisperdrop was born from a simple observation: humans possess an extraordinary gift—the ability to question, to wonder, to seek understanding beyond the surface.
            </p>
            <p>
              This platform is not just another Q&amp;A site. It is an archive, a repository of human curiosity, where every question inscribed represents a mind reaching toward enlightenment, and every answer shared becomes a lantern illuminating the path for others.
            </p>
            <p>
              We believe that questions are humanity&apos;s most powerful tool. They spark revolutions, inspire innovations, and connect souls across time and space. Whisperdrop exists to honor this power—to create a space where curiosity is celebrated and knowledge flows freely.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-serif text-amber-950 font-bold mb-8 text-center">
          Our Guiding Principles
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Privacy */}
          <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
                <Shield className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-xl font-serif text-amber-950 font-bold">Privacy by Design</h3>
            </div>
            <p className="text-amber-950/90 font-serif leading-relaxed">
              Your contributions remain yours. Answers are private—you share wisdom without the noise of comparison or competition. We protect your thoughts as sacred scrolls in an ancient library.
            </p>
          </div>

          {/* Authenticity */}
          <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
                <Heart className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-xl font-serif text-amber-950 font-bold">Genuine Inquiry</h3>
            </div>
            <p className="text-amber-950/90 font-serif leading-relaxed">
              We honor authentic curiosity. Through AI moderation, we ensure this remains a sanctuary for meaningful questions—not frivolity, not malice, but genuine seeking of understanding.
            </p>
          </div>

          {/* Community */}
          <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
                <Users className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-xl font-serif text-amber-950 font-bold">Open Knowledge</h3>
            </div>
            <p className="text-amber-950/90 font-serif leading-relaxed">
              Wisdom should flow freely. While questions require commitment (signing in), answers are open to all. No barriers, no paywalls—just knowledge shared for the common good.
            </p>
          </div>

          {/* Quality */}
          <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
                <Target className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-xl font-serif text-amber-950 font-bold">Respectful Discourse</h3>
            </div>
            <p className="text-amber-950/90 font-serif leading-relaxed">
              Every participant deserves dignity. Our moderation ensures conversations remain thoughtful, appropriate, and enriching for all who seek wisdom within these digital halls.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-serif text-amber-950 font-bold mb-6 text-center">
            How Whisperdrop Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-950/15 rounded-full flex items-center justify-center border-2 border-amber-950/30 font-serif font-bold text-amber-950">
                1
              </div>
              <div>
                <h3 className="text-lg font-serif text-amber-950 font-bold mb-2">Ask with Purpose</h3>
                <p className="text-amber-950/90 font-serif leading-relaxed">
                  Sign in and inscribe your questions. Each query you post becomes part of the permanent archive, awaiting the wisdom of the community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-950/15 rounded-full flex items-center justify-center border-2 border-amber-950/30 font-serif font-bold text-amber-950">
                2
              </div>
              <div>
                <h3 className="text-lg font-serif text-amber-950 font-bold mb-2">Share Freely</h3>
                <p className="text-amber-950/90 font-serif leading-relaxed">
                  Browse questions and contribute your knowledge—no account required to answer. Your insights help guide others through their journey of discovery.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-950/15 rounded-full flex items-center justify-center border-2 border-amber-950/30 font-serif font-bold text-amber-950">
                3
              </div>
              <div>
                <h3 className="text-lg font-serif text-amber-950 font-bold mb-2">Privacy Preserved</h3>
                <p className="text-amber-950/90 font-serif leading-relaxed">
                  Your answers remain private to you. No rankings, no public displays—just the pure act of knowledge sharing without the weight of judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-serif text-amber-950 font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-amber-950/90 font-serif leading-relaxed mb-4">
            We envision a world where asking questions is celebrated, not discouraged. Where knowledge flows like water—freely, abundantly, nourishing all who thirst for understanding.
          </p>
          <p className="text-lg text-amber-950/90 font-serif leading-relaxed">
            Whisperdrop is more than a platform—it is a movement to reclaim the lost art of inquiry, to honor the gift of curiosity, and to build a repository of human wisdom that transcends time.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="h-px bg-amber-950/30 mb-8"></div>
        
        <p className="text-xl text-amber-950 italic font-serif font-medium mb-4">
          &quot;Question everything. Share generously. Grow endlessly.&quot;
        </p>
        
        <p className="text-amber-950/80 font-serif">
          Welcome to the Archive of Inquiry. Welcome to Whisperdrop.
        </p>
      </div>

      {/* Bottom decorative element */}
      <div className="flex items-center justify-center mt-16">
        <div className="h-px bg-amber-950/40 flex-1 max-w-md"></div>
        <div className="mx-4">
          <svg className="w-6 h-6 text-amber-950/40" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="h-px bg-amber-950/40 flex-1 max-w-md"></div>
      </div>
    </main>
  );
}