export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container-studio">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © The Studio. Precision through process.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-studio">
              Contact
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-studio">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-studio">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
