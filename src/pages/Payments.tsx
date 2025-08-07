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
import { Payment, Client, StatusPayment, TypePayment } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { PaymentForm } from "@/components/PaymentForm";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsData, clientsData] = await Promise.all([
        apiClient.getPayments(),
        apiClient.getClients()
      ]);
      setPayments(paymentsData);
      setClients(clientsData);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este pagamento?")) {
      try {
        await apiClient.deletePayment(id);
        setPayments(payments.filter(p => p.id !== id));
        toast({
          title: "Sucesso",
          description: "Pagamento excluído com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o pagamento.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async (paymentData: Omit<Payment, "id" | "create_date">) => {
    try {
      if (editingPayment) {
        const updatedPayment = await apiClient.updatePayment(editingPayment.id, paymentData);
        setPayments(payments.map(p => p.id === editingPayment.id ? updatedPayment : p));
        toast({
          title: "Sucesso",
          description: "Pagamento atualizado com sucesso.",
        });
      } else {
        const newPayment = await apiClient.createPayment(paymentData);
        setPayments([...payments, newPayment]);
        toast({
          title: "Sucesso",
          description: "Pagamento criado com sucesso.",
        });
      }
      setIsDialogOpen(false);
      setEditingPayment(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o pagamento.",
        variant: "destructive",
      });
    }
  };

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || "Cliente não encontrado";
  };

  const getStatusColor = (status: StatusPayment) => {
    switch (status) {
      case "PAGO":
        return "bg-green-100 text-green-800";
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      case "VENCIDO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: TypePayment) => {
    switch (type) {
      case "CARTAO":
        return "bg-blue-100 text-blue-800";
      case "BOLETO":
        return "bg-orange-100 text-orange-800";
      case "AVISTA":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPayments = payments.filter(payment => {
    const clientName = getClientName(payment.client_id).toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return clientName.includes(searchLower) || 
           payment.value.toString().includes(searchTerm) ||
           payment.status.toLowerCase().includes(searchLower);
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pagamentos</h1>
          <p className="text-muted-foreground">
            Gerencie os pagamentos dos clientes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPayment(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Pagamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPayment ? "Editar Pagamento" : "Novo Pagamento"}
              </DialogTitle>
              <DialogDescription>
                {editingPayment 
                  ? "Edite as informações do pagamento abaixo."
                  : "Preencha as informações do novo pagamento."
                }
              </DialogDescription>
            </DialogHeader>
            <PaymentForm
              payment={editingPayment}
              clients={clients}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPayment(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Pagamentos</CardTitle>
              <CardDescription>
                {filteredPayments.length} pagamento(s) encontrado(s)
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pagamentos..."
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
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Vencimento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {getClientName(payment.client_id)}
                  </TableCell>
                  <TableCell>
                    R$ {payment.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(payment.type)}>
                      {payment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(payment.final_date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPayment(payment);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(payment.id)}
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

export default Payments;