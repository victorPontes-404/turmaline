import React, { useState } from 'react';
import { FiX, FiLink } from 'react-icons/fi';

// Simples estrutura em Modal que sobrepoem as raias do kanban
export default function TaskModal({ isOpen, onClose, onCreateTask }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo'); // 'todo', 'doing', 'done'
  const [assignee, setAssignee] = useState('');

  if (!isOpen) return null; // Evita carregar componente sem necessidade de render

  const handleSave = () => {
     if(!title.trim()) return;
     onCreateTask(title, status, assignee);
     
     // Reseta os states para o proximo uso
     setTitle('');
     setStatus('todo');
     setAssignee('');
     onClose();
  };

  return (
    // Tela escura no fundo (Overlay) z-100 para sobrepor z-index alto do Drag&Drop se precisar
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      <div 
        className="bg-[#18181b] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Previne cliques perdidos escaparem para o Kanban atrás dele
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
             <div className="bg-indigo-600 w-3 h-3 rounded-full"></div>
             <h2 className="text-lg font-medium text-white">Nova Tarefa</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>
        
        {/* Corpo principal do formulário simulando inserções CRUD padrão */}
        <div className="p-6 space-y-5">
          {/* Titulo */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Título da Tarefa</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Refatorar componente de Autenticação v2"
              className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status do Kanban direto do modal possivelmente atritando o select nativo com os estados de cards */}
            <div>
               <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Status</label>
               <select 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 transition-all text-sm"
               >
                 <option value="todo">To Do</option>
                 <option value="doing">In Progress</option>
                 <option value="done">Done</option>
               </select>
            </div>

            <div>
               <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Atribuído a</label>
               <select 
                 value={assignee}
                 onChange={e => setAssignee(e.target.value)}
                 className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 transition-all text-sm"
               >
                 <option value="">Não atribuído</option>
                 <option value="Victor Pontes">Victor Pontes</option>
                 <option value="Ana Silva">Ana Silva</option>
                 <option value="Lucas Santos">Lucas Santos</option>
                 <option value="João Costa">João Costa</option>
               </select>
            </div>
            
            {/* Vinculação de Documento, essencial p/ ligar Tabela de Task com Table de Doc no Backend */}
            <div>
               <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Doc. Vinculado</label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                     <FiLink size={14} />
                  </div>
                  <select className="w-full pl-9 bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 transition-all text-sm">
                    <option value="">Nenhum doc</option>
                    <option>requisitos.md</option>
                    <option>anotacoes.txt</option>
                  </select>
               </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Descrição Opcional</label>
            <textarea 
              rows="4"
              placeholder="Detalhes ou critérios de aceite."
              className="w-full bg-[#0e0e11] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600 resize-none font-mono text-sm"
            ></textarea>
          </div>
        </div>
        
        {/* Controles para Salvar */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-800 bg-[#121216]">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20"
          >
            Salvar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}
