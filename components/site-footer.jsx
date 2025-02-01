import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
  return (
    <footer className={cn("bg-[#FCF8F4] text-gray-700", className)}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Logo and Description */}
          <div>
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline">How to work?</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Popular Course</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Service</a>
              </li>
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h4 className="mb-4 font-semibold">Courses</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">Categories</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Offline Course</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Video Course</a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Career</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Privacy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold">Contact Info</h4>
            <ul className="space-y-2">
              <li className="hover:underline">+0913-705-3875</li>
              <li className="hover:underline">Elizabeth@jourrapide.com</li>
              <li className="hover:underline">
                4808 Skinner Hollow Road<br />
                Days Creek, OR 97429
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} All rights reserved. Designed by{" "} mhrdev
        </div>
      </div>
    </footer>
  );
}
