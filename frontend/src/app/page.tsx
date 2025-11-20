"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Server, Database, RefreshCw } from "lucide-react";

interface DataItem {
  id: number;
  name: string;
  status: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState<"online" | "offline" | "checking">("checking");

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

  useEffect(() => {
    fetchData();
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 md:p-24 font-sans selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-cyan-400 mb-4">
            DevOps Learning Environment
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Full Stack <br /> Orchestration
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A modern playground to master Docker, Kubernetes, CI/CD pipelines, and Infrastructure as Code.
            Built with Next.js 14, Flask, and love.
          </p>
        </motion.div>

        {/* Status Dashboard */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

        {/* Data Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
