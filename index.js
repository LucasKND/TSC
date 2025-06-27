// Selecionando elementos do DOM
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Verificar se os elementos existem antes de adicionar event listeners
if (menuBtn && navLinks) {
    console.log('Menu hambúrguer inicializado');
    
    // Toggle do menu mobile
    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Menu clicado!');
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        // Impedir rolagem do body quando o menu está aberto
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Scroll suave para links de navegação internos com ajuste para barra de navegação fixa
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Obter altura atual da navbar para ajustar o scroll
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Detectar scroll para mudar o estilo da navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    // Mudando o estilo da navbar ao rolar
    if (scrollPosition > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.padding = '1rem 5%';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        // Na hero section, deixa o fundo transparente
        if (scrollPosition < window.innerHeight) {
            navbar.style.background = 'rgba(43, 48, 58, 0.8)';
        } else {
            navbar.style.background = 'rgba(43, 48, 58, 0.95)';
        }
        navbar.style.padding = '1.5rem 5%';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Destacando o item de menu ativo com base na seção visível
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});

// Funcionalidade do FAQ - expandir/recolher respostas
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Fecha todas as outras perguntas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });
            
            // Alterna o estado atual
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
});