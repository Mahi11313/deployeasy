import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Github, Code, Terminal, Settings, FileText, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

interface AnalysisResult {
  stack: string;
  framework: string;
  buildCommand: string;
  startCommand: string;
  requiredEnv: string[];
  recommendedEnvTemplate: string;
  deploymentType: string;
  notes: string;
  repoUrl: string;
  analyzedAt: string;
}

export default function RepoAnalysis() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('http://localhost:3001/api/analyze-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl: repoUrl.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnalyzing) {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              AI Repository Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by Gemini AI, analyze any GitHub repository to detect technology stack, 
              build commands, and deployment requirements automatically.
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Repository Analysis
              </CardTitle>
              <CardDescription>
                Enter a GitHub repository URL to analyze its technology stack and deployment requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isAnalyzing}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !repoUrl.trim()}
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Repository'
                  )}
                </Button>
              </div>
              
              {error && (
                <Alert className="mt-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Loading State */}
          {isAnalyzing && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">Analyzing Repository with AI...</h3>
                    <p className="text-gray-600">
                      Cloning repository, scanning files, and processing with Gemini AI
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Technology Stack Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {analysis.stack}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      {analysis.framework}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Commands Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Detected Commands
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Build Command</h4>
                    <code className="bg-gray-100 px-3 py-2 rounded-md block">
                      {analysis.buildCommand}
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Start Command</h4>
                    <code className="bg-gray-100 px-3 py-2 rounded-md block">
                      {analysis.startCommand}
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Environment Variables */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Required Environment Variables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.requiredEnv && analysis.requiredEnv.length > 0 ? (
                    <ul className="space-y-2">
                      {analysis.requiredEnv.map((env, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Badge variant="outline">{env}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No specific environment variables detected</p>
                  )}
                </CardContent>
              </Card>

              {/* Environment Template */}
              {analysis.recommendedEnvTemplate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recommended .env Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
                      {analysis.recommendedEnvTemplate}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {/* Deployment Type & Notes */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deployment Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="text-lg px-4 py-2">
                      {analysis.deploymentType}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{analysis.notes}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}