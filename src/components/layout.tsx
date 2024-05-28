import React, { ReactNode } from "react";
import { useTheme } from "./provider/theme-provider";
import Header from "./shared/header";
import { QueryClient, QueryClientProvider } from "react-query";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const queryClient = new QueryClient();
  return (
    <div className={` ${theme}`}>
      <Header />
      <main className="bg-veryLightGray text-text dark:text-white  dark:bg-veryDarkBlueBg">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </main>
    </div>
  );
};

export default Layout;
