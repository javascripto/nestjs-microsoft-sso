import { MicrosoftLogo } from '@/components/MicrosoftLogo'; // Reusing logo for header
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        Usuário não encontrado. Tente fazer login novamente.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <MicrosoftLogo className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg text-gray-800">My App</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="/#"
            className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md font-medium"
          >
            Dashboard
          </a>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            Sair da conta
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header (Mobile + Desktop User Menu) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-800">Visão Geral</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.name || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={logout}
            >
              Sair
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
                ID do Usuário
              </h3>
              <p
                className="text-2xl font-bold text-gray-800 truncate"
                // @ts-ignore
                title={user.userId || user.id || ''}
              >
                {/* @ts-ignore */}
                {user.userId || user.id || ''}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center text-gray-400">
            Área de conteúdo principal...
          </div>
        </div>
      </main>
    </div>
  );
}
