import xLogo from "@/assets/x logo.png";
import ytLogo from "@/assets/youtube logo.png";
import igLogo from "@/assets/ig logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container-studio">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">© Greenridge Studios. Precision through process.</p>

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

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Follow Us</span>
            <div className="flex items-center gap-3">
              <a href="https://x.com/gridgestudios" target="_blank" rel="noopener noreferrer" className="transition-studio opacity-90 hover:opacity-100">
                <img src={xLogo} alt="X (gridgestudios)" className="h-8 w-8 object-contain" />
                <span className="sr-only">X (gridgestudios)</span>
              </a>
              <a href="https://www.youtube.com/@gridgestudios" target="_blank" rel="noopener noreferrer" className="transition-studio opacity-90 hover:opacity-100">
                <img src={ytLogo} alt="YouTube (gridgestudios)" className="h-8 w-8 object-contain" />
                <span className="sr-only">YouTube (gridgestudios)</span>
              </a>
              <a href="https://www.instagram.com/gridgestudios/" target="_blank" rel="noopener noreferrer" className="transition-studio opacity-90 hover:opacity-100">
                <img src={igLogo} alt="Instagram (gridgestudios)" className="h-8 w-8 object-contain" />
                <span className="sr-only">Instagram (gridgestudios)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
