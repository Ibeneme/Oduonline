import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Users,
  Newspaper,
  Calendar,
  Contact,
  Mail,
  FileText,
  Settings,
} from "lucide-react";

interface QuickActionsProps {
  onTabChange: (tabId: string) => void;
}

const QuickActions = ({ onTabChange }: QuickActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">
          <Edit className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onTabChange("members")}>
          <Users className="h-4 w-4 mr-2" />
          Add New Member
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onTabChange("news")}>
          <Newspaper className="h-4 w-4 mr-2" />
          Create News Post
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onTabChange("events")}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Event
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onTabChange("chapters")}>
          <Contact className="h-4 w-4 mr-2" />
          Manage Chapters
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onTabChange("subadmins")}>
          <Users className="h-4 w-4 mr-2" />
          Create Sub-Admin
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Mail className="h-4 w-4 mr-2" />
          Send Newsletter
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActions;
