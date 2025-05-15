
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";

// Mock user data type (same as in Users.tsx)
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  // Additional details for the user detail page
  joinDate?: string;
  lastActive?: string;
  location?: string;
}

// Mock API function to fetch a single user
const fetchUser = async (id: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This would be a real API call in a production app
  const users: Record<string, User> = {
    "1": { 
      id: "1", 
      name: "Alice Johnson", 
      email: "alice@example.com", 
      role: "Admin", 
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2023-05-14",
      location: "New York, USA"
    },
    "2": { 
      id: "2", 
      name: "Bob Smith", 
      email: "bob@example.com", 
      role: "User", 
      status: "active",
      joinDate: "2023-02-20",
      lastActive: "2023-05-12",
      location: "London, UK"
    },
    "3": { 
      id: "3", 
      name: "Carol White", 
      email: "carol@example.com", 
      role: "User", 
      status: "inactive",
      joinDate: "2023-03-10",
      lastActive: "2023-04-05",
      location: "Toronto, Canada"
    },
    "4": { 
      id: "4", 
      name: "David Brown", 
      email: "david@example.com", 
      role: "Editor", 
      status: "active",
      joinDate: "2023-01-05",
      lastActive: "2023-05-15",
      location: "Sydney, Australia"
    },
    "5": { 
      id: "5", 
      name: "Eva Green", 
      email: "eva@example.com", 
      role: "User", 
      status: "inactive",
      joinDate: "2023-04-22",
      lastActive: "2023-04-25",
      location: "Paris, France"
    },
  };
  
  const user = users[id];
  if (!user) {
    throw new Error("User not found");
  }
  
  return user;
};

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ""),
    enabled: !!userId,
  });

  if (error) {
    toast({
      title: "Error",
      description: "User not found or could not be loaded",
      variant: "destructive",
    });
  }

  const handleBack = () => {
    navigate("/users");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Not Found</h1>
        <Button onClick={handleBack}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">User Details</h1>
        <Button onClick={handleBack} variant="outline">Back to Users</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{user.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <HoverCard>
                  <HoverCardTrigger>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {user.status === 'active' 
                      ? "User account is currently active" 
                      : "User account has been deactivated"}
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{user.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="font-medium">{user.lastActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
