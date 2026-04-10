import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolderPlus, FiLayout, FiLogOut } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate(); // Hook para navegar entre rotas
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal de novo projeto

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Estado simulado (mock) contento a lista inicial de projetos
  const [projects] = useState([
    { id: 1, name: 'Turmaline v1', desc: 'Main product development', updatedAt: '2 hours ago' },
    { id: 2, name: 'Marketing Website', desc: 'Landing page and blog', updatedAt: '1 day ago' },
  ]);

  return (
    <div className="flex h-screen bg-[#0e0e11] text-gray-300 font-sans">

      {/* Sidebar vertical: Contém atalho da main e botão de logout */}
      <aside className="w-16 flex flex-col items-center py-6 border-r border-gray-800 bg-[#121216] justify-between">
        <div className="flex flex-col gap-6 w-full items-center">
          {/* Avatar principal/Logo indicando o ambiente */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold cursor-pointer hover:bg-gray-200 transition-colors">
            {user?.name?.substring(0, 2).toUpperCase() || 'Tu'}
          </div>
          <div className="h-px w-8 bg-gray-800 rounded-full" />
          <button className="text-white bg-[#27272a] p-2.5 rounded-lg transition-colors border border-gray-700 shadow-md" title="Dashboard">
            <FiLayout size={20} />
          </button>
        </div>

        {/* Botão para retornar ao Login */}
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-400 p-2.5 transition-colors"
          title="Logout"
        >
          <FiLogOut size={22} />
        </button>
      </aside>

      {/* Conteúdo principal da página */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Cabeçalho explicativo e botão de ação global */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Projetos de {user?.name || 'Carregando...'}
            </h1>
            <p className="text-gray-500 text-sm mt-1 mb-8">Gerencie seus fluxos de trabalho e documentos baseados em projetos.</p>
          </div>
          {/* Aciona o state para mostrar o Modal em tela cheia */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors shadow-sm shadow-white/10"
          >
            <FiFolderPlus />
            Novo Projeto
          </button>
        </header>

        {/* Grid exibindo cada um dos cartões de projeto iterados via map() */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onClick={() => navigate(`/dashboard/projetos/${proj.id}`)}
            />
          ))}
        </div>
      </main>

      {/* Componente Modular invocado dinamicamente baseado no State "isModalOpen" */}
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
