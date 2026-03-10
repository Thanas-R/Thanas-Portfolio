import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const blogArticles = [
{
  id: 'building-pesu-forge',
  headline: 'The Genesis of PESU Forge',
  subheadline: 'How a Study Tool Became My First Step Into Development',
  date: 'March 2026',
  excerpt: 'It started with a simple idea: what if notes could teach you back? PESU Forge was the project that introduced me to building with AI, and it changed the trajectory of my development journey forever.',
  column: 1
},
{
  id: 'designing-for-delight',
  headline: 'Designing for Delight',
  subheadline: 'On Crafting Interfaces That Feel Alive',
  date: 'February 2026',
  excerpt: 'From glassmorphism to procedural animations, I explore the philosophy behind making web experiences that surprise and engage users beyond mere functionality.',
  column: 2
},
{
  id: 'ai-in-the-browser',
  headline: 'AI in the Browser',
  subheadline: 'Lessons from Integrating Language Models Into Web Apps',
  date: 'January 2026',
  excerpt: 'A candid look at the challenges of bringing AI-powered features into client-side applications — from prompt engineering to managing user expectations.',
  column: 3
},
{
  id: 'the-craft-of-maps',
  headline: 'The Craft of Maps',
  subheadline: 'Building Virdis & the World of Geospatial Data',
  date: 'December 2025',
  excerpt: 'Satellite imagery, vegetation indices, and farm boundaries — how I built a precision agriculture platform that turns Earth observation data into actionable insights.',
  column: 1
},
{
  id: 'from-thanasos-to-contour',
  headline: 'From ThanasOS to Contour Flow',
  subheadline: 'The Evolution of a Developer\'s Portfolio',
  date: 'November 2025',
  excerpt: 'Every developer\'s portfolio tells a story. Mine went from a macOS desktop simulator to procedural topographic art. Here\'s what I learned along the way.',
  column: 2
}];

const BlogsPage = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7f1', color: '#2f2f2f' }}>
      
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Newspaper Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-6 px-6">
        
        <div className="max-w-5xl mx-auto">
          <header
            className="inline-block leading-[0.9] mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(48px, 10vw, 80px)',
              textTransform: 'uppercase',
              color: '#f9f7f1'
            }}>
            Thanas Blogs
          </header>

          <div
            className="py-3 px-4"
            style={{
              borderTop: '2px solid #f9f7f1',
              borderBottom: '2px solid #f9f7f1',
              textTransform: 'uppercase',
              fontFamily: "'Playfair Display', serif",
              fontSize: '12px',
              letterSpacing: '2px'
            }}>
            {dateStr} — Thoughts, Projects & Learnings
          </div>
        </div>
      </motion.div>

      {/* Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto px-6 py-10">

        <div className="relative">

          {/* Coming Soon */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="px-10 py-6 text-center"
              style={{
                backgroundColor: '#2f2f2f',
                border: '3px double #f9f7f1',
                fontFamily: "'Playfair Display', serif"
              }}>
              
              <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#f9f7f1' }}>
                Coming Soon
              </p>

              <p className="text-sm italic" style={{ color: '#ccc', fontFamily: "'Droid Serif', 'Georgia', serif" }}>
                The press is warming up. Articles are being drafted.
              </p>
            </div>
          </div>

          {/* Articles Preview */}
          <div className="opacity-30 pointer-events-none select-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">

              {[0,1,2].map((colIdx) => (
                <div
                  key={colIdx}
                  className="px-4"
                  style={{
                    borderLeft: colIdx > 0 ? '1px solid #f9f7f1' : 'none'
                  }}>

                  {blogArticles
                    .filter((a) => a.column === colIdx + 1)
                    .map((article,i) => (

                    <article key={article.id} className="mb-10">

                      <div className="text-center mb-4">

                        <h2
                          className="leading-tight mb-1"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: i === 0 && colIdx === 0 ? '28px' : '22px',
                            textTransform: i === 0 ? 'uppercase' : 'none'
                          }}>
                          {article.headline}
                        </h2>

                        {article.subheadline && (
                          <>
                            <div
                              className="mx-auto my-2"
                              style={{
                                width: '80px',
                                height: '1px',
                                backgroundColor: '#f9f7f1'
                              }}
                            />

                            <p
                              className="italic"
                              style={{
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: 400,
                                fontSize: '16px'
                              }}>
                              {article.subheadline}
                            </p>

                            <div
                              className="mx-auto mt-2"
                              style={{
                                width: '80px',
                                height: '1px',
                                backgroundColor: '#f9f7f1'
                              }}
                            />
                          </>
                        )}

                        <p
                          className="mt-2 text-xs font-bold uppercase tracking-widest"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {article.date}
                        </p>

                      </div>

                      <p
                        className="text-justify leading-[20px]"
                        style={{
                          fontFamily: "'Droid Serif', 'Georgia', serif",
                          fontSize: '14px'
                        }}>
                        {article.excerpt}
                      </p>

                    </article>
                  ))}

                </div>
              ))}

            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
};

export default BlogsPage;
