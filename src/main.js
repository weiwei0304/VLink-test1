document.addEventListener('DOMContentLoaded', () => {
  // 保留原有的導航邏輯
  const navLinks = document.querySelectorAll('.sidebar-menu a');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach((link) => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 縮放相關變量
  let scale = 1;
  const SCALE_STEP = 0.1;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;

  // 拖曳相關變量
  let isDragging = false;
  let startX, startY;
  let initialScrollX, initialScrollY;

  // 監聽滾輪事件（縮放功能）
  document.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          scale = Math.min(scale + SCALE_STEP, MAX_SCALE);
        } else {
          scale = Math.max(scale - SCALE_STEP, MIN_SCALE);
        }
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'center top';
      }
    },
    { passive: false }
  );

  // 監聽滑鼠按下事件
  document.addEventListener('mousedown', (e) => {
    if (e.ctrlKey) {
      isDragging = true;

      // 記錄初始位置
      startX = e.clientX;
      startY = e.clientY;

      // 記錄初始捲軸位置
      initialScrollX = window.scrollX;
      initialScrollY = window.scrollY;

      // 改變游標樣式
      document.body.style.cursor = 'grabbing';
      // 防止文字被選中
      document.body.style.userSelect = 'none';
    }
  });

  // 監聽滑鼠移動事件
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    e.preventDefault();

    // 計算滑鼠移動的距離
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 更新捲軸位置
    window.scrollTo({
      left: initialScrollX - dx,
      top: initialScrollY - dy,
      behavior: 'auto', // 使用 'auto' 而不是 'smooth' 以獲得更好的響應
    });
  });

  // 監聽滑鼠放開和離開事件
  const stopDragging = () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
  };

  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('mouseleave', stopDragging);

  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.close-button');
  const sidebar = document.querySelector('.sidebar');

  menuButton.addEventListener('click', function () {
    sidebar.classList.add('active');
  });

  closeButton.addEventListener('click', function () {
    sidebar.classList.remove('active');
  });
});
