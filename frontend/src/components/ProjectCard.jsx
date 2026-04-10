import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

// ProjectCard recebe como propriedade tudo sobre o "projeto" e a função onClick ditada pelo Pai (Dashboard)
export default function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-[#151518] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 shadow-black"
    >
      <div className="flex justify-between items-start mb-4">
        {/* Avatar customizado do Cartão usando a primeira Letra do projeto */}
        <div className="w-10 h-10 bg-[#27272a] text-white rounded-lg flex items-center justify-center font-bold relative overflow-hidden">
          {/* Efeito sutil de brilho superior como vidro (glassmorphism) */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          {project.name.charAt(0).toUpperCase()}
        </div>
        
        {/* Botão de "opções"/menu hambúrger isolado para não triggar a view principal sozinho usando stopPropagation */}
        <button className="text-gray-600 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <FiMoreVertical />
        </button>
      </div>
      
      {/* Titulo do projeto e breve descritivo injetados pela propriedade */}
      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
        {project.name}
      </h3>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
        {project.desc}
      </p>
      
      {/* Rodapé técnico do cartao */}
      <div className="text-xs text-gray-600 font-mono">
        Modificado: {project.updatedAt}
      </div>
    </div>
  );
}
