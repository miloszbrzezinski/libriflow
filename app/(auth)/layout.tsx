const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm flex flex-row">
        <div className="w-[50%] flex items-center justify-center">
          <p className="text-9xl font-thin select-none">libriflow</p>
        </div>
        <div className="w-[50%] bg-white justify-center items-center flex">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
