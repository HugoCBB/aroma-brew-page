import { LoginRequest, LoginResponse, User, Client, Payment, ApiResponse } from "@/types/api";

const API_BASE_URL = "https://api-crm-hugocbb.onrender.com/api";

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem("auth_token");
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    return this.request<User[]>("/user");
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/user/${id}`);
  }

  async createUser(user: Omit<User, "id" | "create_date">): Promise<User> {
    return this.request<User>("/user", {
      method: "POST",
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.request<User>(`/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.request<void>(`/user/${id}`, {
      method: "DELETE",
    });
  }

  // Client endpoints
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>("/client");
  }

  async getClient(id: number): Promise<Client> {
    return this.request<Client>(`/client/${id}`);
  }

  async createClient(client: Omit<Client, "id" | "create_date">): Promise<Client> {
    return this.request<Client>("/client", {
      method: "POST",
      body: JSON.stringify(client),
    });
  }

  async updateClient(id: number, client: Partial<Client>): Promise<Client> {
    return this.request<Client>(`/client/${id}`, {
      method: "PUT",
      body: JSON.stringify(client),
    });
  }

  async deleteClient(id: number): Promise<void> {
    return this.request<void>(`/client/${id}`, {
      method: "DELETE",
    });
  }

  // Payment endpoints
  async getPayments(): Promise<Payment[]> {
    return this.request<Payment[]>("/payment");
  }

  async getPayment(id: number): Promise<Payment> {
    return this.request<Payment>(`/payment/${id}`);
  }

  async getPaymentsByClient(clientId: number): Promise<Payment[]> {
    return this.request<Payment[]>(`/payment/client/${clientId}`);
  }

  async createPayment(payment: Omit<Payment, "id" | "create_date">): Promise<Payment> {
    return this.request<Payment>("/payment", {
      method: "POST",
      body: JSON.stringify(payment),
    });
  }

  async updatePayment(id: number, payment: Partial<Payment>): Promise<Payment> {
    return this.request<Payment>(`/payment/${id}`, {
      method: "PUT",
      body: JSON.stringify(payment),
    });
  }

  async deletePayment(id: number): Promise<void> {
    return this.request<void>(`/payment/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();