import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Payment, Client, TypePayment, StatusPayment } from "@/types/api";

interface PaymentFormProps {
  payment?: Payment | null;
  clients: Client[];
  onSave: (payment: Omit<Payment, "id" | "create_date">) => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ payment, clients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    value: 0,
    type: "BOLETO" as TypePayment,
    final_date: "",
    status: "PENDENTE" as StatusPayment,
    client_id: 0,
  });

  useEffect(() => {
    if (payment) {
      setFormData({
        value: payment.value,
        type: payment.type,
        final_date: payment.final_date.split('T')[0], // Format date for input
        status: payment.status,
        client_id: payment.client_id,
      });
    }
  }, [payment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="client_id">Cliente</Label>
        <Select
          value={formData.client_id.toString()}
          onValueChange={(value) => setFormData({ ...formData, client_id: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">Valor</Label>
        <Input
          id="value"
          type="number"
          step="0.01"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo de Pagamento</Label>
        <Select
          value={formData.type}
          onValueChange={(value: TypePayment) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BOLETO">Boleto</SelectItem>
            <SelectItem value="CARTAO">Cartão</SelectItem>
            <SelectItem value="AVISTA">À Vista</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: StatusPayment) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="PAGO">Pago</SelectItem>
            <SelectItem value="VENCIDO">Vencido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="final_date">Data de Vencimento</Label>
        <Input
          id="final_date"
          type="date"
          value={formData.final_date}
          onChange={(e) => setFormData({ ...formData, final_date: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {payment ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};