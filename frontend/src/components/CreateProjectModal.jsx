import React from 'react';
import { FiX } from 'react-icons/fi';

// CreateProjectModal é um Modal que engole toda a tela para focar na criacao de projeto
export default function CreateProjectModal({ isOpen, onClose }) {
  // Se isOpen for falso, não renderiza nada no DOM
  if (!isOpen) return null;

  return (
    // Backdrop blur que escurece o fundo
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      
      {/* Container principal do modal, possuindo estetica "Glass" dark */}
      <div 
        className="bg-[#18181b] border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar no modal em si
      >
        
        {/* Cabeçalho do modal contendo os titulos e o botão "X" */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Novo Projeto</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>
        
        {/* Corpo contendo os Inputs de dados */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Nome do Projeto</label>
            <input 
              type="text" 
              placeholder="Ex: Refatoração do Backend"
              className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Descrição Opcional</label>
            <textarea 
              rows="3"
              placeholder="Do que se trata esse projeto?"
              className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600 resize-none"
            ></textarea>
          </div>
        </div>
        
        {/* Rodapé do Modal contendo as opções de Ação */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-800 bg-[#121216]">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onClose} // No futuro, isso vai chamar a API (backend) para gravar.
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-white/10"
          >
            Criar Projeto
          </button>
        </div>

      </div>
    </div>
  );
}
