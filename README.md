# LabelLens Lite — Food Allergen & Diet Checker (React + Tailwind)

A super-simple app that helps you quickly check food products for allergens and diet tags (vegan/vegetarian), plus Nutri-Score and NOVA group. It uses the **Open Food Facts** public API (no API key required).

> This project demonstrates the power of generative AI in the development process: I used an AI assistant to plan scope, scaffold the UI, write helper code, draft documentation, and suggest a tiny unit test.

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Usage Guide](#-usage-guide)
- [API Integration](#-api-integration)
- [Local Storage](#-local-storage)
- [Development](#️-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality

- **🔍 Product Search**: Real-time search using Open Food Facts database
- **⚡ Smart Debouncing**: 400ms delay to reduce API calls
- **🏷️ Diet Filtering**: Filter by vegan and nut-free options
- **💾 Safe List**: Save trusted products for quick access
- **📱 Responsive Design**: Works on desktop, tablet, and mobile

### Product Information Display

- **🏆 Nutri-Score**: Nutritional quality rating (A-E)
- **🔢 NOVA Group**: Food processing classification (1-4)
- **🌱 Diet Tags**: Vegan, vegetarian, palm-oil-free indicators
- **⚠️ Allergen Warnings**: Clear allergen information
- **🖼️ Product Images**: Visual product identification

### User Experience

- **⚡ Instant Feedback**: Loading states and empty state handling
- **💡 Smart Defaults**: Sensible fallbacks for missing data
- **🎨 Clean UI**: Modern design with Tailwind CSS
- **📊 Organized Layout**: Grid-based product display

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI library with hooks
- **Vite 5.4.0** - Fast build tool and dev server
- **Tailwind CSS 3.4.10** - Utility-first CSS framework

### Development Tools

- **Vitest 2.0.5** - Unit testing framework
- **Testing Library** - React component testing utilities
- **PostCSS & Autoprefixer** - CSS processing

### APIs & Data

- **Open Food Facts API** - Free food database
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
labellens-lite/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ProductCard.jsx # Product display component
│   ├── lib/
│   │   ├── offApi.js      # Open Food Facts API integration
│   │   └── storage.js     # localStorage utilities
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── vite.config.js         # Vite configuration
```

## 🔧 Setup & Installation

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd labellens-lite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Vite (if needed)**

   ```bash
   npm install --save-dev @vitejs/plugin-react
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**

   ```bash
   npm run preview
   ```

### Environment Setup

No environment variables are required. The app uses the public Open Food Facts API directly.

## 📖 Usage Guide

### Basic Search

1. **Enter a product name** in the search box (e.g., "corn flakes", "chocolate bar")
2. **Wait for results** - search happens automatically after 400ms
3. **View product details** including nutrition scores and allergens

### Filtering Options

- **Vegan Only**: Check to show only vegan-certified products
- **Nut-Free**: Check to exclude products containing nuts
- **Combine filters** for more specific results

### Safe List Management

1. **Save products** by clicking "Save to Safe List" on any product card
2. **View saved items** in the "My Safe List" section at the bottom
3. **Remove products** by clicking "Remove from Safe List"

### Understanding Product Information

#### Nutri-Score (A-E)

- **A (Dark Green)**: Best nutritional quality
- **B (Light Green)**: Good nutritional quality
- **C (Yellow)**: Average nutritional quality
- **D (Orange)**: Poor nutritional quality
- **E (Red)**: Worst nutritional quality

#### NOVA Groups (1-4)

- **1**: Unprocessed or minimally processed foods
- **2**: Processed culinary ingredients
- **3**: Processed foods
- **4**: Ultra-processed foods

#### Diet Tags

- **🌱 Vegan**: Contains no animal products
- **🥬 Vegetarian**: Contains no meat or fish
- **🌴 Palm-oil-free**: No palm oil ingredients

## 🔌 API Integration

### Open Food Facts API

The app uses the Open Food Facts public API for product data:

**Base URL**: `https://world.openfoodfacts.org/cgi/search.pl`

**Search Parameters**:

- `search_terms`: Product search query
- `search_simple=1`: Simple search mode
- `action=process`: Process the search
- `json=1`: Return JSON format
- `page_size`: Number of results (default: 20)

### Data Mapping

Products are mapped from the API response to a standardized format:

```javascript
{
  id: string,           // Product barcode or generated ID
  name: string,         // Product name
  brand: string,        // Brand name
  image: string,        // Product image URL
  nutriscore: string,   // Nutri-Score grade (A-E)
  nova: string,         // NOVA group (1-4)
  allergens: string[],  // Allergen tags
  dietTags: string[],   // Diet-related tags
  raw: object          // Original API response
}
```

### Error Handling

- **Network failures**: Gracefully handled with empty results
- **Missing data**: Safe fallbacks for all fields
- **Invalid responses**: Filtered out automatically

## 💾 Local Storage

### Safe List Persistence

The app uses localStorage to persist the user's safe list:

- **Key**: `labellens:safe`
- **Format**: JSON array of product objects
- **Operations**: Add, remove, and retrieve saved products

### Storage Functions

```javascript
getSafeList()           // Retrieve saved products
saveSafeList(list)      // Save products array
toggleSafe(product)     // Add/remove product
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run unit tests
```

### Development Server

- **URL**: `http://localhost:5173`
- **Hot Reload**: Automatically refreshes on file changes
- **Fast Refresh**: Preserves component state during updates

### Code Style & Standards

- **ES6+ Modules**: Modern JavaScript syntax
- **React Hooks**: Functional components with state
- **Tailwind Classes**: Utility-first styling
- **Error Boundaries**: Graceful error handling

### Key Development Patterns

#### State Management

```javascript
const [query, setQuery] = useState("");          // Search input
const [results, setResults] = useState([]);      // API results
const [loading, setLoading] = useState(false);   // Loading state
const [filters, setFilters] = useState({...});   // Filter options
```

#### Debounced Search

```javascript
useEffect(() => {
  const id = setTimeout(async () => {
    // Perform search after 400ms delay
  }, 400);
  return () => clearTimeout(id);
}, [query]);
```

#### Filtered Results

```javascript
const filteredResults = useMemo(() => {
  return results.filter(product => {
    // Apply vegan and nut-free filters
  });
}, [results, filters]);
```

## 🧪 Testing

### Test Setup

- **Framework**: Vitest
- **React Testing**: @testing-library/react
- **DOM Testing**: @testing-library/jest-dom

### Running Tests

```bash
npm test           # Run tests once
npm test -- --watch  # Run tests in watch mode
```

### Test Coverage Areas

- Component rendering
- User interactions
- API integration
- Local storage operations
- Filter functionality

### Example Test Structure

```javascript
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders search input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search a product/i)).toBeInTheDocument();
});
```

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility
- Test across different browsers

### Reporting Issues

- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide browser and OS information
- Include screenshots if applicable

## 🔮 Future Enhancements

### Potential Features

- **🔍 Advanced Search**: Filter by brand, category, country
- **📊 Nutrition Details**: Detailed nutritional information
- **🏪 Store Locator**: Find products in nearby stores
- **📱 Barcode Scanner**: Camera-based product lookup
- **👤 User Accounts**: Cloud sync of safe lists
- **📈 Analytics**: Personal nutrition tracking

### Technical Improvements

- **🚀 Performance**: Virtual scrolling for large result sets
- **🌐 PWA**: Progressive Web App capabilities
- **🔄 Offline**: Cached search results
- **🎨 Themes**: Dark mode support
- **🌍 i18n**: Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Open Food Facts** - For providing the free, open food database
- **React Community** - For the amazing ecosystem and tools
- **Tailwind CSS** - For the beautiful, utility-first CSS framework
- **Vite** - For the lightning-fast development experience

## 📞 Support

For questions, issues, or feature requests:

- 📧 Create an issue on GitHub
- 💬 Start a discussion in the repository
- 📖 Check the documentation

---

**Disclaimer**: Nutri-Score & NOVA groups are educational aids, not medical advice. Always consult healthcare professionals for dietary concerns and allergies.
