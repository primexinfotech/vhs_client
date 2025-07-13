import { users, orders, type User, type InsertUser, type Order, type InsertOrder, type UpdateOrder } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getOrders(limit?: number, offset?: number, filters?: { status?: string; search?: string }): Promise<{ orders: Order[]; total: number }>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: UpdateOrder): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentOrderId = 1;
    
    // Initialize with some sample orders
    this.initializeOrders();
  }

  private initializeOrders() {
    const sampleOrders: InsertOrder[] = [
      {
        orderId: "ORD-001",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@email.com",
        productName: "Electronics Package",
        productWeight: "2.5",
        destinationCity: "New York",
        destinationPostal: "10001",
        destinationAddress: "123 Main St, New York, NY 10001",
        status: "in_transit",
        amount: "45.99"
      },
      {
        orderId: "ORD-002",
        customerName: "Michael Chen",
        customerEmail: "michael@email.com",
        productName: "Fashion Items",
        productWeight: "1.2",
        destinationCity: "Los Angeles",
        destinationPostal: "90210",
        destinationAddress: "456 Hollywood Blvd, Los Angeles, CA 90210",
        status: "delivered",
        amount: "32.50"
      },
      {
        orderId: "ORD-003",
        customerName: "Emma Davis",
        customerEmail: "emma@email.com",
        productName: "Books & Media",
        productWeight: "0.8",
        destinationCity: "Chicago",
        destinationPostal: "60601",
        destinationAddress: "789 State St, Chicago, IL 60601",
        status: "picked_up",
        amount: "18.75"
      }
    ];

    sampleOrders.forEach(order => {
      this.createOrder(order);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getOrders(limit = 10, offset = 0, filters?: { status?: string; search?: string }): Promise<{ orders: Order[]; total: number }> {
    let orders = Array.from(this.orders.values());

    // Apply filters
    if (filters?.status && filters.status !== 'all') {
      orders = orders.filter(order => order.status === filters.status);
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      orders = orders.filter(order => 
        order.orderId.toLowerCase().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm) ||
        order.customerEmail.toLowerCase().includes(searchTerm) ||
        order.productName.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = orders.length;
    const paginatedOrders = orders.slice(offset, offset + limit);

    return { orders: paginatedOrders, total };
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const now = new Date().toISOString();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updateOrder: UpdateOrder): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;

    const updatedOrder: Order = {
      ...existingOrder,
      ...updateOrder,
      updatedAt: new Date().toISOString(),
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
