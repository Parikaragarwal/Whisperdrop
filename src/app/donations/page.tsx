import { Heart, Coffee, Sparkles } from 'lucide-react';

export default function Donations() {
  return (
    <main className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
          <div className="mx-4">
            <Heart className="w-8 h-8 text-amber-950/50" fill="currentColor" />
          </div>
          <div className="h-px bg-amber-950/40 flex-1 max-w-xs"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-serif tracking-wide text-amber-950 mb-4" style={{textShadow: '0 1px 2px rgba(255,255,255,0.5)'}}>
          Support the Archive
        </h1>
        
        <p className="text-xl text-amber-950 italic font-serif leading-relaxed mb-8 font-medium">
          &quot;Generosity is the lamp that illuminates knowledge for all&quot;
        </p>
        
        <p className="text-lg text-amber-950/90 font-serif max-w-2xl mx-auto leading-relaxed">
          Whisperdrop is a labor of love—a sanctuary built to preserve curiosity and share wisdom freely. Your support helps keep this archive alive and accessible to all seekers.
        </p>
      </div>

      {/* Why Support Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-serif text-amber-950 font-bold mb-6 text-center">
            What Your Contribution Supports
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Sparkles className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Server Costs</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                Keeping the archive accessible and running smoothly for all visitors
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Coffee className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Development</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                Continuous improvements and new features to enhance your experience
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-3 bg-amber-950/15 rounded-full mb-3 border border-amber-950/20">
                <Heart className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-serif text-amber-950 mb-2 font-bold">Passion Project</h3>
              <p className="text-sm text-amber-950/90 font-serif leading-relaxed">
                Fuel for late-night coding sessions and maintaining this sanctuary
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-amber-950/5 border-2 border-amber-950/30 rounded-lg p-8 shadow-lg backdrop-blur-sm text-center">
          <h2 className="text-3xl font-serif text-amber-950 font-bold mb-6">
            Make a Contribution
          </h2>
          
          <p className="text-amber-950/90 font-serif mb-8 leading-relaxed">
            Scan the QR code below to support Whisperdrop via Google Pay
          </p>

          {/* QR Code Placeholder */}
          <div className="inline-block p-6 bg-white border-4 border-amber-950/20 rounded-lg shadow-md mb-6">
            <div className="w-64 h-64 bg-amber-100/50 border-2 border-dashed border-amber-950/30 rounded flex items-center justify-center">
              <p className="text-amber-950/60 font-serif text-center px-4">
                Your GPay QR Code<br/>goes here
              </p>
            </div>
          </div>

          <p className="text-sm text-amber-950/80 font-serif italic">
            Every contribution, no matter how small, is deeply appreciated
          </p>
        </div>
      </div>

      {/* Gratitude Section */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="h-px bg-amber-950/30 mb-8"></div>
        
        <div className="mb-8">
          <Heart className="w-12 h-12 text-amber-950/50 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-3xl font-serif text-amber-950 font-bold mb-4">
            With Gratitude
          </h2>
          <p className="text-lg text-amber-950/90 font-serif leading-relaxed max-w-2xl mx-auto">
            Your generosity ensures that this archive remains a beacon for curious minds. Whether you contribute or simply participate, you are part of something meaningful.
          </p>
        </div>

        <p className="text-amber-950 italic font-serif font-medium">
          &quot;The gift of knowledge is the highest gift in the world&quot;
        </p>
        <p className="text-sm text-amber-950/70 font-serif mt-2">
          — Ancient Wisdom
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