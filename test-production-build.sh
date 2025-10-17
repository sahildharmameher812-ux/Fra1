#!/bin/bash

echo "🔨 FRA Atlas - Production Build Test Script"
echo "==========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean previous builds
echo "📦 Step 1: Cleaning previous builds..."
cd client
rm -rf build node_modules/.cache
echo "${GREEN}✓ Cleaned successfully${NC}"
echo ""

# Step 2: Install dependencies
echo "📥 Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "${RED}✗ npm install failed${NC}"
    exit 1
fi
echo "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Run production build
echo "🏗️  Step 3: Building production version..."
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}✗ Build failed${NC}"
    exit 1
fi
echo "${GREEN}✓ Build completed successfully${NC}"
echo ""

# Step 4: Check build output
echo "📋 Step 4: Checking build output..."
if [ -d "build" ]; then
    echo "${GREEN}✓ build/ directory exists${NC}"
    
    # Check for index.html
    if [ -f "build/index.html" ]; then
        echo "${GREEN}✓ index.html found${NC}"
    else
        echo "${RED}✗ index.html missing${NC}"
    fi
    
    # Check for static folder
    if [ -d "build/static" ]; then
        echo "${GREEN}✓ static/ folder exists${NC}"
        
        # Count JS files
        js_count=$(find build/static/js -name "*.js" 2>/dev/null | wc -l)
        echo "  - JavaScript files: $js_count"
        
        # Count CSS files
        css_count=$(find build/static/css -name "*.css" 2>/dev/null | wc -l)
        echo "  - CSS files: $css_count"
    else
        echo "${RED}✗ static/ folder missing${NC}"
    fi
else
    echo "${RED}✗ build/ directory not found${NC}"
    exit 1
fi
echo ""

# Step 5: Check for Leaflet CSS in build
echo "🗺️  Step 5: Checking Leaflet integration..."
if grep -r "leaflet" build/static/css/*.css 2>/dev/null; then
    echo "${GREEN}✓ Leaflet CSS found in build${NC}"
else
    echo "${YELLOW}⚠ Leaflet CSS might be missing${NC}"
fi
echo ""

# Step 6: Check bundle size
echo "📊 Step 6: Bundle size analysis..."
build_size=$(du -sh build | cut -f1)
echo "Total build size: $build_size"
echo ""

# Step 7: Serve locally (optional)
echo "🌐 Step 7: Starting local production server..."
echo "   Visit: ${GREEN}http://localhost:3000/maps${NC}"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npx serve -s build -p 3000
