import logo from "@/assets/logo.png";

export const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-studio py-4">
        <button 
          onClick={scrollToTop}
          className="transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
        >
          <img 
            src={logo} 
            alt="The Studio Logo" 
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </button>
      </div>
    </header>
  );
};
