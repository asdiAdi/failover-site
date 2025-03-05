import "./App.scss";
import Hourglass from "./Hourglass.tsx";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import LoadingButton from "./LoadingButton.tsx";
import { getSiteStatus } from "./api/common.ts";
import { useEffect, useState } from "react";

function App() {
  const queryClient = new QueryClient();

  setInterval(
    () => {
      window.location.reload();
    },
    2 * 60 * 1000,
  ); // reload site every 2 minutes

  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}

function Component() {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: getSiteStatus,
    refetchInterval: 1000 * 10,
    enabled: !hasLoaded,
  });

  const { dns, ipv4 } = data || {};

  useEffect(() => {
    if (dns && ipv4) {
      setHasLoaded(true);
    }
  }, [dns, ipv4]);

  return (
    <div className="container">
      <Hourglass />
      <h2>Please wait while website is launching...</h2>
      <h2>DNS Propagation might take a while...</h2>
      <h2>Please visit the IPV4 link to view the website immediately.</h2>

      <div className="buttons">
        <LoadingButton
          text="Visit via DNS"
          loading={!dns || !ipv4}
          link={dns}
        />
        <LoadingButton
          text="Visit via IPV4"
          loading={!ipv4}
          link={ipv4}
          target="_blank"
        />
      </div>
    </div>
  );
}

export default App;
