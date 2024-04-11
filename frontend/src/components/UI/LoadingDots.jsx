
const LoadingDots = () => {
  return (
    <div className="flex w-fit gap-3 mx-auto mt-8">
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
      <div className="h-6 w-6 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div className="h-6 w-6 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
      <div className="h-6 w-6 bg-accent/50 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
