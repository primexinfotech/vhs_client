import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/orders" component={Orders} />
      <Route path="/shipments" component={() => <div className="p-6">Shipments page coming soon...</div>} />
      <Route path="/customers" component={() => <div className="p-6">Customers page coming soon...</div>} />
      <Route path="/analytics" component={() => <div className="p-6">Analytics page coming soon...</div>} />
      <Route path="/billing" component={() => <div className="p-6">Billing page coming soon...</div>} />
      <Route path="/settings" component={() => <div className="p-6">Settings page coming soon...</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AdminLayout>
          <Router />
        </AdminLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;