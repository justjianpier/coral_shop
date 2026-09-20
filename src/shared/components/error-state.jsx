export function ErrorState({ message }) {
  return (
    <div className="flex min-h-64 items-center justify-center" role="alert">
      <p className="font-medium text-red-600">{message}</p>
    </div>
  );
}
