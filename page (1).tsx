import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="pageTitle">404</h1>
        <div className="muted">Нет такой страницы.</div>
      </main>
    </>
  );
}
