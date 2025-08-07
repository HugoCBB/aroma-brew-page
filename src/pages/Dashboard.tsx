import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Client, Payment } from "@/types/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clients, payments] = await Promise.all([
          apiClient.getClients(),
          apiClient.getPayments(),
        ]);

        const pendingPayments = payments.filter(p => p.status === "PENDENTE").length;
        const totalRevenue = payments
          .filter(p => p.status === "PAGO")
          .reduce((sum, p) => sum + p.value, 0);

        setStats({
          totalClients: clients.length,
          totalPayments: payments.length,
          pendingPayments,
          totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total de Clientes",
      value: stats.totalClients,
      description: "Clientes cadastrados",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total de Pagamentos",
      value: stats.totalPayments,
      description: "Pagamentos registrados",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      title: "Pagamentos Pendentes",
      value: stats.pendingPayments,
      description: "Aguardando pagamento",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      title: "Receita Total",
      value: `R$ ${stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Pagamentos recebidos",
      icon: DollarSign,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu sistema CRM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Atividades</CardTitle>
            <CardDescription>
              Resumo das ações mais recentes no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Novo cliente cadastrado
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Há 2 horas
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Pagamento recebido
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Há 4 horas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Pagamentos</CardTitle>
            <CardDescription>
              Distribuição dos status de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pagos</span>
                <span className="text-sm font-medium text-green-600">
                  {((stats.totalPayments - stats.pendingPayments) / stats.totalPayments * 100 || 0).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pendentes</span>
                <span className="text-sm font-medium text-yellow-600">
                  {(stats.pendingPayments / stats.totalPayments * 100 || 0).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;