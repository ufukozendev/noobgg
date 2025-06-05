"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Gamepad2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Noob.GG</span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="hover:text-primary transition-colors font-medium text-foreground">
                Home
              </a>
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors font-medium text-foreground">
                  <span>Features</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Dropdown menu could be added here */}
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors font-medium text-foreground">
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Dropdown menu could be added here */}
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Enter your search here..."
                className="w-full pl-10 pr-4 py-2 bg-background border-input focus:border-ring"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Right Side - Login Button */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 