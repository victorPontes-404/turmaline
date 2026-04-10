import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFileText, FiCheckSquare, FiTrello, FiSettings } from 'react-icons/fi';

import KanbanBoard from '../components/KanbanBoard';
import MarkdownEditor from '../components/MarkdownEditor';
import FileExplorer from '../components/FileExplorer';
import TeamSettings from '../components/TeamSettings';

export default function ProjectView() {
  const { id } = useParams(); // Pega da URL qual projeto o usuario acessou
  const navigate = useNavigate(); // Hook para navegação programática
  
  // Estado que salva qual "Ferramenta" o usuario tem aberta no momento
  const [activeTab, setActiveTab] = useState('files');
  const [selectedFile, setSelectedFile] = useState(null); // Documento aberto

  return (
    <div className="flex h-screen bg-[#0e0e11] text-gray-300 font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar estilo IDE (painel lateral interno do projeto) */}
      <aside className="w-64 flex flex-col border-r border-gray-800 bg-[#121216]">
        {/* Cabeçalho da Sidebar permitindo o usuario voltar para o Dashboard Pai */}
        <div className="h-14 border-b border-gray-800 flex items-center px-4 gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft size={16} />
          </button>
          <div className="font-medium text-white truncate flex-1 text-sm tracking-wide">
            Projeto {id}
          </div>
        </div>
        
        {/* Links de navegação interna ("Abas do Projeto") */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-[10px] uppercase font-bold text-gray-600 tracking-wider mb-2 px-2 mt-2">Visões</div>
          
          {/* Botão que troca o state para 'files' */}
          <button 
            onClick={() => { setActiveTab('files'); setSelectedFile(null); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'files' ? 'bg-[#27272a] text-white font-medium shadow-sm border border-gray-700/50' : 'text-gray-400 hover:bg-[#18181b]'
            }`}
          >
            <FiFileText size={15} /> Arquivos
          </button>
          
          {/* Botão que troca o state para 'tasks' */}
          <button 
            onClick={() => { setActiveTab('tasks'); setSelectedFile(null); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'tasks' ? 'bg-[#27272a] text-white font-medium shadow-sm border border-gray-700/50' : 'text-gray-400 hover:bg-[#18181b]'
            }`}
          >
            <FiCheckSquare size={15} /> Tarefas
          </button>

          {/* Botão que troca o state para 'board' */}
          <button 
            onClick={() => { setActiveTab('board'); setSelectedFile(null); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'board' ? 'bg-[#27272a] text-white font-medium shadow-sm border border-gray-700/50' : 'text-gray-400 hover:bg-[#18181b]'
            }`}
          >
            <FiTrello size={15} /> Kanban Board
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 flex flex-col gap-1">
           <button 
              onClick={() => { setActiveTab('team'); setSelectedFile(null); }}
              className={`flex items-center gap-2.5 text-sm w-full px-2 py-2 rounded-md transition-colors ${
                activeTab === 'team' ? 'bg-[#27272a] text-white font-medium' : 'text-gray-500 hover:text-white hover:bg-[#18181b]'
              }`}
            >
              <FiSettings size={15} /> Equipe / Config
           </button>
        </div>
      </aside>

      {/* Area Central: É onde as views dinâmicas são desenhadas */}
      <main className="flex-1 flex flex-col bg-[#0e0e11] overflow-hidden relative">
        
        <header className="h-10 border-b border-gray-800 flex items-center px-4 text-xs font-mono text-gray-500 bg-[#121216] shrink-0">
           {activeTab === 'files' && <div className="flex items-center gap-2"><FiFileText/> <span>arquivos / {selectedFile ? <span className="text-white">{selectedFile.name}</span> : <span className="text-gray-500">raiz</span>}</span></div>}
           {activeTab === 'tasks' && <div className="flex items-center gap-2"><FiCheckSquare/> <span>tarefas / <span className="text-white">lista_aberta</span></span></div>}
           {activeTab === 'board' && <div className="flex items-center gap-2"><FiTrello/> <span>board / <span className="text-white">sprint_v1</span></span></div>}
           {activeTab === 'team' && <div className="flex items-center gap-2"><FiSettings/> <span>admin / <span className="text-white">equipe</span></span></div>}
        </header>

        {/* Canvas de ferramentas: Renderização Condicional do React simulando Router */}
        <div className="flex-1 overflow-hidden p-6 relative">
           
           {/* Se estiver em arquivos, monta o FileExplorer ou o MDEditor caso um arquivo seja aberto */}
           {activeTab === 'files' && !selectedFile && (
             <FileExplorer onFileSelect={setSelectedFile} />
           )}
           
           {activeTab === 'files' && selectedFile && (
               <div className="h-full w-full flex flex-col gap-3">
                  <button onClick={() => setSelectedFile(null)} className="self-start text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors bg-[#18181c] px-3 py-1.5 rounded-full border border-gray-800 hover:border-gray-600">
                     <FiArrowLeft size={12}/> Voltar para Arquivos
                  </button>
                  {selectedFile.extension === 'md' ? (
                     <MarkdownEditor fileName={selectedFile.name} />
                  ) : selectedFile.extension === 'txt' ? (
                     <div className="flex-1 bg-[#121216] p-4 text-gray-300 font-mono text-sm border border-gray-800 rounded-xl overflow-y-auto">
                        Visualização de arquivo de texto simples ({selectedFile.name})...
                     </div>
                  ) : (
                     <div className="flex-1 bg-[#121216] p-4 flex flex-col items-center justify-center text-gray-500 border border-gray-800 rounded-xl">
                        <FiFileText size={48} className="mb-4 opacity-50"/>
                        <p>Visualizador para .{selectedFile.extension} pendente.</p>
                     </div>
                  )}
               </div>
           )}

           {/* Aba de listagem simplistca que pode ser construída no futuro */}
           {activeTab === 'tasks' && (
             <div className="flex items-center justify-center h-full text-gray-600 border border-dashed border-gray-700/50 rounded-xl">
               Lista Linear de Tarefas em breve... (Use o Kanban Board)
             </div>
           )}

           {/* Se estiver no board, monta e hidrata a lib hello-pangea/dnd */}
           {activeTab === 'board' && (
             <KanbanBoard />
           )}

           {/* Aba de TeamSettings / Admin do projeto */}
           {activeTab === 'team' && (
               <TeamSettings />
           )}

        </div>
      </main>
    </div>
  );
}
