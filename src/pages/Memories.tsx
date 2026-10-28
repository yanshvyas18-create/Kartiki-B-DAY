import React from 'react';
import { PhotoGallery } from '../components/PhotoGallery';
import { MemoryTimeline } from '../components/MemoryTimeline';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';

export const Memories: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Photo Gallery Component */}
      <PhotoGallery />

      {/* Memory Timeline Component */}
      <MemoryTimeline />

      {/* Navigation Call to Action */}
      <div className="mt-16 text-center">
        <Link
          to="/fun-zone"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Next: Enter Kartiki's Fun Zone (4 Games!)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
