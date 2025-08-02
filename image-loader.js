// Image Loading Optimization
class ImageLoader {
    constructor() {
        this.images = document.querySelectorAll('.project-img');
        this.init();
    }

    init() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }

        // Setup image load events
        this.setupImageLoadEvents();
    }

    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before image comes into view
            threshold: 0.1
        });

        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupImageLoadEvents() {
        this.images.forEach(img => {
            // Add loading state
            img.classList.add('image-loading');

            // Handle image load events
            img.addEventListener('load', () => {
                this.onImageLoad(img);
            });

            img.addEventListener('error', () => {
                this.onImageError(img);
            });
        });
    }

    loadImage(img) {
        const src = img.getAttribute('src');
        if (src && !img.complete) {
            // Create a new image to preload
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = src;
            };
            tempImg.src = src;
        }
    }

    onImageLoad(img) {
        img.classList.remove('image-loading');
        img.classList.add('image-loaded', 'loaded');

        // Remove loading animation
        img.style.animation = 'none';
        img.style.background = 'none';
    }

    onImageError(img) {
        img.classList.remove('image-loading');
        img.classList.add('image-error');

        // Show error placeholder
        img.style.background = '#2a2a2a';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = '#666';
        img.style.fontSize = '14px';
        img.alt = 'Image failed to load';
    }

    loadAllImages() {
        // Fallback: load all images immediately
        this.images.forEach(img => {
            this.loadImage(img);
        });
    }
}

// Progressive image loading with WebP support
class ProgressiveImageLoader {
    constructor() {
        this.images = document.querySelectorAll('.project-img');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            this.setupProgressiveLoading(img);
        });
    }

    setupProgressiveLoading(img) {
        const src = img.getAttribute('src');
        if (!src) return;

        // Check WebP support
        this.checkWebPSupport().then(webpSupported => {
            if (webpSupported) {
                this.loadWebPImage(img, src);
            } else {
                // Fallback to original format
                this.loadOriginalImage(img, src);
            }
        });
    }

    async checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    loadWebPImage(img, originalSrc) {
        const webpSrc = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        // Try to load WebP first, fallback to original
        const webpImg = new Image();
        webpImg.onload = () => {
            img.src = webpSrc;
        };
        webpImg.onerror = () => {
            // WebP failed, use original
            this.loadOriginalImage(img, originalSrc);
        };
        webpImg.src = webpSrc;
    }

    loadOriginalImage(img, src) {
        // Load original image
        const originalImg = new Image();
        originalImg.onload = () => {
            img.src = src;
        };
        originalImg.src = src;
    }
}

// Image preloader for critical images
class ImagePreloader {
    constructor() {
        this.criticalImages = [
            'assets/logo.png',
            'assets/profile.png'
        ];
        this.init();
    }

    init() {
        this.preloadCriticalImages();
    }

    preloadCriticalImages() {
        this.criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image optimizations
    new ImageLoader();
    new ProgressiveImageLoader();
    new ImagePreloader();

    // Add loading performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('resource');
            const imageResources = perfData.filter(entry =>
                entry.initiatorType === 'img' || entry.name.includes('.png') || entry.name.includes('.jpg')
            );

            console.log('Image loading performance:', imageResources.map(img => ({
                name: img.name,
                duration: img.duration,
                size: img.transferSize
            })));
        });
    }
});

// Export for potential use in other scripts
window.ImageOptimizer = {
    ImageLoader,
    ProgressiveImageLoader,
    ImagePreloader
}; 