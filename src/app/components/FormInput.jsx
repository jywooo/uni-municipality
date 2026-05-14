export function FormInput({ label, error, className = '', ...props }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-zinc-200">
        {label}
        {props.required ? <span className="ml-1 text-cyan-300">*</span> : null}
      </label>
      <input
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${error ? 'border-rose-500/60' : ''} ${className}`}
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}

export function FormTextarea({ label, error, rows = 4, className = '', ...props }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-zinc-200">
        {label}
        {props.required ? <span className="ml-1 text-cyan-300">*</span> : null}
      </label>
      <textarea
        rows={rows}
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${error ? 'border-rose-500/60' : ''} ${className}`}
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}

export function FormSelect({ label, error, options, className = '', ...props }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-zinc-200">
        {label}
        {props.required ? <span className="ml-1 text-cyan-300">*</span> : null}
      </label>
      <select
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${error ? 'border-rose-500/60' : ''} ${className}`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
