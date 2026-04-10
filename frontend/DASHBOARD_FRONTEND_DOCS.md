# Documentação: Frontend do Dashboard (UI Mock)

Esta documentação resume a arquitetura visual e os componentes criados para o módulo de "Dashboard e Projetos" da aplicação Turmaline.

## 1. Visão Geral
Foi construída a interface do usuário (UI) para o ambiente logado, seguindo uma estética **Dark Premium** inspirada em IDEs (IntelliJ) e ferramentas de produtividade (Obsidian). O fluxo abrange a listagem de projetos e a visão interna do projeto.

---

## 2. Roteamento (App.jsx)
Foram adicionadas duas novas rotas protegidas (atualmente sem barreira de login rígida para fins de teste na interface):
- `/dashboard`: Tela inicial com a listagem de todos os projetos do usuário.
- `/dashboard/projetos/:id`: Tela interna dedicada a um projeto específico contendo abas nativas.

---

## 3. Páginas Criadas
- **`Dashboard.jsx`**
  - **Função**: Exibe os repositórios/projetos.
  - **Estrutura**: Possui uma "Sidebar" principal lateral e um Grid de `ProjectCard`s que lista os arquivos. Conta também com o botão que aciona a criação de projetos.
  
- **`ProjectView.jsx`**
  - **Função**: Atua como uma "IDE" dentro do navegador.
  - **Estrutura**: Intercepta a rota via `useParams` para extrair o ID do projeto. Possui uma sub-sidebar para alternar rapidamente entre 3 abas sem trocar de URL: **Documentos**, **Tarefas** e **Kanban Board** via estado local (`activeTab`).

---

## 4. Componentes Chaves Criados
Todos os componentes residem na pasta `src/components/`:

- **`ProjectCard.jsx`**: Cartões contendo o atalho dos projetos que ficam no Dashboard.
- **`CreateProjectModal.jsx`**: Um modal pop-up simples englobando os inputs para título e descrição de um novo projeto a ser criado.
- **`MarkdownEditor.jsx`** 
  - Utiliza o pacote leve `@uiw/react-md-editor` para criar um ambiente fiel ao Obsidian, mesclando pré-visualização HTML lado a lado e salvamento nativo.
- **`KanbanBoard.jsx`** 
  - Integra a biblioteca `@hello-pangea/dnd` para habilitar a técnica de Drag & Drop (arrastar os cartões de tarefas soltando-os livremente nas raias "To Do", "In Progress" e "Done" controladas via `onDragEnd`).
- **`TaskModal.jsx`**
  - Modal expansivo do Kanban para criação mais robusta de tarefas, permitindo a vinculação visual da tarefa a um Documento Markdown específico do projeto.

---

## 5. Próximos Passos (Integração Fullstack)
A UI foi construída com estados mockados simulando dados do servidor. O próximo ciclo de desenvolvimento deve abranger:
1. Criação dos Models e Tabelas no FastAPI (Backend).
2. Substituição dos arquivos estáticos JSON do frontend por conexões HTTPS utilizando `axios` ou a `fetch` API.
