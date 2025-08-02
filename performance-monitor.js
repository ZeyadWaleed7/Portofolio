// Performance monitoring for scrolling
class ScrollPerformanceMonitor {
    constructor() {
        this.scrollEvents = 0;
        this.lastScrollTime = 0;
        this.fps = 0;
        this.frameCount = 0;
        this.lastFpsTime = 0;
        this.init();
    }

    init() {
        // Monitor scroll events
        let scrollContainers = document.querySelectorAll('.projects-scroll-container, .experience-scroll-container');
        
        scrollContainers.forEach(container => {
            let ticking = false;
            
            container.addEventListener('scroll', () => {
                this.scrollEvents++;
                
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.updatePerformance();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true }); // Use passive listener for better performance
        });

        // Monitor FPS
        this.monitorFPS();
    }

    updatePerformance() {
        const now = performance.now();
        const timeSinceLastScroll = now - this.lastScrollTime;
        this.lastScrollTime = now;

        // Log performance data every 10 scroll events
        if (this.scrollEvents % 10 === 0) {
            console.log(`Scroll Performance - Events: ${this.scrollEvents}, FPS: ${this.fps.toFixed(1)}, Time since last scroll: ${timeSinceLastScroll.toFixed(2)}ms`);
        }
    }

    monitorFPS() {
        const updateFPS = () => {
            this.frameCount++;
            const now = performance.now();
            
            if (now - this.lastFpsTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastFpsTime = now;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        requestAnimationFrame(updateFPS);
    }
}

// Initialize performance monitoring when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only enable in development/debug mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new ScrollPerformanceMonitor();
        console.log('Scroll performance monitoring enabled');
    }
}); 