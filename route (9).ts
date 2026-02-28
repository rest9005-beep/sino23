import Header from '@/components/Header';
import WatchClient from '@/components/WatchClient';
import { getVideo } from '@/lib/videos';
import { notFound } from 'next/navigation';

export default async function WatchPage({ params }: { params: { id: string } }) {
  const v = await getVideo(params.id);
  if (!v) return notFound();

  return (
    <>
      <Header />
      <main className="container">
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,.03)' }}>
            <video src={v.videoUrl} controls playsInline style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        <h1 className="pageTitle" style={{ marginTop: 14 }}>{v.title}</h1>
        <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
          @{v.owner.username} · {v.views} просмотров
        </div>

        {v.description ? (
          <div className="panel" style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
            {v.description}
          </div>
        ) : null}

        <WatchClient id={v.id} />
      </main>
    </>
  );
}
