import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-zinc-950/80 p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          The page you requested is not available in this presentation build.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
          Return home
        </Link>
      </div>
    </div>
  );
}
