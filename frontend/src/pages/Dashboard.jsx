import React, { useState, useEffect } from 'react'; // 1. Adicionado useEffect
import { useNavigate } from 'react-router-dom';
import { FiFolderPlus, FiLayout, FiLogOut } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. Estado inicial agora é uma lista vazia
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Função para buscar projetos do Backend
  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem('token'); // Recupera o token salvo no login
        
        const response = await fetch('http://localhost:8000/projects/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token no padrão Bearer
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data); // Atualiza o estado com os dados REAIS do banco
        } else if (response.status === 401) {
          logout(); // Se o token expirou, desloga o usuário
          navigate('/login');
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#0e0e11] text-gray-300 font-sans">
      {/* Sidebar - Mantida igual */}
      <aside className="w-16 flex flex-col items-center py-6 border-r border-gray-800 bg-[#121216] justify-between">
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold cursor-pointer hover:bg-gray-200 transition-colors">
            {user?.name?.substring(0, 2).toUpperCase() || 'TU'}
          </div>
          <div className="h-px w-8 bg-gray-800 rounded-full" />
          <button className="text-white bg-[#27272a] p-2.5 rounded-lg border border-gray-700 shadow-md">
            <FiLayout size={20} />
          </button>
        </div>

        <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 p-2.5 transition-colors">
          <FiLogOut size={22} />
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Projetos de {user?.name || 'Carregando...'}
            </h1>
            <p className="text-gray-500 text-sm mt-1 mb-8">Gerencie seus fluxos de trabalho baseados em projetos.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors shadow-sm shadow-white/10"
          >
            <FiFolderPlus />
            Novo Projeto
          </button>
        </header>

        {/* 4. Feedback de carregamento ou lista vazia */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Buscando seus projetos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onClick={() => navigate(`/dashboard/projetos/${proj.id}`)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 border border-dashed border-gray-800 rounded-xl">
                Nenhum projeto encontrado. Comece criando um novo!
              </div>
            )}
          </div>
        )}
      </main>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
