// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Main Application =====
document.addEventListener('DOMContentLoaded', function() {
    const navTriggers = document.querySelectorAll('.nav-trigger');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton?.querySelector('.menu-icon');
    const closeIcon = mobileMenuButton?.querySelector('.close-icon');

    // ===== Page Navigation =====
    function showPage(targetId) {
        const id = targetId.substring(1);

        pages.forEach(page => {
            if (page.id === id) {
                page.classList.add('active');
                // Re-trigger scroll animations for the new page
                setTimeout(() => initScrollAnimations(), 100);
            } else {
                page.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu
        closeMobileMenu();
    }

    function closeMobileMenu() {
        mobileMenu?.classList.add('hidden');
        mobileMenuButton?.setAttribute('aria-expanded', 'false');
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
    }

    function openMobileMenu() {
        mobileMenu?.classList.remove('hidden');
        mobileMenu?.classList.add('mobile-menu-enter');
        mobileMenuButton?.setAttribute('aria-expanded', 'true');
        menuIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');
    }

    // Set initial page
    const initialHash = window.location.hash || '#home';
    showPage(initialHash);

    // Navigation click handlers
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            history.pushState(null, null, targetId);
            showPage(targetId);
        });
    });

    // Browser back/forward
    window.addEventListener('popstate', function() {
        const targetId = window.location.hash || '#home';
        showPage(targetId);
    });

    // Mobile menu toggle
    mobileMenuButton?.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuButton?.getAttribute('aria-expanded') === 'true') {
            closeMobileMenu();
            mobileMenuButton.focus();
        }
    });

    // ===== Scroll Animations with Intersection Observer =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.classList.remove('is-visible');
            observer.observe(el);
        });
    }

    initScrollAnimations();

    // ===== Animated Stat Counters =====
    initStatCounters();

    function initStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));

        function animateCounter(element, target) {
            const duration = 2000; // 2 seconds
            const start = 0;
            const startTime = performance.now();

            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                element.textContent = target.toLocaleString() + (target === 99 ? '%' : target === 24 ? '/7' : '+');
                return;
            }

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeOutQuart);

                // Format based on the stat type
                let suffix = '+';
                if (target === 99) suffix = '%';
                else if (target === 24) suffix = '/7';

                element.textContent = current.toLocaleString() + (progress === 1 ? suffix : '');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        }
    }

    // ===== Enhanced Product Card Interactions =====
    initProductCardEnhancements();

    function initProductCardEnhancements() {
        const productCards = document.querySelectorAll('.product-card');

        // Product specifications database (verified accurate specs)
        const productSpecs = {
            // CPUs - Intel Core i9-13900K (verified specs)
            'Intel Core i9-13900K': {
                specs: [
                    '24 Cores (8P + 16E) / 32 Threads',
                    'P-Core: 3.0GHz Base, 5.8GHz Turbo',
                    '36MB L3 Cache + 32MB L2 Cache',
                    'Intel LGA 1700 Socket',
                    '125W Base TDP (253W MTP)'
                ],
                category: 'Specifications'
            },
            // GPUs - NVIDIA RTX 4080 (verified specs)
            'NVIDIA RTX 4080': {
                specs: [
                    '16GB GDDR6X @ 22.4 Gbps',
                    '9728 CUDA Cores (AD103 GPU)',
                    'Boost Clock: 2.51 GHz',
                    'DLSS 3, Ray Tracing, AV1 Encode',
                    '320W TDP, PCIe 4.0 x16'
                ],
                category: 'Specifications'
            },
            // Generic GPU for featured section
            'Next-Gen GPU': {
                specs: [
                    'High-end graphics for 4K/144Hz gaming',
                    'Hardware ray tracing acceleration',
                    'AI-powered upscaling technology',
                    'VR Ready with low latency',
                    '3x DisplayPort 1.4a, 1x HDMI 2.1'
                ],
                category: 'Features'
            },
            // RAM - Corsair Vengeance RGB DDR5 (verified specs)
            'Corsair Vengeance RGB': {
                specs: [
                    '32GB (2x16GB) DDR5-6000 Kit',
                    '6000MT/s Speed, CL36-36-36-76',
                    '1.35V Operating Voltage',
                    'Intel XMP 3.0 Ready',
                    'Dynamic RGB Lighting w/ iCUE'
                ],
                category: 'Specifications'
            },
            // Motherboards - ASUS ROG Maximus Z790 (verified specs)
            'ASUS ROG Z790': {
                specs: [
                    'Intel LGA 1700 (12th/13th/14th Gen)',
                    'DDR5-7800+ (OC) Support',
                    'PCIe 5.0 x16 + PCIe 5.0 M.2',
                    'Wi-Fi 6E + Intel 2.5G LAN',
                    '18+1 Phase Power Delivery'
                ],
                category: 'Specifications'
            },
            // SSDs - Samsung 980 Pro (verified specs)
            'Samsung 980 Pro 2TB': {
                specs: [
                    '2TB NVMe M.2 2280 SSD',
                    'Read: 7,000 MB/s, Write: 5,100 MB/s',
                    'PCIe Gen 4.0 x4, NVMe 1.3c',
                    'Samsung V-NAND 3-bit MLC',
                    '1,200 TBW Endurance, 5-Year Warranty'
                ],
                category: 'Specifications'
            },
            // Generic SSD for featured section
            'Blazing-Fast SSD': {
                specs: [
                    'PCIe Gen 4.0 NVMe technology',
                    'Dramatically reduced load times',
                    'High TBW endurance rating',
                    'Built-in thermal throttling protection',
                    'Tool-free M.2 installation'
                ],
                category: 'Features'
            },
            // Coolers - Noctua NH-D15 (verified specs)
            'Noctua NH-D15': {
                specs: [
                    'Dual-Tower w/ 6 Heatpipes',
                    '2x NF-A15 PWM 140mm Fans',
                    '165mm Height, 250W+ TDP Capacity',
                    'SecuFirm2 Multi-Socket Mount',
                    '6-Year Warranty, NT-H1 Paste Included'
                ],
                category: 'Specifications'
            },
            // PSUs - Corsair RM850x (2021) (verified specs)
            'Corsair RM850x': {
                specs: [
                    '850W Continuous @ 50°C',
                    '80 PLUS Gold (>90% Efficiency)',
                    'Fully Modular, ATX 2.52',
                    'Zero RPM Mode, 135mm Fan',
                    '10-Year Warranty, Corsair Link'
                ],
                category: 'Specifications'
            },
            // Cases - Lian Li O11 Dynamic (verified specs)
            'Lian Li O11 Dynamic': {
                specs: [
                    'ATX/Micro-ATX/Mini-ITX Support',
                    'Dual-Chamber Aluminum + Glass',
                    '3x 360mm Radiator Positions',
                    'Vertical GPU Mount Compatible',
                    '446 x 272 x 445mm (L x W x H)'
                ],
                category: 'Specifications'
            },
            // Mouse - Logitech G Pro X Superlight (verified specs)
            'Logitech G Pro Wireless': {
                specs: [
                    'HERO 25K Sensor (100-25,600 DPI)',
                    'LIGHTSPEED Wireless (<1ms)',
                    '63g Ultralight Design',
                    'Ambidextrous w/ Removable Buttons',
                    '70-Hour Battery (No RGB)'
                ],
                category: 'Specifications'
            },
            // Keyboards - Razer Huntsman V2 TKL (verified specs)
            'Razer Huntsman V2': {
                specs: [
                    'Razer Optical Switches (Linear)',
                    'Tenkeyless (87-Key) Layout',
                    'Doubleshot PBT Keycaps',
                    'Razer Chroma RGB Per-Key',
                    'Detachable USB-C, Wrist Rest Included'
                ],
                category: 'Specifications'
            },
            // Generic mechanical keyboard for featured section
            'Mechanical Keyboard': {
                specs: [
                    'Hot-swappable mechanical switches',
                    'Full N-key rollover & anti-ghosting',
                    'Per-key RGB with software control',
                    'Aircraft-grade aluminum frame',
                    'Onboard memory for profiles'
                ],
                category: 'Features'
            },
            // Monitors - LG 27GP850-B UltraGear (verified specs)
            'LG UltraGear 27"': {
                specs: [
                    '27" QHD Nano IPS (2560x1440)',
                    '165Hz (OC 180Hz), 1ms GTG',
                    'NVIDIA G-Sync & AMD FreeSync',
                    'HDR400, DCI-P3 98% Color',
                    'Height/Tilt/Pivot/Swivel Stand'
                ],
                category: 'Specifications'
            },
            // Headsets - SteelSeries Arctis Pro Wireless (verified specs)
            'SteelSeries Arctis Pro': {
                specs: [
                    'Hi-Res Audio (40kHz Drivers)',
                    'Dual Wireless: 2.4GHz + Bluetooth',
                    'Swappable Battery System',
                    'ClearCast Bidirectional Mic',
                    '20+ Hours Per Battery'
                ],
                category: 'Specifications'
            },
            // Microphones - Blue Yeti (verified specs)
            'Blue Yeti USB Mic': {
                specs: [
                    '4 Patterns: Cardioid/Stereo/Omni/Bi',
                    '48kHz/16-bit Sample Rate',
                    'USB Plug & Play (No Drivers)',
                    '3.5mm Headphone Out w/ Volume',
                    'Adjustable Desktop Stand'
                ],
                category: 'Specifications'
            },
            // Webcams - Logitech C920 HD Pro (verified specs)
            'Logitech C920 Webcam': {
                specs: [
                    '1080p @ 30fps / 720p @ 30fps',
                    'Dual Omnidirectional Mics',
                    'HD Auto Light Correction',
                    '78° Diagonal Field of View',
                    'Universal Clip + Tripod Mount'
                ],
                category: 'Specifications'
            },
            // Mousepads - SteelSeries QcK XXL (verified specs)
            'SteelSeries QcK XXL': {
                specs: [
                    '900mm x 400mm x 4mm',
                    'Micro-Woven Cloth Surface',
                    'Non-Slip Rubber Base',
                    'Optimized for All Sensor Types',
                    'Machine Washable'
                ],
                category: 'Specifications'
            },
            // Cables - Generic premium cables
            'Premium Braided Cables': {
                specs: [
                    '300D High-Density Braided Sleeving',
                    '16 AWG High-Capacity Wires',
                    'Pre-crimped Cable Combs',
                    'Universal ATX/EPS Compatibility',
                    'Available in Multiple Colors'
                ],
                category: 'Features'
            }
        };

        productCards.forEach(card => {
            // Get product name from the card
            const titleElement = card.querySelector('h3');
            if (!titleElement) return;

            const productName = titleElement.textContent.trim();
            const specs = productSpecs[productName];

            // Add quick view badge
            const quickViewBadge = document.createElement('div');
            quickViewBadge.className = 'quick-view-badge';
            quickViewBadge.textContent = 'Quick View';
            quickViewBadge.setAttribute('aria-hidden', 'true');
            card.appendChild(quickViewBadge);

            // Add info icon trigger
            const infoIcon = document.createElement('button');
            infoIcon.className = 'info-icon';
            infoIcon.innerHTML = 'i';
            infoIcon.setAttribute('aria-label', `View ${productName} specifications`);
            infoIcon.setAttribute('type', 'button');
            card.appendChild(infoIcon);

            // Create and add the info overlay if we have specs
            let overlay;
            if (specs) {
                overlay = document.createElement('div');
                overlay.className = 'product-info-overlay';
                overlay.setAttribute('aria-label', `${productName} specifications`);
                overlay.setAttribute('role', 'tooltip');
                overlay.id = `overlay-${productName.replace(/\s+/g, '-').toLowerCase()}`;

                const specsList = specs.specs.map(spec => `<li>${spec}</li>`).join('');
                overlay.innerHTML = `
                    <h4>${specs.category}</h4>
                    <ul>${specsList}</ul>
                `;

                card.appendChild(overlay);
            } else {
                // For products without defined specs, create a generic overlay
                const description = card.querySelector('.text-gray-400')?.textContent || '';
                if (description) {
                    overlay = document.createElement('div');
                    overlay.className = 'product-info-overlay';
                    overlay.setAttribute('aria-label', `${productName} details`);
                    overlay.setAttribute('role', 'tooltip');
                    overlay.id = `overlay-${productName.replace(/\s+/g, '-').toLowerCase()}`;
                    overlay.innerHTML = `
                        <h4>Details</h4>
                        <ul>
                            <li>Premium quality product</li>
                            <li>Full manufacturer warranty</li>
                            <li>Fast shipping available</li>
                        </ul>
                    `;
                    card.appendChild(overlay);
                }
            }

            // Handle overlay persistence - keep it visible while hovering overlay itself
            if (overlay) {
                let hideTimeout;

                const showOverlay = () => {
                    clearTimeout(hideTimeout);
                    card.classList.add('overlay-active');
                };

                const hideOverlay = () => {
                    hideTimeout = setTimeout(() => {
                        card.classList.remove('overlay-active');
                    }, 150); // Small delay to allow moving to overlay
                };

                infoIcon.addEventListener('mouseenter', showOverlay);
                infoIcon.addEventListener('mouseleave', hideOverlay);
                infoIcon.addEventListener('focus', showOverlay);
                infoIcon.addEventListener('blur', hideOverlay);

                overlay.addEventListener('mouseenter', showOverlay);
                overlay.addEventListener('mouseleave', hideOverlay);
            }

            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `${productName} product card`);

            // Handle keyboard interaction
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Find and click the "Add to Cart" button or "View Details" link
                    const actionButton = card.querySelector('button, a.nav-trigger');
                    if (actionButton) {
                        actionButton.click();
                    }
                }
            });

            // 3D tilt effect based on mouse position
            card.addEventListener('mousemove', (e) => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `translateY(-16px) rotateX(${4 + rotateX}deg) rotateY(${-2 + rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ===== Back to Top Button =====
    const backToTopButton = document.getElementById('back-to-top');

    const handleScroll = debounce(() => {
        if (window.scrollY > 300) {
            backToTopButton?.classList.add('visible');
        } else {
            backToTopButton?.classList.remove('visible');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Lazy Loading Images =====
    const lazyImages = document.querySelectorAll('.lazy-image');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => {
            img.addEventListener('load', () => img.classList.add('loaded'));
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(img => img.classList.add('loaded'));
    }

    // ===== Update Footer Year =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== Cart Functionality =====
const cart = {
    items: JSON.parse(localStorage.getItem('lootbox_cart')) || [],

    save() {
        localStorage.setItem('lootbox_cart', JSON.stringify(this.items));
    },

    addItem(product) {
        const existingItem = this.items.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.showNotification(`${product.name} added to cart!`, 'success');
    },

    removeItem(productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.save();
    },

    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
        }
    },

    getTotal() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[₱,]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    },

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    clear() {
        this.items = [];
        this.save();
    },

    showNotification(message, type = 'success') {
        const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
        const icon = type === 'success'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
            : type === 'error'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';

        const notification = document.createElement('div');
        notification.className = `toast fixed top-24 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    ${icon}
                </svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('toast-exit');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

function addToCart(button) {
    // Add loading state
    const originalText = button.textContent;
    button.classList.add('btn-loading');
    button.textContent = 'Adding';
    button.disabled = true;

    // Simulate network delay for better UX feedback
    setTimeout(() => {
        const card = button.closest('.product-card');
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.text-indigo-400').textContent;
        const image = card.querySelector('img').src;
        const description = card.querySelector('.text-gray-400').textContent;

        cart.addItem({ name, price, image, description });
        updateCartBadge();

        // Reset button
        button.classList.remove('btn-loading');
        button.textContent = originalText;
        button.disabled = false;

        // Add visual feedback
        button.textContent = 'Added!';
        button.classList.add('bg-green-600');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-600');
        }, 1500);
    }, 300);
}

function updateCartBadge() {
    const count = cart.getItemCount();
    const cartCountEl = document.getElementById('cart-count');
    const mobileCartCountEl = document.getElementById('mobile-cart-count');

    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.classList.toggle('hidden', count === 0);

        // Animate badge on update
        if (count > 0) {
            cartCountEl.classList.add('scale-125');
            setTimeout(() => cartCountEl.classList.remove('scale-125'), 200);
        }
    }
    if (mobileCartCountEl) {
        mobileCartCountEl.textContent = count;
    }
}

function goToCart() {
    window.location.href = 'cart.html';
}

// ===== Form Validation =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');
    const messageInput = document.getElementById('message');
    const messageCount = document.getElementById('message-count');

    // Character counter for message
    messageInput?.addEventListener('input', function() {
        if (messageCount) {
            messageCount.textContent = this.value.length;
        }
    });

    // Form validation
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Please enter a message (at least 10 characters)'
        }
    };

    function showError(field, message) {
        const input = document.getElementById(field);
        const errorEl = document.getElementById(`${field}-error`);

        input?.classList.add('error');
        input?.classList.remove('success');

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    function clearError(field) {
        const input = document.getElementById(field);
        const errorEl = document.getElementById(`${field}-error`);

        input?.classList.remove('error');

        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
    }

    function showSuccess(field) {
        const input = document.getElementById(field);
        input?.classList.add('success');
        input?.classList.remove('error');
        clearError(field);
    }

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        input?.addEventListener('blur', function() {
            if (this.value) {
                if (validators[field].validate(this.value)) {
                    showSuccess(field);
                } else {
                    showError(field, validators[field].message);
                }
            }
        });

        input?.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                if (validators[field].validate(this.value)) {
                    showSuccess(field);
                }
            }
        });
    });

    // Form submission
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate all fields
        Object.keys(validators).forEach(field => {
            const input = document.getElementById(field);
            if (!input || !validators[field].validate(input.value)) {
                showError(field, validators[field].message);
                isValid = false;
            } else {
                showSuccess(field);
            }
        });

        if (!isValid) {
            // Focus first error field
            const firstError = contactForm.querySelector('.error');
            firstError?.focus();
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('btn-loading');
        submitBtn.textContent = 'Sending';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('btn-loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            formSuccess?.classList.remove('hidden');

            // Reset form
            contactForm.reset();
            messageCount.textContent = '0';

            // Clear success states
            Object.keys(validators).forEach(field => {
                const input = document.getElementById(field);
                input?.classList.remove('success', 'error');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess?.classList.add('hidden');
            }, 5000);

            // Show notification
            cart.showNotification('Message sent successfully!', 'success');
        }, 1500);
    });

    // Initialize cart badge
    updateCartBadge();
});

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts
    if (e.altKey) {
        switch(e.key) {
            case 'h':
                e.preventDefault();
                document.querySelector('a[href="#home"]')?.click();
                break;
            case 'c':
                e.preventDefault();
                document.querySelector('a[href="#components"]')?.click();
                break;
            case 'p':
                e.preventDefault();
                document.querySelector('a[href="#peripherals"]')?.click();
                break;
            case 'a':
                e.preventDefault();
                document.querySelector('a[href="#about"]')?.click();
                break;
        }
    }
});

