/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Medium RSS Feed Integration
class MediumFeedLoader {
    constructor() {
        this.rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yusufarbc';
        this.maxArticles = 6;
    }

    async loadMediumArticles() {
        try {
            const response = await fetch(this.rssUrl);
            const data = await response.json();
            
            if (data.status === 'ok' && data.items) {
                this.renderArticles(data.items.slice(0, this.maxArticles));
                this.updateBlogStats(data.items.length);
            } else {
                console.warn('Medium RSS feed could not be loaded, using fallback content');
            }
        } catch (error) {
            console.error('Error loading Medium RSS feed:', error);
            console.log('Using fallback blog content');
        }
    }

    renderArticles(articles) {
        const blogContainer = document.querySelector('#blog .row');
        if (!blogContainer) return;

        // Clear existing article grid (keep featured article and stats)
        const existingGrid = blogContainer.querySelector('.col-md-6');
        if (existingGrid) {
            const articleCards = blogContainer.querySelectorAll('.col-md-6');
            articleCards.forEach(card => card.remove());
        }

        // Create new article cards
        articles.forEach((article, index) => {
            if (index === 0) {
                // Update featured article
                this.updateFeaturedArticle(article);
            } else {
                // Create regular article cards
                this.createArticleCard(article, blogContainer);
            }
        });
    }

    updateFeaturedArticle(article) {
        const featuredCard = document.querySelector('#blog .col-12 .card');
        if (!featuredCard) return;

        const title = featuredCard.querySelector('h4.card-title');
        const description = featuredCard.querySelector('.card-text');
        const date = featuredCard.querySelector('.text-muted small');
        const readMoreBtn = featuredCard.querySelector('.btn');

        if (title) title.textContent = this.truncateText(article.title, 60);
        if (description) description.textContent = this.stripHtml(article.description);
        if (date) date.innerHTML = `<i class="fas fa-calendar-alt me-1"></i>${this.formatDate(article.pubDate)}`;
        if (readMoreBtn) readMoreBtn.href = article.link;
    }

    createArticleCard(article, container) {
        const categories = this.extractCategories(article.categories);
        const category = categories[0] || 'Cybersecurity';
        const categoryClass = this.getCategoryClass(category);
        const icon = this.getCategoryIcon(category);

        const cardHtml = `
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm blog-article-card" onclick="window.open('${article.link}', '_blank')">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="fas fa-${icon} ${categoryClass} me-2"></i>
                            <span class="badge bg-${this.getBadgeColor(category)}">${category}</span>
                        </div>
                        <h5 class="card-title">${this.truncateText(article.title, 50)}</h5>
                        <p class="card-text text-muted">
                            ${this.truncateText(this.stripHtml(article.description), 120)}
                        </p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i>${this.formatDate(article.pubDate)}
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${this.calculateReadTime(article.description)} min read
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before the blog stats section
        const statsSection = container.querySelector('.row.mt-5');
        if (statsSection) {
            statsSection.parentNode.insertBefore(
                this.createElementFromHTML(cardHtml),
                statsSection
            );
        } else {
            container.insertAdjacentHTML('beforeend', cardHtml);
        }
    }

    updateBlogStats(totalArticles) {
        const statsCards = document.querySelectorAll('#blog .stat-card h3');
        if (statsCards.length >= 1) {
            statsCards[0].textContent = `${totalArticles}+`;
        }
    }

    // Utility functions
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = this.stripHtml(content).split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    }

    extractCategories(categories) {
        if (!categories || !Array.isArray(categories)) return ['Cybersecurity'];
        return categories.map(cat => this.mapToSecurityCategory(cat));
    }

    mapToSecurityCategory(category) {
        const mapping = {
            'security': 'Security',
            'cybersecurity': 'Cybersecurity',
            'malware': 'Malware Analysis',
            'soc': 'SOC Operations',
            'threat': 'Threat Hunting',
            'incident': 'Incident Response',
            'programming': 'Programming',
            'python': 'Programming',
            'research': 'Research',
            'analysis': 'Analysis'
        };

        const lowerCategory = category.toLowerCase();
        for (const [key, value] of Object.entries(mapping)) {
            if (lowerCategory.includes(key)) return value;
        }
        return 'Cybersecurity';
    }

    getCategoryIcon(category) {
        const icons = {
            'Malware Analysis': 'shield-virus',
            'Threat Hunting': 'search',
            'Programming': 'code',
            'Research': 'brain',
            'SOC Operations': 'shield-alt',
            'Incident Response': 'exclamation-triangle',
            'Analysis': 'chart-line'
        };
        return icons[category] || 'shield-alt';
    }

    getCategoryClass(category) {
        const classes = {
            'Malware Analysis': 'text-danger',
            'Threat Hunting': 'text-info',
            'Programming': 'text-success',
            'Research': 'text-warning',
            'SOC Operations': 'text-primary',
            'Incident Response': 'text-danger',
            'Analysis': 'text-info'
        };
        return classes[category] || 'text-primary';
    }

    getBadgeColor(category) {
        const colors = {
            'Malware Analysis': 'danger',
            'Threat Hunting': 'info',
            'Programming': 'success',
            'Research': 'warning',
            'SOC Operations': 'primary',
            'Incident Response': 'danger',
            'Analysis': 'info'
        };
        return colors[category] || 'primary';
    }

    createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
}

// Initialize Medium feed loader when page loads
document.addEventListener('DOMContentLoaded', () => {
    const mediumLoader = new MediumFeedLoader();
    
    // Load articles when the blog section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mediumLoader.loadMediumArticles();
                observer.unobserve(entry.target);
            }
        });
    });

    const blogSection = document.querySelector('#blog');
    if (blogSection) {
        observer.observe(blogSection);
    }
});
