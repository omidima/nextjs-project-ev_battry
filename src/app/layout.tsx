import { Theme } from "@radix-ui/themes";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css"
import "../theme/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "rgba(1, 12, 48, 1)"
}

export const metadata: Metadata = {
  title: "Generational",
  description: "EV battery health assessment"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>{<Theme style={{
        height: "100%"
      }}>
        {children}
      </Theme>}
        <script dangerouslySetInnerHTML={{
          __html: `
     !function(){var e=window,i=document,t="customerly",n="queue",o="load",r="settings",u=e[t]=e[t]||[];if(u.t){return void u.i("[customerly] SDK already initialized. Snippet included twice.")}u.t=!0;u.loaded=!1;u.o=["event","attribute","update","show","hide","open","close"];u[n]=[];u.i=function(t){e.console&&!u.debug&&console.error&&console.error(t)};u.u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(e),u[n].push(t),u}};u[o]=function(t){u[r]=t||{};if(u.loaded){return void u.i("[customerly] SDK already loaded. Use customerly.update to change settings.")}u.loaded=!0;var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://messenger.customerly.io/launcher.js";var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};u.o.forEach(function(t){u[t]=u.u(t)})}();
    
     customerly.load({
           "app_id": "c7ace9b7"
     });
    `}} />
      </body>

    </html>
  );
}
