 Advanced To-Do App
This is an advanced To-Do application built with Vite, React, TypeScript, Redux Toolkit, and Tailwind CSS. The application allows users to manage their tasks efficiently with features like task prioritization, due dates, weather integration, and more.

email-demo@example.com
PASSWORD-password

Features
Task Management: Add, remove, and toggle tasks.
Task Prioritization: Mark tasks as important.
Due Dates: Set due dates for tasks.
Weather Integration: Get weather data for outdoor tasks.
Dark Mode: Toggle between light and dark themes.
Authentication: Simulated login functionality.
Responsive Design: Fully responsive and mobile-friendly.

//screenshotss
![image](https://github.com/user-attachments/assets/1ede8153-4ac2-4474-92f8-3c279f897d02)
![image](https://github.com/user-attachments/assets/705777b9-8f53-4e46-92eb-c14b70da710a)
![image](https://github.com/user-attachments/assets/dab711cf-125f-43c4-8f21-7d44c7db3631)

![image](https://github.com/user-attachments/assets/2f7dbf3c-8518-4b1c-b3d9-4490c729d660)
![image](https://github.com/user-attachments/assets/c1dd5396-d056-4ee0-9877-f156dbb3f058)




Setup and Running Instructions
Prerequisites
Node.js (v14 or higher)
npm or yarn
Installation
1 Clone the repository:
  git clone https://github.com/yrrohityadav/To-Do-App.git
  cd To-Do-App
2 Install dependencies:
  npm install
  # or
  yarn install
3  Create a .env file in the root directory and add your OpenWeather API key:
4:VITE_OPENWEATHER_API_KEY=your_openweather_api_key

5:npm run dev
# or
yarn dev


Open your browser and navigate to http://localhost:3000.

Building for Production
To build the application for production:
  npm run build
  # or
  yarn build

Linting
To lint the code:
  npm run lint
  # or
  yarn lint


Project Structure

  project/
  .bolt/
    config.json
    prompt
  .env
  .gitignore
  eslint.config.js
  index.html
  package.json
  postcss.config.js
  src/
    App.tsx
    components/
      Footer.tsx
      Layout.tsx
      Navbar.tsx
      Sidebar.tsx
      TaskInput.tsx
      TaskItem.tsx
      TaskList.tsx
    index.css
    main.tsx
    pages/
      Login.tsx
    services/
      weatherApi.ts
    store/
      index.ts
      slices/
        authSlice.ts
        taskSlice.ts
        themeSlice.ts
    types/
      index.ts
    vite-env.d.ts
  tailwind.config.js
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
