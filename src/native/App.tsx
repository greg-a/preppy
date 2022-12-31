import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigator } from "./src/navigation/Navigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  );
}
