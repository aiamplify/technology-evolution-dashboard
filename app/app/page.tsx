
'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllData } from '@/hooks/use-data';
import { AccelerationFactorChart } from '@/components/charts/acceleration-factor-chart';
import { AdoptionSpeedChart } from '@/components/charts/adoption-speed-chart';
import { TimelineChart } from '@/components/charts/timeline-chart';
import { 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Zap, 
  Clock,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export default function ExecutiveSummary() {
  const { historical, ai, comparative, loading, error } = useAllData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="loading-skeleton h-32 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="loading-skeleton h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="loading-skeleton h-96 rounded-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !comparative || !historical || !ai) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-destructive">Error Loading Data</h2>
            <p className="text-muted-foreground mt-2">{error || 'Failed to load dashboard data'}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const keyMetrics = [
    {
      title: 'Adoption Speed Acceleration',
      value: '4.2x',
      description: 'AI technologies adopt faster than historical',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'AI Average Adoption',
      value: '8.5 years',
      description: 'vs 76.5 years for historical technologies',
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Geographic Concentration',
      value: '83%',
      description: 'AI technologies originated in the US',
      icon: Globe,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Fastest AI Adoption',
      value: '5 years',
      description: 'Generative AI (2017-2022)',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const keyInsights = comparative.detailed_analysis.key_insights.adoption_speed_insights.slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Technology Evolution Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Comparative analysis of historical technology adoption vs AI advancement
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {historical.technologies.length} Historical Technologies
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              {ai.technologies.length} AI Domains
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Analysis Date: June 5, 2025
            </Badge>
          </div>
        </div>

        {/* Key Findings */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Executive Summary</span>
            </CardTitle>
            <CardDescription>
              {comparative.executive_summary.key_finding}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Key Finding</h3>
                <p className="text-sm leading-relaxed">
                  {comparative.executive_summary.key_finding}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Unique AI Characteristics</h4>
                  <p className="text-sm text-muted-foreground">
                    {comparative.executive_summary.unique_ai_characteristics}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Investment Pattern Shift</h4>
                  <p className="text-sm text-muted-foreground">
                    {comparative.executive_summary.investment_pattern_shift}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="glass-effect card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Visualization */}
        <AccelerationFactorChart comparativeData={comparative} />

        {/* Key Insights */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Critical findings from the comparative analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/20">
                  <div className="p-1 rounded-full bg-primary/20 mt-1">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Charts Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdoptionSpeedChart 
            historicalTechnologies={historical.technologies} 
            aiTechnologies={ai.technologies} 
          />
          <TimelineChart 
            historicalTechnologies={historical.technologies} 
            aiTechnologies={ai.technologies} 
          />
        </div>

        {/* Navigation Hint */}
        <Card className="glass-effect border-muted/30">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Explore Detailed Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Use the sidebar navigation to dive deeper into specific aspects of the technology evolution analysis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}