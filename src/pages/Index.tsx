
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock API functions
const fetchStats = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalUsers: 1234,
    activeUsers: 857,
    newSignups: 43
  };
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load dashboard data",
      variant: "destructive",
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? "Loading..." : data?.totalUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Users active in past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? "Loading..." : data?.activeUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Signups</CardTitle>
            <CardDescription>Users joined today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? "Loading..." : data?.newSignups}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Quick Navigation</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/users" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
