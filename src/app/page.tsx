import { Shield, HelpCircle, MessageCircle, Lock, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
          <div className="mx-4">
            <svg className="w-8 h-8 text-amber-950/50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-serif tracking-wide text-amber-950 mb-4" style={{textShadow: '0 1px 2px rgba(255,255,255,0.5)'}}>
          Whisperdrop
        </h1>
        <div className="inline-block px-6 py-2 bg-amber-950/10 border border-amber-950/30 rounded-full mb-6">
          <p className="text-sm font-serif text-amber-950 tracking-widest font-semibold">
            THE ARCHIVE OF INQUIRY
          </p>
        </div>
        
        <p className="text-2xl text-amber-950 italic font-serif leading-relaxed mb-8 font-medium" style={{textShadow: '0 1px 2px rgba(255,255,255,0.3)'}}>
          &quot;The art of questioning is the source of all knowledge&quot;
        </p>
        
        <p className="text-lg text-amber-950/90 font-serif max-w-2xl mx-auto leading-relaxed font-medium">
          A sanctuary where curiosity meets wisdom. Ask questions that matter, share knowledge that endures.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Why Ask Questions */}
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
              <HelpCircle className="w-8 h-8 text-amber-950" />
            </div>
            <h2 className="text-3xl font-serif text-amber-950 font-bold">Ask Questions</h2>
          </div>
          
          <p className="text-amber-950/90 font-serif text-lg leading-relaxed mb-6 font-medium">
            To question is to be human. It is our most profound gift—the ability to wonder, to seek, to never cease exploring the depths of understanding.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Ignite discovery</span> by asking what others dare not
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Challenge assumptions</span> and illuminate new paths
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Preserve curiosity</span>—the compass of the wise
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-950/10 border border-amber-950/30 rounded">
            <p className="text-sm text-amber-950 font-serif italic text-center font-medium">
              Sign in to inscribe your questions upon the archive
            </p>
          </div>
        </div>

        {/* Why Answer Questions */}
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-950/15 rounded-full border border-amber-950/20">
              <MessageCircle className="w-8 h-8 text-amber-950" />
            </div>
            <h2 className="text-3xl font-serif text-amber-950 font-bold">Share Wisdom</h2>
          </div>
          
          <p className="text-amber-950/90 font-serif text-lg leading-relaxed mb-6 font-medium">
            Knowledge hoarded dims like a candle in solitude. Knowledge shared multiplies—illuminating minds across generations.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Transform experience</span> into lasting wisdom
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Guide others</span> through the fog of uncertainty
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-950/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-amber-950/90 font-serif">
                <span className="font-bold text-amber-950">Create ripples</span> that echo through time
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-950/10 border border-amber-950/30 rounded">
            <p className="text-sm text-amber-950 font-serif italic text-center font-medium">
              No account needed—share your knowledge freely
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Values Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-amber-950" />
            <h2 className="text-3xl font-serif text-amber-950 font-bold">Our Sacred Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Lock className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Privacy First</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                Your answers remain private. You cannot see others&apos; responses—only contribute your own wisdom.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Shield className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Respectful Discourse</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                AI moderation ensures all content remains thoughtful, appropriate, and respectful to all participants.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Sparkles className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Genuine Inquiry</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                We honor authentic questions born of curiosity, not frivolous or inappropriate content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="h-px bg-amber-950/30 mb-8"></div>
          <p className="text-xl text-amber-950 italic font-serif mb-8 leading-relaxed font-medium">
            &quot;In every question lies the seed of understanding. In every answer, the harvest of wisdom.&quot;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-10 py-4 bg-amber-950/90 text-amber-50 rounded border-2 border-amber-950 font-serif font-semibold hover:bg-amber-950 transition-all duration-300 shadow-lg hover:shadow-xl">
            Sign In to Ask
          </button>
          <button className="px-10 py-4 bg-amber-100/80 text-amber-950 rounded border-2 border-amber-950/40 font-serif font-semibold hover:bg-amber-100 transition-all duration-300 shadow-md hover:shadow-lg">
            Browse Questions
          </button>
        </div>

        <p className="mt-8 text-sm text-amber-950/80 font-serif italic font-medium">
          Join a community where every question matters and every answer enlightens
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