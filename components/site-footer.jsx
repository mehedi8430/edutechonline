import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteFooter({ className }) {

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <Logo />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="#"
            rel="noreferrer"
            className="font-medium"
          >
            mhrDev
          </a>
          . Hosted on{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </a>
        </p>
      </div>
    </footer>
  );
}
