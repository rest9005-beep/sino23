'use client';

import Header from '@/components/Header';
import { upload } from '@vercel/blob/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';

export default function UploadPage() {
  const r = useRouter();
  const { toast, Toast } = useToast();

  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [me, setMe] = useState<{ uid: string; username: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' }).catch(()=>null);
      const data = res && res.ok ? await res.json().catch(()=>null) : null;
      setMe(data?.user ?? null);
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!me) { toast('Нужно войти'); r.push('/auth'); return; }
    if (!videoRef.current?.files?.[0]) { toast('Выбери видео'); return; }
    if (!thumbRef.current?.files?.[0]) { toast('Выбери превью'); return; }

    const videoFile = videoRef.current.files[0];
    const thumbFile = thumbRef.current.files[0];

    setBusy(true);
    try {
      const vBlob = await upload(`videos/${Date.now()}-${videoFile.name}`, videoFile, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      });

      const tBlob = await upload(`thumbs/${Date.now()}-${thumbFile.name}`, thumbFile, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      });

      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          videoUrl: vBlob.url,
          thumbUrl: tBlob.url
        }),
      });

      const data = await res.json().catch(()=>null);
      if (!res.ok) throw new Error(data?.error || 'Ошибка');

      r.push('/');
      r.refresh();
    } catch (err: any) {
      toast(err?.message || 'Ошибка');
      setBusy(false);
      return;
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1 className="pageTitle">Загрузка</h1>

        <div className="panel" style={{ maxWidth: 720 }}>
          <form onSubmit={submit}>
            <div className="field">
              <div className="label">Название</div>
              <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} minLength={2} maxLength={80} required />
            </div>

            <div className="field">
              <div className="label">Описание (необязательно)</div>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} maxLength={600} />
            </div>

            <div className="field">
              <div className="label">Видео</div>
              <input ref={videoRef} className="input" type="file" accept="video/mp4,video/webm,video/quicktime" required />
            </div>

            <div className="field">
              <div className="label">Превью</div>
              <input ref={thumbRef} className="input" type="file" accept="image/jpeg,image/png,image/webp" required />
            </div>

            <button className="pill primary" disabled={busy} type="submit">
              {busy ? 'Загружаю…' : 'Опубликовать'}
            </button>
          </form> 
          </div>

        <Toast />
      </main>
    </>
  );
}
