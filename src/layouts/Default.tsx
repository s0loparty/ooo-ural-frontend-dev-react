import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-8">
      <Outlet />
    </section>
  );
}
