// 프로젝트 데이터: 항목을 추가하거나 수정하면 카드가 자동으로 반영됩니다.
const projects = [
  {
    title: '계열사 통합 내부감사 체계',
    description: '20개 계열사를 대상으로 감사 프로세스와 점검 기준을 표준화하여 감사 품질과 일관성을 높였습니다.',
    tags: ['내부감사', '프로세스 표준화'],
    status: '운영 중',
    field: '내부감사',
    image: 'images/project-1.svg',
  },
  {
    title: 'AI 기반 감사 데이터 분석',
    description: '내부감사와 경영진단에 AI를 활용해 이상 거래 탐지와 데이터 분석을 자동화하고 인사이트를 도출합니다.',
    tags: ['AI', '데이터 분석', '경영진단'],
    status: '진행 중',
    field: '데이터 분석',
    image: 'images/project-2.svg',
  },
  {
    title: '그룹 AI 확산 로드맵',
    description: 'KG그룹 전체에 AI 기술을 확대 전개하기 위한 교육, 사례 공유, 도입 계획을 수립하고 있습니다.',
    tags: ['AI 전략', '변화관리'],
    status: '계획',
    field: 'AI 전략',
    image: 'images/project-3.svg',
  },
];

const statusStyles = {
  '운영 중': 'text-up',
  '진행 중': 'text-accent-400',
  '계획': 'text-warm',
};

// 카드 아이콘 색과 이미지가 없을 때의 배너 배경 (프로젝트 순서대로 순환)
const banners = [
  { bg: 'radial-gradient(circle at 20% 120%, #4ade80 0%, transparent 45%), radial-gradient(circle at 85% -10%, #38bdf8 0%, transparent 50%), linear-gradient(135deg, #1f3b37, #24324a)', icon: 'linear-gradient(135deg, #34d399, #0ea5e9)' },
  { bg: 'radial-gradient(circle at 80% 120%, #e8556d 0%, transparent 45%), radial-gradient(circle at 10% -10%, #a78bfa 0%, transparent 50%), linear-gradient(135deg, #3a2440, #2a2140)', icon: 'linear-gradient(135deg, #f07a8c, #a855f7)' },
  { bg: 'radial-gradient(circle at 30% 130%, #f97316 0%, transparent 45%), radial-gradient(circle at 90% 0%, #facc15 0%, transparent 45%), linear-gradient(135deg, #3d2a1c, #3a3020)', icon: 'linear-gradient(135deg, #fb923c, #eab308)' },
];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderProjects() {
  const list = document.getElementById('project-list');
  document.getElementById('project-count').textContent = `전체 ${projects.length}개`;

  list.innerHTML = projects.map((p, i) => {
    const banner = banners[i % banners.length];
    return `
    <article class="reveal card project-card">
      <div class="project-banner" style="background: ${banner.bg}">
        ${p.image ? `<img src="${escapeHtml(p.image)}" alt="" loading="lazy" />` : ''}
      </div>
      <div class="flex items-end justify-between pr-1">
        <div class="project-icon" style="background: ${banner.icon}">${escapeHtml(p.title.charAt(0))}</div>
        <span class="text-xs font-bold text-muted">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <div class="mt-3 flex-1 px-2">
        <h3 class="font-bold">${escapeHtml(p.title)}</h3>
        <p class="mt-2 text-xs leading-relaxed text-muted">${escapeHtml(p.description)}</p>
      </div>
      <div class="project-meta">
        <div><p class="text-[14px] text-muted">상태</p><p class="mt-0.5 text-xs font-bold ${statusStyles[p.status] || statusStyles['계획']}">${escapeHtml(p.status)}</p></div>
        <div><p class="text-[14px] text-muted">분야</p><p class="mt-0.5 truncate text-xs font-bold">${escapeHtml(p.field)}</p></div>
        <div><p class="text-[14px] text-muted">키워드</p><p class="mt-0.5 text-xs font-bold">${p.tags.length}개</p></div>
      </div>
      <div class="project-tags">
        ${p.tags.map((t) => `<span class="text-xs text-zinc-300">#${escapeHtml(t)}</span>`).join('')}
      </div>
    </article>
  `;
  }).join('');
}

// 근속 연차 (2018년 합류 = 1년차)
function renderYears() {
  document.getElementById('years-at-kg').textContent = new Date().getFullYear() - 2018 + 1;
}

// 현재 섹션 하이라이트
function initNav() {
  const links = document.querySelectorAll('.nav-link');
  const setActive = (id) => {
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  };
  setActive('home');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

  // 연락처는 넓은 화면에서 오른쪽 패널에 고정되어 스크롤로 감지되지 않으므로 클릭 시 직접 표시
  links.forEach((link) => link.addEventListener('click', () => setActive(link.getAttribute('href').slice(1))));
}

// 섹션 진입 애니메이션
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

// 토스트
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-4');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('opacity-0', 'translate-y-4'), 2000);
}

// 이메일 복사
function initCopyEmail() {
  document.querySelectorAll('.copy-email').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast('이메일 주소가 복사되었습니다');
      } catch (e) {
        showToast(email);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
  renderYears();
  initNav();
  initReveal();
  initCopyEmail();
});
