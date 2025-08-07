import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
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
import { apiClient } from "@/lib/api";
import { Client } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { ClientForm } from "@/components/ClientForm";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsData = await apiClient.getClients();
      setClients(clientsData);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await apiClient.deleteClient(id);
        setClients(clients.filter(c => c.id !== id));
        toast({
          title: "Sucesso",
          description: "Cliente excluído com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o cliente.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async (clientData: Omit<Client, "id" | "create_date">) => {
    try {
      if (editingClient) {
        const updatedClient = await apiClient.updateClient(editingClient.id, clientData);
        setClients(clients.map(c => c.id === editingClient.id ? updatedClient : c));
        toast({
          title: "Sucesso",
          description: "Cliente atualizado com sucesso.",
        });
      } else {
        const newClient = await apiClient.createClient(clientData);
        setClients([...clients, newClient]);
        toast({
          title: "Sucesso",
          description: "Cliente criado com sucesso.",
        });
      }
      setIsDialogOpen(false);
      setEditingClient(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o cliente.",
        variant: "destructive",
      });
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClient(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Editar Cliente" : "Novo Cliente"}
              </DialogTitle>
              <DialogDescription>
                {editingClient 
                  ? "Edite as informações do cliente abaixo."
                  : "Preencha as informações do novo cliente."
                }
              </DialogDescription>
            </DialogHeader>
            <ClientForm
              client={editingClient}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingClient(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {filteredClients.length} cliente(s) encontrado(s)
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
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
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{new Date(client.create_date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingClient(client);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(client.id)}
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

export default Clients;