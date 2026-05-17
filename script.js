/* ============================================================
   JAVASCRIPT PROFISSIONAL - LOJA OFFICE ORIGINAL
   ============================================================
   Funcionalidades:
   - Countdown regressivo
   - Simulação de vendas em tempo real
   - FAQ Accordion
   - Menu Mobile
   - Exit Intent Popup
   - Smooth Scroll
   - Toast Notificações
   - Animações ao scroll
   ============================================================ */

// Configurações Globais
const CONFIG = {
    WHATSAPP_NUMBER: '5547988862944',
    TOAST_DURATION: 4000,
    COUNTDOWN_UPDATE_INTERVAL: 1000,
    SALES_UPDATE_INTERVAL: 3000,
};

// ============================================================
// 1. COUNTDOWN REGRESSIVO
// ============================================================

function startCountdown() {
    const updateCountdown = () => {
        // Calcula tempo até meia-noite
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        // Atualiza elemento principal
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Atualiza footer
        const footerHours = document.getElementById('footer-hours');
        const footerMinutes = document.getElementById('footer-minutes');
        const footerSeconds = document.getElementById('footer-seconds');
        
        if (footerHours) footerHours.textContent = String(hours).padStart(2, '0');
        if (footerMinutes) footerMinutes.textContent = String(minutes).padStart(2, '0');
        if (footerSeconds) footerSeconds.textContent = String(seconds).padStart(2, '0');
    };
    
    updateCountdown();
    setInterval(updateCountdown, CONFIG.COUNTDOWN_UPDATE_INTERVAL);
}

// ============================================================
// 2. SIMULAÇÃO DE VENDAS EM TEMPO REAL
// ============================================================

function startRealtimeSales() {
    const salesEl = document.getElementById('sales-today');
    const licensesEl = document.getElementById('licenses-left');
    
    if (!salesEl) return;
    
    let sales = parseInt(salesEl.textContent) || 127;
    let licenses = parseInt(licensesEl.textContent) || 7;
    
    setInterval(() => {
        // Incrementa vendas aleatoriamente (60% de chance)
        if (Math.random() > 0.4) {
            sales++;
            salesEl.textContent = sales;
            
            // Efeito visual
            salesEl.style.transform = 'scale(1.15)';
            setTimeout(() => {
                salesEl.style.transform = 'scale(1)';
            }, 300);
            
            // Diminui licenças disponíveis (40% de chance)
            if (licenses > 1 && Math.random() > 0.6) {
                licenses--;
                licensesEl.textContent = licenses;
                licensesEl.style.transform = 'scale(1.15)';
                setTimeout(() => {
                    licensesEl.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }, CONFIG.SALES_UPDATE_INTERVAL + Math.random() * 4000);
}

// ============================================================
// 3. FAQ ACCORDION
// ============================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            // Fecha outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle item atual
            item.classList.toggle('active');
        });
    });
}

// ============================================================
// 4. MENU MOBILE
// ============================================================

function handleMobileNav() {
    const nav = document.querySelector('.mobile-nav');
    if (!nav) return;
    
    const navLinks = nav.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            // Adiciona ao clicado
            link.classList.add('active');
        });
    });
}

// ============================================================
// 5. SMOOTH SCROLL PARA ÂNCORAS
// ============================================================

function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;
            
            const offsetTop = target.getBoundingClientRect().top + window.scrollY;
            const headerOffset = 140; // Altura dos headers sticky
            
            window.scrollTo({
                top: offsetTop - headerOffset,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================================
// 6. EXIT INTENT POPUP
// ============================================================

function handleExitIntent() {
    const popup = document.getElementById('exitIntentPopup');
    if (!popup) return;
    
    let hasShown = false;
    const SHOW_CHANCE = 0.5; // 50% de chance
    
    document.addEventListener('mouseleave', () => {
        if (!hasShown && Math.random() > (1 - SHOW_CHANCE)) {
            popup.classList.add('active');
            hasShown = true;
        }
    });
    
    // Fechar popup
    const closeBtn = document.getElementById('exitPopupClose');
    const dismissBtn = document.getElementById('exitPopupDismiss');
    
    if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.remove('active'));
    if (dismissBtn) dismissBtn.addEventListener('click', () => popup.classList.remove('active'));
    
    // Fechar ao clicar fora
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('active');
    });
}

// ============================================================
// 7. BOTÕES DE PRODUTO
// ============================================================

function handleProductButtons() {
    const productButtons = document.querySelectorAll('.btn-product, .btn-combo');
    
    productButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = btn.getAttribute('data-product');
            const price = btn.getAttribute('data-price');
            
            // Log para tracking (pode ser integrado com Google Analytics)
            console.log(`Produto clicado: ${product} - R$ ${price}`);
            
            // Enviar para Google Analytics se disponível
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_item', {
                    'items': [{
                        'item_name': product,
                        'price': parseFloat(price),
                        'currency': 'BRL'
                    }]
                });
            }
        });
    });
}

// ============================================================
// 8. TOAST NOTIFICAÇÕES
// ============================================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            ${message}
        </div>
    `;
    
    container.appendChild(toast);
    
    // Remove após duração
    setTimeout(() => {
        toast.remove();
    }, CONFIG.TOAST_DURATION);
}

// ============================================================
// 9. ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER)
// ============================================================

function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Desativa observador após animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(
        '.benefit-card, .product-card, .testimonial-card, ' +
        '.guarantee-card, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ============================================================
// 10. UTILITÁRIOS
// ============================================================

function formatCurrency(value) {
    return parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// ============================================================
// 11. RASTREAMENTO DE EVENTOS
// ============================================================

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Evento rastreado: ${category} > ${action} > ${label}`);
}

// Rastreia visualizações de seções
function trackSectionViews() {
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('Seção', 'Visualizada', entry.target.id);
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Rastreia cliques em CTAs
function trackCTAClicks() {
    document.querySelectorAll('.btn-primary, .btn-product, .btn-combo').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product') || btn.textContent.trim();
            trackEvent('CTA', 'Clicado', product);
        });
    });
}

// ============================================================
// 12. NOTIFICAÇÕES DE COMPRA AO VIVO
// ============================================================

function startLivePurchaseNotifications() {
    const buyers = [
        { name: 'Lucas', city: 'São Paulo', product: 'Office 2024' },
        { name: 'Patrícia', city: 'Belo Horizonte', product: 'Office 2024' },
        { name: 'André', city: 'Recife', product: 'Office 2019' },
        { name: 'Juliana', city: 'Porto Alegre', product: 'Office 2021' },
        { name: 'Marcelo', city: 'Salvador', product: 'Office 2016' },
        { name: 'Fernanda', city: 'Curitiba', product: 'Office 2024' },
        { name: 'Rafael', city: 'Fortaleza', product: 'Office 2021' },
        { name: 'Camila', city: 'Brasília', product: 'Combo Office + Windows' },
        { name: 'Diego', city: 'Manaus', product: 'Office 2024' },
        { name: 'Larissa', city: 'Florianópolis', product: 'Office 2019' },
        { name: 'Thiago', city: 'Goiânia', product: 'Office 2024' },
        { name: 'Amanda', city: 'Campinas', product: 'Office 2021' },
    ];

    const timeAgo = ['agora', 'há 1 min', 'há 2 min', 'há 3 min', 'há 5 min'];
    let index = 0;

    function showNotification() {
        const buyer = buyers[index % buyers.length];
        const time = timeAgo[Math.floor(Math.random() * timeAgo.length)];
        index++;

        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast toast-purchase';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-shopping-bag" style="color:#24A148"></i></div>
            <div class="toast-content">
                <strong>${buyer.name}</strong> de ${buyer.city}<br>
                <span style="font-size:12px;color:#6B7280">comprou ${buyer.product} · ${time}</span>
            </div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }

    setTimeout(showNotification, 8000);
    setInterval(showNotification, 18000 + Math.random() * 12000);
}

// ============================================================
// 13. BARRA STICKY CTA
// ============================================================

function initStickyCta() {
    const bar = document.getElementById('stickyCta');
    const hero = document.getElementById('hero');
    if (!bar || !hero) return;

    const observer = new IntersectionObserver(([entry]) => {
        bar.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(hero);
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Site carregado com sucesso - Office Original');

    // Inicia todas as funcionalidades
    startCountdown();
    startRealtimeSales();
    handleMobileNav();
    initFAQ();
    handleSmoothScroll();
    handleProductButtons();
    initAnimationsOnScroll();
    handleExitIntent();
    startLivePurchaseNotifications();
    initStickyCta();

    // Rastreamento
    trackSectionViews();
    trackCTAClicks();

    // Feedback visual em botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
});

// Log quando página termina de carregar
window.addEventListener('load', () => {
    console.log('✅ Página totalmente carregada');
    document.body.classList.add('loaded');
});

// ============================================================
// FUNÇÕES AUXILIARES DE DEBUG (desabilitar em produção)
// ============================================================

function debugInfo() {
    console.group('📊 Informações do Site');
    console.log('URL:', window.location.href);
    console.log('User Agent:', navigator.userAgent);
    console.log('Resolução:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('Idioma:', navigator.language);
    console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.groupEnd();
}

// Descomentar para debug: debugInfo();
