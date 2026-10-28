import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProjectsGrid = () => {
  const { projects } = useProjects();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [gallerySlides, setGallerySlides] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const featuredProjects = projects.filter((project) => project.featured);

  if (featuredProjects.length === 0) return <div>No projects found</div>;

  const handleOpenGallery = (gallery) => {
    setGallerySlides(gallery.map((src) => ({ src })));
    setGalleryIndex(0);
    setGalleryOpen(true);
  };

  return (
    <div className="mt-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            variants={fadeUp({ delay: 0.2 * (index + 1) })}
            className="group border-accent/20 hover:border-accent/60 bg-surface flex flex-col justify-between rounded-xl border p-5 shadow-sm transition-colors duration-300"
          >
            <div>
              <div className="relative">
                <img
                  src={project.image.url}
                  alt={project.title}
                  className="h-48 w-full rounded-lg object-cover object-top"
                />
                <div className="absolute inset-0 rounded-lg bg-black/40 transition-colors duration-300 group-hover:bg-black/10" />
              </div>

              <div className="mt-4 text-start">
                <h3 className="text-primary text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent/10 text-accent rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.gallery && project.gallery.length > 0 ? (
                <button
                  type="button"
                  onClick={() => handleOpenGallery(project.gallery)}
                  className="bg-accent text-primary hover:bg-accent-glow cursor-pointer rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                >
                  Live Preview ({project.gallery.length} Screens)
                </button>
              ) : (
                project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-glow hover:bg-accent text-primary hover:text-black rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    Live
                  </a>
                )
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-glow hover:bg-accent text-primary hover:text-black rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                >
                  Code
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gallery Lightbox */}
      <Lightbox
        open={galleryOpen}
        close={() => setGalleryOpen(false)}
        index={galleryIndex}
        slides={gallerySlides}
      />
    </div>
  );
};

export default ProjectsGrid;
