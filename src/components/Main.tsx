type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="mt-10 h-[calc(100vh-7.2rem-7.2rem)] flex gap-10 justify-center">
      {children}
    </main>
  );
};

export default Main;
