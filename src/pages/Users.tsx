import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";
import { User, RolesUser } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/contexts/AuthContext";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  // Only ADMIN users can access this page
  if (currentUser?.roles_user !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await apiClient.getUsers();
      setUsers(usersData);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await apiClient.deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
        toast({
          title: "Sucesso",
          description: "Usuário excluído com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o usuário.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async (userData: Omit<User, "id" | "create_date">) => {
    try {
      if (editingUser) {
        const updatedUser = await apiClient.updateUser(editingUser.id, userData);
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
        });
      } else {
        const newUser = await apiClient.createUser(userData);
        setUsers([...users, newUser]);
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso.",
        });
      }
      setIsDialogOpen(false);
      setEditingUser(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o usuário.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: RolesUser) => {
    return role === "ADMIN" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-blue-100 text-blue-800";
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Edite as informações do usuário abaixo."
                  : "Preencha as informações do novo usuário."
                }
              </DialogDescription>
            </DialogHeader>
            <UserForm
              user={editingUser}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingUser(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>
                {filteredUsers.length} usuário(s) encontrado(s)
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.roles_user)}>
                      {user.roles_user}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.create_date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingUser(user);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;