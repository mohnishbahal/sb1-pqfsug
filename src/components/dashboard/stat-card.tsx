import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, MoreVertical } from 'lucide-react';
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MiniTrendGraph } from './MiniTrendGraph';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  trend?: {
    value: number;
    label: string;
    data: { value: number }[];
  }
  goal?: {
    value: number;
    progress: number;
  }
  insight?: string;
  tooltip?: string;
  onClick?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  goal,
  insight,
  tooltip,
  onClick 
}: StatCardProps) {
  const isTrendPositive = trend?.value && trend.value > 0;
  
  return (
    <TooltipProvider>
      <Card 
        className={cn(
          "transition-all duration-200 group overflow-hidden",
          onClick && "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
        )}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6">
          <CardTitle className="text-sm font-medium truncate max-w-[180px]">
            <Tooltip>
              <TooltipTrigger className="text-left">{title}</TooltipTrigger>
              {tooltip && (
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Set Goal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="metric-value truncate">{value}</div>
            {trend?.data && (
              <div className="flex-shrink-0">
                <MiniTrendGraph 
                  data={trend.data} 
                  color={isTrendPositive ? '#22c55e' : '#ef4444'} 
                />
              </div>
            )}
          </div>
          {goal && (
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Target className="h-4 w-4 mr-2 flex-shrink-0" />
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="whitespace-nowrap text-xs sm:text-sm flex-shrink-0">Goal: {goal.value}</span>
              </div>
            </div>
          )}
          {(description || trend) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {trend && (
                <div className={cn(
                  "flex items-center text-sm sm:text-base",
                  isTrendPositive ? "text-green-600" : "text-red-600"
                )}>
                  {isTrendPositive ? (
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 mr-1 flex-shrink-0" />
                  )}
                  <span className="font-medium whitespace-nowrap">{isTrendPositive ? '+' : ''}{trend.value}%</span>
                  {trend.label && (
                    <span className="text-muted-foreground ml-1 text-xs sm:text-sm truncate">{trend.label}</span>
                  )}
                </div>
              )}
              {description && (
                <span className="text-xs sm:text-sm text-muted-foreground truncate">{description}</span>
              )}
            </div>
          )}
          {insight && (
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">{insight}</p>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}