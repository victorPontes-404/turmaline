import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import TaskModal from './TaskModal';

// Colunas iniciais mockadas para o Drag and Drop ter de onde ler a base
const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task-1', 'task-2'],
  },
  doing: {
    id: 'doing',
    title: 'In Progress',
    taskIds: ['task-3'],
  },
  done: {
    id: 'done',
    title: 'Done',
    taskIds: [],
  },
};

// Tarefas iniciais mockadas simulando dados do Backend
const initialTasks = {
  'task-1': { id: 'task-1', content: 'Planejar arquitetura do BD', assignee: 'Victor Pontes' },
  'task-2': { id: 'task-2', content: 'Criar protótipos no Figma', assignee: 'Ana Silva' },
  'task-3': { id: 'task-3', content: 'Setup do ambiente FastAPI' },
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const moveTask = (source, destination, draggableId) => {
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      
      setColumns({ ...columns, [start.id]: { ...start, taskIds: newTaskIds }});
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setColumns({ ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
  };
  
  // Array simples definindo a ordem das colunas da esquerda pra direita
  const columnOrder = ['todo', 'doing', 'done'];

  // Função core do hello-pangea/dnd que Roteiriza o que acontece quando largamos o Drag
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Se soltou fora de qualquer droppable válido
    if (!destination) return;
    
    moveTask(source, destination, draggableId);
  };

  return (
    <div className="h-full w-full flex flex-col">
      
      {/* Header do Board de Kanban pra controles gerais */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Sprint Setup</h2>
        <button 
          onClick={() => setIsTaskModalOpen(true)}
          className="flex items-center gap-2 bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border border-gray-700 shadow-sm"
        >
          <FiPlus /> Nova Tarefa
        </button>
      </div>

      <div className="flex-1 overflow-x-auto min-h-0">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            
            {/* Iteração sobre cada uma das 'raias' (Todo, Doing, Done) */}
            {columnOrder.map((colId) => {
              const column = columns[colId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

              return (
                <div key={column.id} className="w-80 shrink-0 flex flex-col bg-[#121216] border border-gray-800 rounded-xl max-h-full">
                  <div className="p-4 flex justify-between items-center border-b border-gray-800/60">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-200">{column.title}</h3>
                      <span className="text-xs bg-[#27272a] text-gray-400 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <FiMoreHorizontal />
                    </button>
                  </div>
                  
                  {/* Container que ACEITA arquivos sendo arrastados para dentro dele */}
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 overflow-y-auto min-h-[150px] transition-colors ${snapshot.isDraggingOver ? 'bg-[#18181c]' : ''}`}
                      >
                        {/* Iteração dos cards efetivos dentro das raias */}
                        {columnTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => setIsTaskModalOpen(true)}
                                className={`bg-[#1e1e24] p-4 rounded-lg mb-3 shadow border cursor-pointer transition-all ${
                                  snapshot.isDragging 
                                    ? 'border-indigo-500 shadow-indigo-500/20 shadow-lg scale-105 z-50' 
                                    : 'border-gray-700/60 hover:border-gray-600'
                                }`}
                              >
                                <p className="text-gray-300 text-sm leading-snug">{task.content}</p>
                                <div className="mt-3 flex justify-between items-center text-xs">
                                  <div className="flex -space-x-2">
                                    {/* Exibindo Avatar minúsculo caso alguem puxe a tarefa */}
                                    {task.assignee && (
                                      <div className="w-6 h-6 rounded-full bg-indigo-900 border border-[#1e1e24] flex items-center justify-center text-[10px] text-white" title={task.assignee}>
                                        {task.assignee.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  {/* Ticket Numérico estilo Jira (extraído da mock ID) */}
                                  <span className="text-gray-500 font-mono">T-{task.id.split('-')[1]}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  
                  <div className="p-3 border-t border-gray-800/60">
                     <button 
                       onClick={() => setIsTaskModalOpen(true)}
                       className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors w-full p-2 hover:bg-[#1a1a20] rounded-md"
                     >
                        <FiPlus size={16} /> Adicionar card
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
      {/* Modais flutuantes */}
      <TaskModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)} 
          onCreateTask={(title, statusId, assigneeName) => {
              const newId = `task-${Date.now()}`;
              const newTask = { id: newId, content: title, assignee: assigneeName };
              setTasks({ ...tasks, [newId]: newTask });
              
              const col = columns[statusId];
              setColumns({ 
                 ...columns, 
                 [statusId]: { ...col, taskIds: [...col.taskIds, newId] }
              });
          }}
      />
    </div>
  );
}
