const PageContainer = ({ children }) => {
  return (
    <div className="relative container mx-auto flex flex-col items-center min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 md:py-8 lg:py-10 xl:py-12 bg-[#02191D] bg-[radial-gradient(52.52%_32.71%_at_50%_97.66%,rgba(36,160,181,0.2)_0%,rgba(36,160,181,0)_100%)]">
      {children}
    </div>
  );
};

export default PageContainer;
