// Root layout - minimal wrapper that delegates to locale-specific layout
// The actual layout with <html> and <body> is in app/[locale]/layout.tsx

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
