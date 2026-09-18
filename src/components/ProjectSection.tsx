import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { cvData, Project } from '../data/cvData';
import { ArrowUpRight, Code, Layers, GitBranch, Sparkles, Filter, ChevronDown } from 'lucide-react';

interface ProjectHighlightsCollapsibleProps {
  highlights: string[];
  projectId: string;
}

const ProjectHighlightsCollapsible: React.FC<ProjectHighlightsCollapsibleProps> = ({
  highlights,
  projectId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-[rgba(45,40,35,0.1)] pt-5 sm:pt-6">
      {/* Mobile: Interactive Dropdown Trigger (< md) / Desktop: Static Header (>= md) */}
      <button
        type="button"
        id={`toggle-highlights-${projectId}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`highlights-list-${projectId}`}
        className="w-full flex items-center justify-between text-left cursor-pointer md:cursor-default group select-none py-1 md:py-0"
      >
        <h4 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#B34B2E] flex items-center gap-2 font-medium">
          <span className="w-1.5 h-[1px] bg-[#B34B2E]" />
          KEY ARCHITECTURAL HIGHLIGHTS & DELIVERABLES
        </h4>

        {/* Minimal Arrow Dropdown Icon - Visible ONLY on mobile (< md) */}
        <span className="md:hidden flex items-center gap-1.5 text-[0.7rem] font-mono text-[#6E6A62] group-hover:text-[#B34B2E] transition-colors">
          <span className="text-[0.68rem] tracking-wider uppercase font-medium">
            {isOpen ? 'HIDE' : `VIEW (${highlights.length})`}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B34B2E] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {/* Highlights List: Collapsible on mobile (< md), always visible on desktop (>= md) */}
      <div
        id={`highlights-list-${projectId}`}
        className={`mt-4 grid-cols-1 md:grid-cols-2 gap-4 ${
          isOpen ? 'grid' : 'hidden md:grid'
        }`}
      >
        {highlights.map((highlight, hIdx) => (
          <div
            key={hIdx}
            className="p-3.5 sm:p-4 bg-[#F6F4EE] border border-[rgba(45,40,35,0.08)] flex gap-3 text-[0.85rem] sm:text-[0.88rem] leading-[1.6] text-[#2D2A26]"
          >
            <span className="font-mono text-[0.72rem] text-[#B34B2E] font-medium shrink-0 pt-0.5">
              [{String(hIdx + 1).padStart(2, '0')}]
            </span>
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProjectSectionProps {
  selectedTag?: string | null;
  onSelectTag?: (tag: string | null) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  selectedTag: propSelectedTag,
  onSelectTag: propOnSelectTag,
}) => {
  const [internalTag, setInternalTag] = useState<string | null>(null);
  const activeTag = propSelectedTag !== undefined ? propSelectedTag : internalTag;

  const handleTagClick = (tag: string) => {
    const nextTag = activeTag === tag ? null : tag;
    if (propOnSelectTag) {
      propOnSelectTag(nextTag);
    } else {
      setInternalTag(nextTag);
    }
  };

  const { projects } = cvData;

  // Extract all unique project tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.keywords))
  );

  const filteredProjects = activeTag
    ? projects.filter((p) => p.keywords.includes(activeTag))
    : projects;

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-[rgba(45,40,35,0.12)]">
      <SectionHeader
        number="01"
        subtitle="SELECTED ARCHITECTURAL WORKS"
        title="Featured Engineering Projects"
      />

      {/* Filter / Filter Bar */}
      <div id="project-filter-bar" className="card-tactile mb-10 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#ECE8DE]/60 border border-[rgba(45,40,35,0.1)]">
        <div className="flex items-center gap-2 text-[0.75rem] font-mono uppercase tracking-[0.16em] text-[#6E6A62]">
          <Filter className="w-3.5 h-3.5 text-[#B34B2E]" />
          <span>FILTER BY SYSTEM COMPONENT:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="filter-all-projects"
            onClick={() => handleTagClick('')}
            className={`px-2.5 py-1 text-[0.7rem] font-mono uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              !activeTag
                ? 'bg-[#1E1E1C] text-[#F6F4EE] font-semibold'
                : 'bg-[#ECE8DE] hover:bg-[#E4DFD3] text-[#6E6A62] border border-[rgba(45,40,35,0.12)]'
            }`}
          >
            All Works ({projects.length})
          </button>
          {allTags.map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                id={`filter-project-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleTagClick(tag)}
                className={`px-2.5 py-1 text-[0.7rem] font-mono uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
                  isSelected
                    ? 'bg-[#B34B2E] text-[#F6F4EE] font-semibold'
                    : 'bg-[#ECE8DE] hover:bg-[#E4DFD3] text-[#1E1E1C] border border-[rgba(45,40,35,0.12)]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List Dossier */}
      <div className="space-y-12 md:space-y-16">
        {filteredProjects.map((project, idx) => {
          const projectNumber = String(idx + 1).padStart(2, '0');
          return (
            <article
              key={project.name}
              id={`project-card-${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="group bg-[#ECE8DE]/40 hover:bg-[#ECE8DE]/80 border border-[rgba(45,40,35,0.14)] p-6 sm:p-8 md:p-10 transition-all relative overflow-hidden"
            >
              {/* Top Meta Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(45,40,35,0.12)] pb-4 mb-6 text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#6E6A62]">
                <div className="flex items-center gap-2">
                  <span className="text-[#B34B2E] font-semibold">PROJECT #{projectNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6613F]" />
                  <span>ARCHITECTURE & IMPLEMENTATION</span>
                </div>
              </div>

              {/* Title & Core Intent */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-8">
                <div className="lg:col-span-8">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1E1C] font-normal tracking-tight mb-3">
                    {project.name}
                  </h3>
                  <p className="text-[1.05rem] text-[#2D2A26] leading-[1.65]">
                    {project.description}
                  </p>
                </div>

                {/* Technical Stack Tags Column */}
                <div className="lg:col-span-4 flex flex-col justify-start">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#6E6A62] mb-2.5">
                    CORE STACK & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.keywords.map((kw) => (
                      <span
                        key={kw}
                        className={`inline-block px-2 py-0.8 text-[0.7rem] font-mono tracking-wide uppercase border ${
                          activeTag === kw
                            ? 'bg-[#B34B2E] text-[#F6F4EE] border-[#B34B2E]'
                            : 'bg-[#ECE8DE] text-[#1E1E1C] border-[rgba(45,40,35,0.14)]'
                        }`}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architectural Highlights Ledger (Collapsible on mobile only) */}
              <ProjectHighlightsCollapsible
                highlights={project.highlights}
                projectId={project.name.toLowerCase().replace(/\s+/g, '-')}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};
