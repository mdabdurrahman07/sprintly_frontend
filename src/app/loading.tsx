import Logo from "@/components/shared/Logo";

const GlobalLoader = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-4">
      <div>
        <Logo />
      </div>

      <div
        aria-label="Loading"
        className="relative w-8 h-8 mb-6 flex items-center justify-center"
        role="status"
      >
        <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-blue-600 animate-spin"></div>
      </div>

      <div>
        <p
          className="font-body-md text-body-md text-muted-foreground font-medium tracking-normal transition-opacity duration-300"
          id="loading-status"
        >
          Loading your workspace...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;
