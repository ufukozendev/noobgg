"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingScreen from "@/components/loading-screen";
import ThreeDLoadingScreen from "@/components/loading/3d-loading-screen";
import { usePageLoading } from "@/hooks/use-page-loading";

export default function LoadingDemo() {
  const [showBasicLoading, setShowBasicLoading] = useState(false);
  const [show3DLoading, setShow3DLoading] = useState(false);
  const [simulateDataLoading, setSimulateDataLoading] = useState(false);
  
  const { isLoading, startLoading } = usePageLoading();

  const handleBasicLoading = () => {
    setShowBasicLoading(true);
  };

  const handle3DLoading = () => {
    setShow3DLoading(true);
  };
  const handleDataLoading = () => {
    setSimulateDataLoading(true);
    startLoading();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Loading Screen Demo
          </h1>
          <p className="text-xl text-white/70">
            Test different loading screen variants for noob.gg
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Loading Demo */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Loading Screen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Simple loading screen with animated logo and progress bar
              </p>
              <Button 
                onClick={handleBasicLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Test Basic Loading
              </Button>
            </CardContent>
          </Card>

          {/* 3D Loading Demo */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">3D Loading Screen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                3D interactive loading with spinning cube and particle effects
              </p>
              <Button 
                onClick={handle3DLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Test 3D Loading
              </Button>
            </CardContent>
          </Card>

          {/* Page Loading Demo */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Page Transition Loading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Simulates data loading with automatic page transition
              </p>
              <Button 
                onClick={handleDataLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Test Page Loading"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <div className="mt-12">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Loading Screen Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Basic Loading Screen</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Animated noob.gg logo</li>
                    <li>• Smooth progress bar</li>
                    <li>• Gradient background</li>
                    <li>• Configurable duration</li>
                    <li>• Fade out animation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">3D Loading Screen</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Interactive 3D cube</li>
                    <li>• Particle system effects</li>
                    <li>• 3D floating text</li>
                    <li>• Auto-rotating camera</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white">1. Basic Implementation</h4>
                  <p>Import LoadingScreen component and wrap your app content</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">2. 3D Loading</h4>
                  <p>Use ThreeDLoadingScreen for more interactive experience</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">3. Page Transitions</h4>
                  <p>Use usePageLoading hook for data loading states</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">4. Customization</h4>
                  <p>All components support custom duration, colors, and callbacks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>      {/* Loading Screens */}
      {showBasicLoading && (
        <LoadingScreen
          onLoadingComplete={() => setShowBasicLoading(false)}
        />
      )}

      {show3DLoading && (
        <ThreeDLoadingScreen
          isLoading={show3DLoading}
          onLoadingComplete={() => setShow3DLoading(false)}
          duration={4000}
        />
      )}

      {/* Page Loading Overlay */}
      {(isLoading || simulateDataLoading) && (
        <LoadingScreen
          onLoadingComplete={() => setSimulateDataLoading(false)}
        />
      )}
    </div>
  );
}
