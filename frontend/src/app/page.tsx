"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Server,
  Database,
  RefreshCw,
  Github,
  ExternalLink,
  Container,
  Workflow,
  Shield,
  Zap,
  Globe,
  Code2,
  Boxes,
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

interface DataItem {
  id: number;
  name: string;
  status: string;
}

interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState<"online" | "offline" | "checking">("checking");
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/data");
      if (res.ok) {
        const json = await res.json();
        setData(json.items);
        setBackendStatus("online");
      } else {
        setBackendStatus("offline");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      setBackendStatus("offline");
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkflows = async () => {
    try {
      const res = await fetch("https://api.github.com/repos/HimanM/DevOps-Project-1/actions/runs?per_page=5");
      if (res.ok) {
        const json = await res.json();
        setWorkflows(json.workflow_runs);
      }
    } catch (error) {
      console.error("Failed to fetch workflows", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchWorkflows();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const techStack = [
    { name: "Next.js 14", icon: Code2, color: "text-cyan-400", category: "Frontend" },
    { name: "Flask", icon: Server, color: "text-green-400", category: "Backend" },
    { name: "Docker", icon: Container, color: "text-blue-400", category: "Container" },
    { name: "Nginx", icon: Globe, color: "text-emerald-400", category: "Proxy" },
    { name: "Terraform", icon: Boxes, color: "text-purple-400", category: "IaC" },
    { name: "Ansible", icon: Workflow, color: "text-red-400", category: "Config" },
    { name: "GitHub Actions", icon: GitBranch, color: "text-orange-400", category: "CI/CD" },
    { name: "Let's Encrypt", icon: Shield, color: "text-yellow-400", category: "SSL" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="inline-block p-2 px-4 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-cyan-400">
              DevOps Project 1
            </div>
            <a
              href="https://github.com/HimanM/DevOps-Project-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Full-Stack DevOps Platform
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Production-grade demonstration of containerized microservices, Infrastructure as Code, and automated CI/CD pipelines.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200 flex items-center gap-2">
                <Boxes className="h-5 w-5 text-cyan-400" />
                System Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* User Layer */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Layer</div>
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <Globe className="h-8 w-8 text-cyan-400 mb-2" />
                    <div className="font-semibold text-slate-200">End User</div>
                    <div className="text-xs text-slate-500 mt-1">HTTPS Request</div>
                  </div>
                </div>

                {/* VPS Layer */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">VPS Layer</div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <Globe className="h-6 w-6 text-emerald-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">Nginx</div>
                      <div className="text-xs text-slate-500">Port 443 (SSL)</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <Code2 className="h-6 w-6 text-blue-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">Frontend</div>
                      <div className="text-xs text-slate-500">Next.js :57001</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <Server className="h-6 w-6 text-green-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">Backend</div>
                      <div className="text-xs text-slate-500">Flask :5000</div>
                    </div>
                  </div>
                </div>

                {/* CI/CD Layer */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Automation</div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <GitBranch className="h-6 w-6 text-purple-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">GitHub Actions</div>
                      <div className="text-xs text-slate-500">CI/CD Pipeline</div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <Boxes className="h-6 w-6 text-orange-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">Terraform</div>
                      <div className="text-xs text-slate-500">Infrastructure</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <Workflow className="h-6 w-6 text-red-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-200">Ansible</div>
                      <div className="text-xs text-slate-500">Configuration</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {techStack.map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all group"
                  >
                    <tech.icon className={`h-8 w-8 ${tech.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <div className="text-sm font-semibold text-slate-200">{tech.name}</div>
                    <div className="text-xs text-slate-500">{tech.category}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status Dashboard */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={item}>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Backend Status</CardTitle>
                <Server className={`h-4 w-4 ${backendStatus === 'online' ? 'text-green-500' : 'text-red-500'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100 capitalize">{backendStatus}</div>
                <p className="text-xs text-slate-500 mt-1">Flask API Connection</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Metrics</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">Prometheus</div>
                <p className="text-xs text-slate-500 mt-1">Exposed at /metrics</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Infrastructure</CardTitle>
                <Database className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">Dockerized</div>
                <p className="text-xs text-slate-500 mt-1">NGINX Proxy</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* GitHub Workflows */}
        {workflows.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-200 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-orange-400" />
                  Recent Workflow Runs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workflows.slice(0, 5).map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {workflow.conclusion === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : workflow.conclusion === "failure" ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-slate-200">{workflow.name}</div>
                          <div className="text-xs text-slate-500">
                            {new Date(workflow.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs font-semibold uppercase px-2 py-1 rounded ${workflow.conclusion === "success"
                          ? "bg-green-500/10 text-green-400"
                          : workflow.conclusion === "failure"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                        {workflow.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Live Data Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-200">Live Data</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading && data.length === 0 ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-slate-900/50 animate-pulse border border-slate-800" />
              ))
            ) : data.length > 0 ? (
              data.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-slate-500">ID: {item.id}</span>
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider ${item.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-700 text-slate-400'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-200">{item.name}</h3>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                No data available. Is the backend running?
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
