import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client } from "@/types/api";

interface ClientFormProps {
  client?: Client | null;
  onSave: (client: Omit<Client, "id" | "create_date">) => void;
  onCancel: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    user_id: 1, // TODO: Get from auth context
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        phone: client.phone,
        user_id: client.user_id,
      });
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {client ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};