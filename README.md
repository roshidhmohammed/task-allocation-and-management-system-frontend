# Task allocation and management system - Frontend

This frontend application provides a user-friendly interface to interact with a high-throughput log ingestion system.

It enables:

- Full-text search across logs
- Advanced filtering based on multiple fields
- Real-time log updates via WebSockets
- Responsive UI for mobile and desktop

# Instruction to set up the project locally

1. First, run the development server:

```bash
git clone https://github.com/roshidhmohammed/Log-Ingestor-and-Query-Interface-frontend.git
cd log-system-frontend
```

2.  Install all the dependencies used in this app using the below command:

```bash
npm install
```

3.  Start the project using the below command:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the app.

# Added features list

1.  Log Search & Filtering:
    Full-text search across logs
    Filter logs based on:
     - level
     - message
     - resourceId
     - timestamp
     - traceId
     - spanId
     - commit
     - metadata.parentResourceId

2. Real-Time Log Streaming:
     - Live log updates using WebSocket (Socket.IO)
     - Automatically prepends new logs to the list
     - Smooth real-time experience
     - API Polling on log statistics tab

3. Infinite Scrolling:
     - Efficient pagination with infinite scroll
     - Loads logs dynamically as the user scrolls
     - Optimized for large datasets

4. Advanced Search Capabilities
     - Combined filters support
     - Regex-based search (backend-powered)
     - Date range filtering

5. Log Visualization:
    - Clean tabular UI for logs
    - Color-coded log levels:
    - ERROR
    - WARN
    - INFO
    - DEBUG
    - FATAL
    - Highlighted search matches

6. Responsive Design:
    - Mobile-first UI
    - Optimized for:
    - Desktop
    - Tablet
    - Mobile devices

7. Performance Optimizations:
    - Debounced search queries
    - Efficient API calls with query params
    - Virtualized / optimized rendering for large logs
    - Minimal re-renders

# Technologies Used

- **React.js** - Ui Library
- **TailwindCSS** - CSS styling framework
- **React-router-dom** -React Navigation library
- **axios** - Making API call
- **socket.io** - For real time communication between frontend app and backend server
