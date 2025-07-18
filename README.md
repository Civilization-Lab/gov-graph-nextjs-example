# Gov Graph Next.js Example

A Next.js example application demonstrating how to integrate and use the `@Civilization-Lab/gov-graph` React component for visualizing government data relationships.

## Overview

This example showcases how to:

- Set up a Next.js application with the Gov Graph component
- Fetch government data using the CivLab API
- Display interactive government relationship graphs
- Handle user interactions with graph nodes
- Style the application with Tailwind CSS

## Features

- **Interactive Government Graph**: Visualize relationships between government entities
- **Real-time Data**: Fetches live data from the CivLab API
- **Responsive Design**: Works on desktop and mobile devices
- **Node Selection**: Click on graph nodes and view details in the sidebar

## Prerequisites

- Node.js 18+
- Yarn package manager
- CivLab API key (see [Getting an API Key](#getting-an-api-key))

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gov-graph-nextjs-example
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
CIVLAB_API_KEY=your_api_key_here
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 4. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Getting Access to Required Services

### CivLab API Key

To use this example, you'll need a CivLab API key. Contact the CivLab team to obtain access to the government data API.

### GitHub Personal Access Token

The `@Civilization-Lab/gov-graph` package is published to GitHub Packages as a private package. You'll need a GitHub Personal Access Token with access to this package.

#### Steps to get access:

1. **Request Package Access**: Contact the CivLab team to grant your GitHub account access to the `@Civilization-Lab/gov-graph` package.

2. **Create a Personal Access Token**:

   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "CivLab Gov Graph Package Access")
   - Select the following scopes:
     - `read:packages` - Download packages from GitHub Package Registry
   - Click "Generate token"
   - **Copy the token immediately** (you won't be able to see it again)

3. **Add the token to your environment**:
   - Add `GITHUB_TOKEN=your_token_here` to your `.env` file
   - The token will be used automatically by Yarn to authenticate with GitHub Packages

#### Troubleshooting Package Access

If you encounter authentication errors when installing dependencies:

1. Verify your GitHub account has been granted access to the `@Civilization-Lab/gov-graph` package
2. Ensure your `GITHUB_TOKEN` is correctly set in `.env`

## Key Components

### Main Page (`src/pages/index.tsx`)

The main page demonstrates:

- Setting up the GovGraph context provider
- Fetching graph data using `getStaticProps`
- Rendering the interactive graph component
- Displaying selected node information in a sidebar

### GovGraph Integration

```tsx
import * as GovGraph from "@Civilization-Lab/gov-graph";

// Wrap your app with the context provider
<GovGraph.Context.Provider
  data={graphData}
  value={selection}
  onChange={setSelection}
>
  <GovGraph.GovGraph />
</GovGraph.Context.Provider>;
```

### Data Fetching

The example uses Next.js `getStaticProps` to fetch government data:

```tsx
export const getStaticProps: Next.GetStaticProps<PageProps> = async () => {
  const client = await GovGraph.Api.Client.new({
    apiKey: process.env.CIVLAB_API_KEY!,
  });

  const response = await client.GraphData.get();
  if (!response.ok) throw new Error(response.error);

  return {
    props: {
      graphData: response.data,
    },
  };
};
```

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn start` - Start the production server

## Troubleshooting

### Common Issues

1. **API Key Error**: Ensure your `CIVLAB_API_KEY` is set in `.env`
2. **Package Installation Errors**:
   - Verify your `GITHUB_TOKEN` is set in `.env`
   - Ensure you have access to the `@Civilization-Lab/gov-graph` package
   - Try clearing cache: `yarn cache clean`
3. **Build Errors**: Make sure all dependencies are installed with `yarn install`
4. **Graph Not Loading**: Check your network connection and API key validity

### Getting Help

If you encounter issues:

1. Check the console for error messages
2. Verify your API key is valid
3. Ensure all dependencies are up to date
4. Contact the CivLab team for API-related issues

## Contributing

This is an example repository. For contributions to the main GovGraph component, please refer to the main CivLab repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
