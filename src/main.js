document.addEventListener('DOMContentLoaded', () => {
  // 獲取所有導航連結
  const navLinks = document.querySelectorAll('.sidebar-menu a');

  // 為每個連結添加點擊事件
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      // 阻止默認跳轉行為
      e.preventDefault();

      // 移除所有連結的 active 類
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });

      // 為被點擊的連結添加 active 類
      this.classList.add('active');
    });
  });
});
