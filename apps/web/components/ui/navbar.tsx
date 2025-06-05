"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Gamepad2 } from 'lucide-react';

export function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Implement search functionality here
      console.log('Searching for:', searchValue.trim());
      // In a real application, you would:
      // - Navigate to search results page
      // - Call an API endpoint
      // - Update state with search results
      // For now, we'll just log the search term
    }
  };

  // Handle login button click
  const handleLogin = () => {
    // Implement login functionality here
    console.log('Login button clicked');
    // In a real application, you would:
    // - Redirect to login page: window.location.href = '/login';
    // - Open a login modal
    // - Call an authentication service
    // - Use Next.js router: router.push('/login');
    // For now, we'll just log the action
    
    // Example redirect (uncomment when you have a login page):
    // window.location.href = '/login';
  };

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
              
              {/* Features Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors font-medium text-foreground"
                  onClick={() => {
                    setFeaturesOpen(!featuresOpen);
                    setMoreOpen(false);
                  }}
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
                {featuresOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <a href="/profiles" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Gaming Profiles
                      </a>
                      <a href="/tournaments" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Tournaments
                      </a>
                      <a href="/teams" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Team Management
                      </a>
                      <a href="/stats" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Statistics
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors font-medium text-foreground"
                  onClick={() => {
                    setMoreOpen(!moreOpen);
                    setFeaturesOpen(false);
                  }}
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <a href="/community" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Community
                      </a>
                      <a href="/support" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Support
                      </a>
                      <a href="/about" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        About Us
                      </a>
                      <a href="/contact" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        Contact
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form 
              className="relative w-full"
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Search form"
            >
              <Input
                type="text"
                placeholder="Enter your search here..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-background border-input focus:border-ring"
                aria-label="Search for games, players, or content"
                aria-describedby="search-description"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <span id="search-description" className="sr-only">
                Search for games, players, tournaments, and gaming content
              </span>
            </form>
          </div>

          {/* Right Side - Login Button */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="default" 
              onClick={handleLogin}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(featuresOpen || moreOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setFeaturesOpen(false);
            setMoreOpen(false);
          }}
        />
      )}
    </nav>
  );
} 