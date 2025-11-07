// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    // 切换图标
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 平滑滚动
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

for (const link of smoothScrollLinks) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 关闭移动菜单
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// 表单提交处理
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 简单的表单验证
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 模拟表单提交
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            alert('表单提交成功！我们会尽快与您联系。');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 1500);
    });
}

// 元素进入视口时的动画
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.style-card, .trainer-card, .feature, .ai-feature');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// 初始化动画样式
const initializeAnimations = () => {
    const animatedElements = document.querySelectorAll('.style-card, .trainer-card, .feature, .ai-feature');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
};

// 页面加载完成后执行
window.addEventListener('load', () => {
    initializeAnimations();
    animateOnScroll(); // 初始检查可见元素
    
    // 页面加载动画
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// 滚动时执行动画
window.addEventListener('scroll', animateOnScroll);

// 窗口大小改变时重新检查
window.addEventListener('resize', animateOnScroll);

// 图片加载失败时显示占位符
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x300?text=图片加载失败';
        this.alt = '图片加载失败';
    });
});

// 复制联系方式功能
const contactItems = document.querySelectorAll('.info-item span');
contactItems.forEach(item => {
    item.addEventListener('click', function() {
        const textToCopy = this.textContent.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = this.textContent;
            this.textContent = '已复制！';
            this.style.color = '#99f6e4';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
        });
    });
    
    // 鼠标悬停效果
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
        this.style.color = '#0a9396';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.color = '';
    });
});

// 回到顶部按钮
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.id = 'backToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #0a9396;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    return button;
};

const backToTopButton = createBackToTopButton();

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 页面标题变化效果
const originalTitle = document.title;

window.addEventListener('blur', () => {
    document.title = '别忘了回来继续探索武术的奥秘！';
});

window.addEventListener('focus', () => {
    document.title = originalTitle;
});

// 键盘快捷键
window.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + 1 跳转到首页
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        document.querySelector('a[href="#home"]').click();
    }
    // Ctrl/Cmd + 2 跳转到关于我们
    else if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        document.querySelector('a[href="#about"]').click();
    }
    // Ctrl/Cmd + 3 跳转到武术流派
    else if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        document.querySelector('a[href="#styles"]').click();
    }
    // Ctrl/Cmd + 4 跳转到教练团队
    else if ((e.ctrlKey || e.metaKey) && e.key === '4') {
        e.preventDefault();
        document.querySelector('a[href="#trainers"]').click();
    }
    // Ctrl/Cmd + 5 跳转到联系我们
    else if ((e.ctrlKey || e.metaKey) && e.key === '5') {
        e.preventDefault();
        document.querySelector('a[href="#contact"]').click();
    }
    // Esc 键关闭移动菜单
    else if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});