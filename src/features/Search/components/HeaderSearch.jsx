function HeaderSearch({ children }) {
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-medium mb-4 lg:mb-6 text-primary dark:text-dark-primary">
        Search
      </h1>
      {children}
    </div>
  );
}

export default HeaderSearch;
