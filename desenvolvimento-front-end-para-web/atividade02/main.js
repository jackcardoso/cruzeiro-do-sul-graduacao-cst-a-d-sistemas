document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Hambúrguer
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const menuList = document.getElementById('menu-list');

    if (hamburgerBtn && menuList) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            menuList.classList.toggle('active');
        });
    }

    // 3. Submenu no mobile
    // Adiciona uma classe para identificar o pai do submenu
    document.querySelectorAll('.main-nav .submenu').forEach(submenu => {
        submenu.parentElement.classList.add('has-submenu');
    });

    document.querySelectorAll('.main-nav .has-submenu > a').forEach(submenuLink => {
        submenuLink.addEventListener('click', e => {
            // Previne a navegação padrão do link '#' em todas as resoluções
            e.preventDefault(); 

            const parentLi = submenuLink.parentElement;
            if (parentLi) {
                parentLi.classList.toggle('submenu-active');
            }
        });
    });

    // Reseta o menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 768px)').matches) { // Apenas em desktop
            document.querySelectorAll('.main-nav .has-submenu').forEach(li => {
                li.classList.remove('submenu-active');
            });
        }
    });
    // 2. Modal de Feedback e Formulário
    const contactForm = document.getElementById('contact-form');
    const volunteerForm = document.getElementById('volunteer-form');
    const modal = document.getElementById('modal-feedback');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.getElementById('modal-close');

    // Função para lidar com o envio do formulário
    const handleFormSubmit = (formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = formElement.nome.value.trim();

            if (formElement.id === 'volunteer-form') {
                const email = formElement.email.value.trim();
                const especialidade = formElement.especialidade.value;
                const disponibilidade = formElement.disponibilidade.value.trim();
                const motivacao = formElement.motivacao.value.trim();

                if (!name || !email || !especialidade || !disponibilidade || !motivacao) {
                    modalTitle.textContent = 'Feitiço Falhou!';
                    modalText.textContent = 'Por favor, preencha todos os campos do pergaminho de inscrição.';
                } else {
                    modalTitle.textContent = 'Inscrição Recebida!';
                    modalText.textContent = `Obrigado, ${name}! Analisaremos sua inscrição e entraremos em contato pelo seu e-mail arcano.`;
                    formElement.reset();
                }
            } else if (formElement.id === 'contact-form') {
                const email = formElement.email.value.trim();
                const message = formElement.mensagem.value.trim();
                if (!name || !email || !message) {
                modalTitle.textContent = 'Feitiço Falhou!';
                modalText.textContent = 'Por favor, preencha todos os campos do pergaminho.';
                } else {
                modalTitle.textContent = 'Corvo Enviado!';
                    modalText.textContent = `Sua mensagem foi enviada com sucesso, ${name}! Responderemos em breve.`;
                formElement.reset();
                }
            }
            showModal();
        });
    };

    // Adiciona o listener ao formulário que existir na página
    // A lógica do modal só deve ser ativada se um formulário existir na página
    if (modal && (contactForm || volunteerForm)) {
        if (modalText && closeModalBtn) {
            if (contactForm) handleFormSubmit(contactForm);
            if (volunteerForm) handleFormSubmit(volunteerForm);
    
            closeModalBtn.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal();
                }
            });
        }
    }

    function showModal() {
        if (modal) modal.classList.add('visible');
        closeModalBtn.focus();
    }

    function hideModal() {
        if (modal) modal.classList.remove('visible');
    }
});