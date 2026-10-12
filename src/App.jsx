import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, X, CaretLeft, CaretRight, List, ArrowUp } from '@phosphor-icons/react';

const A = import.meta.env.BASE_URL + 'assets/';
const products = [
  { id: 'navy', name: 'NAVY', jp: 'ネイビー', number: '01', color: '#223047', image: 'product-navy-v2.png', line: '静かに、強く。', description: '深いネイビーに、円形の刺繍。\n控えめな色のなかに、確かな存在感を。', mark: 'CIRCULAR EMBLEM' },
  { id: 'red', name: 'RED', jp: 'レッド', number: '02', color: '#ae242b', image: 'product-red-v1.png', line: '視線を、奪う。', description: '鮮やかなレッドに、流れるような刺繍。\n装いの中心になる、ひとつのアクセント。', mark: 'MONOGRAM' },
  { id: 'grey', name: 'GREY', jp: 'グレー', number: '03', color: '#92918f', image: 'product-grey-v1.png', line: '余白に、個性を。', description: '柔らかなグレーに、アイボリーの刺繍。\n自分らしいバランスで、日常に馴染ませる。', mark: 'MONOGRAM' },
];

function Wordmark({ light = false }) {
  return <span className={'wordmark source-mark' + (light ? ' source-mark--light' : '')}><img src={A + 'wordmark-source.jpg'} alt="mori、末尾に二重線のドルマークを持つブランドロゴ" /></span>;
}

function Crest({ light = false }) {
  return <span className={'crest source-mark' + (light ? ' source-mark--light' : '')}><img src={A + 'crest-source.jpg'} alt="円形の鳥と文字のブランドシンボル" loading="lazy" /></span>;
}

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef(null);
  const detailTriggerRef = useRef(null);
  const product = products[selected];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (detailOpen && !dialog.open) dialog.showModal();
    if (!detailOpen && dialog.open) dialog.close();
    if (detailOpen) {
      const y = window.scrollY;
      const prior = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prior; window.scrollTo(0, y); };
    }
  }, [detailOpen]);

  const go = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const change = next => setSelected((next + products.length) % products.length);
  const closeDetail = () => { setDetailOpen(false); detailTriggerRef.current?.focus(); };

  return (
    <>
      <a className="skip-link" href="#collection">コレクションへ移動</a>
      <header className={'site-header' + (scrolled ? ' site-header--scrolled' : '')}>
        <a className="brand-link" href="#top" aria-label="トップへ"><Wordmark light /></a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#collection">COLLECTION</a>
          <a href="#philosophy">PHILOSOPHY</a>
        </nav>
        <a className="header-action" href="#collection">EXPLORE <ArrowUpRight size={17} weight="light" /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>
      </header>
      {menuOpen && <nav id="mobile-menu" className="mobile-menu" style={{ top: scrolled ? 72 : 90 }} aria-label="モバイルナビゲーション">
        <a href="#collection" onClick={() => setMenuOpen(false)}>COLLECTION <ArrowUpRight size={22} /></a>
        <a href="#philosophy" onClick={() => setMenuOpen(false)}>PHILOSOPHY <ArrowUpRight size={22} /></a>
      </nav>}

      <main>
        <section id="top" className={'hero' + (heroReady ? ' hero--ready' : '')} aria-labelledby="hero-title">
          <img className="hero-photo" src={A + 'rapper-studio-navy-v2.png'} alt="ネイビーの帽子を被ったラッパーが、スタジオ照明の下で両腕を広げている" fetchPriority="high" onLoad={() => requestAnimationFrame(() => requestAnimationFrame(() => setHeroReady(true)))} onError={() => setHeroReady(true)} />
          <div className="hero-topline"><span>HEADWEAR / COLLECTION</span><span>AN EXPRESSION OF SELF</span></div>
          <div className="hero-copy">

            <h1 id="hero-title"><span>流行を、追わない。</span><span>自分を、纏う。</span></h1>
            <p className="hero-subline">その存在感は、誰のものでもない。</p>
            <button className="text-link hero-link" onClick={() => go('collection')}>コレクションを見る <ArrowUpRight size={21} weight="light" /></button>
          </div>
          <div className="hero-footer">
            <span>INDIVIDUALITY, IN EVERY DETAIL.</span>
            <button className="scroll-cue" onClick={() => go('collection')} aria-label="スクロールして帽子を見る"><span>SCROLL TO DISCOVER</span><ArrowDown className="scroll-arrow" size={23} weight="light" /></button>
            <span className="hero-edition">THREE COLORS. ONE ATTITUDE.</span>
          </div>
        </section>

        <section className="intro" aria-labelledby="intro-title">
          <div className="section-meta" data-reveal><span>01 / COLLECTION</span><span>THE ESSENTIALS</span></div>
          <div className="intro-grid" data-reveal>
            <h2 id="intro-title">選ぶのは、色。<br />映すのは、自分。</h2>
            <p>ネイビー、レッド、グレー。<br />静けさも、大胆さも、自然体も。<br />自分の感覚で、ひとつを選ぶ。</p>
          </div>
        </section>

        <section id="collection" className={'collection collection--' + product.id} aria-labelledby="collection-title">
          <div className="collection-inner" data-reveal>
            <div className="collection-gallery">
              <div className="gallery-top"><span>THE COLLECTION</span><span>{product.number} / 03</span></div>
              <div className="product-stage" aria-label={product.jp + 'の帽子'}>
                {products.map((p, i) => <img key={p.id} className={'product-image product-image--' + p.id + (selected === i ? ' is-active' : '')} src={A + p.image} alt={p.jp + 'の帽子。' + (p.id === 'navy' ? '正面に円形の刺繍' : '正面にモノグラムの刺繍') + '、つばにホログラムステッカー'} aria-hidden={selected !== i} loading="lazy" />)}
              </div>
              <div className="gallery-bottom">
                <span>CHOOSE YOUR EXPRESSION</span>
                <div className="gallery-arrows"><button aria-label="前の帽子" onClick={() => change(selected - 1)}><CaretLeft size={22} weight="light" /></button><button aria-label="次の帽子" onClick={() => change(selected + 1)}><CaretRight size={22} weight="light" /></button></div>
              </div>
            </div>
            <div className="product-story">
              <p className="eyebrow">SIGNATURE HEADWEAR</p>
              <h2 id="collection-title" className="product-name">{product.name}<span>CAP</span></h2>
              <div className="story-change" key={product.id}>
                <h3>{product.line}</h3>
                <p className="description">{product.description}</p>
              </div>
              <div className="color-picker" role="group" aria-label="帽子を選ぶ">
                {products.map((p, i) => <button key={p.id} className={'color-option' + (i === selected ? ' is-selected' : '')} onClick={() => setSelected(i)} aria-label={p.jp + 'を選ぶ'} aria-pressed={i === selected}><span className="color-chip" style={{ backgroundColor: p.color }} /><span>{p.name}</span></button>)}
              </div>
              <p className="product-signature">FRONT / {product.mark}<br />BRIM / HOLOGRAPHIC EMBLEM</p>
              <button ref={detailTriggerRef} className="detail-button" onClick={() => setDetailOpen(true)}>この帽子を詳しく見る <ArrowUpRight size={22} weight="light" /></button>
            </div>
          </div>
          <div className="lineup" role="group" aria-label="コレクション一覧" data-reveal>
            {products.map((p, i) => <button key={p.id} className={'lineup-item lineup-item--' + p.id + (selected === i ? ' is-selected' : '')} onClick={() => { setSelected(i); go('collection'); }} aria-label={p.jp + 'の紹介を見る'} aria-pressed={selected === i}>
              <span className="lineup-number">{p.number}</span>
              <div className="lineup-photo"><img src={A + p.image} alt="" loading="lazy" /></div>
              <span className="lineup-label">{p.name}<ArrowUpRight size={19} weight="light" /></span>
            </button>)}
          </div>
        </section>

        <section id="philosophy" className="philosophy" aria-labelledby="philosophy-title">
          <div className="section-meta" data-reveal><span>02 / PHILOSOPHY</span><span>BE YOUR OWN ICON</span></div>
          <div className="philosophy-grid" data-reveal>
            <div className="philosophy-copy"><p className="eyebrow">THE MARK OF YOU.</p><h2 id="philosophy-title">誰かの正解より、<br />自分の美意識を。</h2><p>装うことは、自分を語ること。<br />ひとつの帽子が、その佇まいを変える。<br />自由な感性に、揺るがない存在感を。</p><a className="text-link" href="#collection">あなたの色を見つける <ArrowRight size={22} weight="light" /></a></div>
            <div className="philosophy-symbol"><Crest light /></div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><a href="#top" aria-label="トップへ"><Wordmark light /></a><p>WEAR YOUR OWN STANDARD.</p><a className="back-top" href="#top" aria-label="ページの先頭へ"><ArrowUp size={20} weight="light" /></a></footer>

      <dialog ref={dialogRef} className={'product-dialog product-dialog--' + product.id} onCancel={e => { e.preventDefault(); closeDetail(); }} onClick={e => { if (e.target === dialogRef.current) closeDetail(); }} onClose={() => setDetailOpen(false)} aria-labelledby="detail-title">
        <button className="dialog-close" autoFocus aria-label="商品詳細を閉じる" onClick={closeDetail}><X size={24} weight="light" /></button>
        <div className="dialog-layout">
          <div className={'dialog-photo dialog-photo--' + product.id}><img src={A + product.image} alt={product.jp + 'の帽子の拡大画像'} /></div>
          <div className="dialog-copy"><p className="eyebrow">THE COLLECTION / {product.number}</p><h2 id="detail-title">{product.name}<span>CAP</span></h2><h3>{product.line}</h3><p className="description">{product.description}</p><div className="color-picker" role="group" aria-label="詳細で帽子を選ぶ">{products.map((p,i) => <button className={'color-option' + (i === selected ? ' is-selected' : '')} key={p.id} onClick={() => setSelected(i)} aria-pressed={i === selected} aria-label={p.jp + 'を選ぶ'}><span className="color-chip" style={{backgroundColor:p.color}} /><span>{p.name}</span></button>)}</div><div className="detail-row"><span>COLOR</span><span>{product.jp}</span></div><div className="detail-row"><span>FRONT</span><span>{product.id === 'navy' ? '円形エンブレムの刺繍' : 'モノグラムの刺繍'}</span></div><div className="detail-row"><span>BRIM</span><span>ホログラムステッカー</span></div><p className="visual-note">掲載画像は商品写真をもとにしたイメージです。</p><button className="text-link" onClick={closeDetail}>コレクションに戻る <ArrowRight size={20} weight="light" /></button></div>
        </div>
      </dialog>
    </>
  );
}
