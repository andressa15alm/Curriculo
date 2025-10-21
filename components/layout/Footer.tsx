export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-5xl px-5 py-10 text-center text-sm text-muted">
        © {new Date().getFullYear()}  AAP Development
      </div>
    </footer>
  );
}