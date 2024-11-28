const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-[1440px] mx-auto w-full lg:px-[4%]">{children}</div>
  );
};

export default Container;
