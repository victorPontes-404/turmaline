import React from 'react';

export default function Landing() {
  const features = [
    {
      icon: '⬡',
      title: 'Graph Map',
      description: 'Visualize dependencies between tasks, documents and components as an interactive node graph. Spot bottlenecks before they happen.'
    },
    {
      icon: '◈',
      title: 'Rich Text Editor',
      description: 'Write and organize project documentation in Markdown with a clean, distraction-free editor. Keep your knowledge base structured and searchable.'
    },
    {
      icon: '▦',
      title: 'Task Board',
      description: 'Manage sprints and track work with a Kanban board. Link tasks directly to documents and components so nothing gets lost.'
    },
    {
      icon: '⬡',
      title: 'Chromatic Engine',
      description: 'Monitor system and project health through thermal state transitions. Understand the status of every layer at a glance.'
    },
    {
      icon: '◈',
      title: 'Layer Isolation',
      description: 'Reduce cognitive load with progressive disclosure. Navigate architectural layers without noise, focusing on what matters now.'
    },
    {
      icon: '▦',
      title: 'Open Ecosystem',
      description: 'Expand Turmaline\'s functionality with modular plugins. Built to integrate with the tools your team already uses.'
    },
  ];

  return (
    <main>
      {/* About Section */}
      <section className="flex justify-center py-[60px]">
        <div className="container mx-auto flex gap-[60px] items-center justify-center px-4">
          
          {/* About Left */}
          <div className="flex-1 text-[#00e5ff] text-left">
            <h2 className="mb-5 text-[35px] font-semibold">What does Turmaline do?</h2>
            
            <p className="mb-5">
              <span className="font-semibold">Graph Map</span><br />
              Identify bottlenecks intuitively through node-edge logic.
            </p>

            <p className="mb-5">
              <span className="font-semibold">Chromatic Engine</span><br />
              Monitor system health via thermal state transitions.
            </p>

            <p className="mb-5">
              <span className="font-semibold">Layer Isolation</span><br />
              Reduce cognitive load using progressive disclosure.
            </p>

            <p className="mb-5">
              <span className="font-semibold">Open Ecosystem</span><br />
              Expand functionality with modular plugins.
            </p>
          </div>

          {/* About Right */}
          <div className="flex-[2] bg-[#303030] p-[30px] rounded-[15px]">
            <h1 className="text-center mb-[30px] text-white text-3xl font-bold">
              What is Turmaline?
            </h1>

            <p className="text-[22px] mb-4 text-white">
              Turmaline is a high-fidelity visual orchestration engine designed
              to resolve the "invisibility of dependencies" in software architecture.
            </p>

            <p className="text-[22px] mb-4 text-white">
              It implements a Neural Task Networking approach, treating
              every project component as a dynamic node.
            </p>

            <p className="text-[22px] mb-4 text-white">
              Grounded in Cognitive Load Theory, the system
              maps project telemetry intelligently.
            </p>

            <p className="text-[22px] text-white">
              By providing multi-faceted views, it allows teams to navigate
              architectural layers without noise.
            </p>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-[#303030]">
        <div className="container mx-auto px-4">
          
          <h2 className="text-center text-3xl font-bold text-[#00e5ff] mb-3">
            Features
          </h2>
          
          <p className="text-center text-gray-400 text-base mb-12">
            Everything your team needs to build, document and ship.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#303030] rounded-[10px] p-7 flex flex-col gap-3 border border-transparent hover:border-[#00e5ff] transition-colors duration-200"
              >
                <span className="text-2xl text-[#00e5ff]">
                  {feature.icon}
                </span>
                <h3 className="text-[17px] font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
