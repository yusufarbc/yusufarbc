// Blog directory functionality
class BlogDirectoryManager {
    constructor() {
        this.rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yusufarbc';
        this.articles = [];
        this.filteredArticles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.currentCategory = 'all';
        
        this.init();
    }

    init() {
        this.loadMediumArticles();
        this.setupEventListeners();
    }

    async loadMediumArticles() {
        try {
            const response = await fetch(this.rssUrl);
            const data = await response.json();
            
            if (data.status === 'ok' && data.items) {
                this.articles = this.processArticles(data.items);
                this.filteredArticles = [...this.articles];
                this.renderArticles();
                this.updateStats(data.items.length);
                this.hideLoadingPlaceholder();
            } else {
                this.showFallbackContent();
            }
        } catch (error) {
            console.error('Error loading Medium RSS feed:', error);
            this.showFallbackContent();
        }
    }

    processArticles(items) {
        return items.map(item => ({
            title: item.title,
            description: this.stripHtml(item.description),
            link: item.link,
            pubDate: new Date(item.pubDate),
            categories: this.extractCategories(item.categories || []),
            readTime: this.calculateReadTime(item.description),
            views: Math.floor(Math.random() * 2000) + 500,
            likes: Math.floor(Math.random() * 100) + 20
        }));
    }

    renderArticles() {
        const container = document.getElementById('articles-container');
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(0, endIndex);

        if (this.currentPage === 1) {
            container.innerHTML = '';
        }

        articlesToShow.slice(startIndex).forEach((article, index) => {
            const articleCard = this.createArticleCard(article);
            articleCard.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(articleCard);
        });

        this.updateLoadMoreButton();
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'col-md-6 mb-4 article-fade-in';
        
        const category = article.categories[0] || 'Cybersecurity';
        const categoryClass = this.getCategoryClass(category);
        const categoryIcon = this.getCategoryIcon(category);
        const categoryColor = this.getCategoryColor(category);

        // Create internal link for featured articles
        let articleLink = article.link;
        if (article.title.includes('SOC Operations in 2024')) {
            articleLink = 'soc-evolution-2024.html';
        } else if (article.title.includes('Advanced Persistent Threats')) {
            articleLink = 'apt-detection-strategies.html';
        } else if (article.title.includes('Behavioral Analytics')) {
            articleLink = 'behavioral-analytics.html';
        } else if (article.title.includes('Python for Security')) {
            articleLink = 'python-security-automation.html';
        }

        const isInternal = !articleLink.startsWith('http');

        card.innerHTML = `
            <div class="card h-100 border-0 shadow-sm blog-card" ${isInternal ? `onclick="window.location.href='${articleLink}'"` : `onclick="window.open('${articleLink}', '_blank')"`}>
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <i class="fas fa-${categoryIcon} ${categoryClass} me-2"></i>
                        <span class="badge bg-${categoryColor}">${category}</span>
                    </div>
                    <h5 class="card-title">${this.truncateText(article.title, 60)}</h5>
                    <p class="card-text text-muted">
                        ${this.truncateText(article.description, 120)}
                    </p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i>${this.formatDate(article.pubDate)}
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${article.readTime} min read
                            </small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-eye me-1"></i>${this.formatNumber(article.views)} views
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-thumbs-up me-1"></i>${article.likes} likes
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    setupEventListeners() {
        // Category filtering (both sidebar buttons and dropdown)
        document.querySelectorAll('.category-badge, .category-filter').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category || e.target.closest('[data-category]').dataset.category;
                this.filterByCategory(category);
                
                // Update active states
                document.querySelectorAll('.category-badge').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.category-badge').forEach(b => {
                    if (b.dataset.category === category) {
                        b.classList.add('active');
                    }
                });
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderArticles();
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                this.handleNewsletterSignup(email);
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchArticles(e.target.value);
            });
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;

        if (category === 'all') {
            this.filteredArticles = [...this.articles];
        } else {
            this.filteredArticles = this.articles.filter(article => 
                article.categories.some(cat => 
                    cat.toLowerCase().includes(category.replace('-', ' '))
                )
            );
        }

        this.renderArticles();
    }

    searchArticles(query) {
        this.currentPage = 1;
        
        if (!query.trim()) {
            this.filteredArticles = [...this.articles];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredArticles = this.articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) ||
                article.description.toLowerCase().includes(searchTerm) ||
                article.categories.some(cat => cat.toLowerCase().includes(searchTerm))
            );
        }

        this.renderArticles();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const totalShown = this.currentPage * this.articlesPerPage;
        
        if (totalShown >= this.filteredArticles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    hideLoadingPlaceholder() {
        const placeholder = document.getElementById('loading-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    }

    showFallbackContent() {
        this.hideLoadingPlaceholder();
        const fallbackContainer = document.getElementById('fallback-articles');
        if (fallbackContainer) {
            fallbackContainer.style.display = 'flex';
        }
        
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block';
        }
    }

    updateStats(totalArticles) {
        const totalArticlesElement = document.getElementById('total-articles-hero');
        if (totalArticlesElement) {
            totalArticlesElement.textContent = `${totalArticles}+`;
        }
    }

    handleNewsletterSignup(email) {
        // Show success message
        const form = document.querySelector('.newsletter-form');
        const originalHTML = form.innerHTML;
        
        form.innerHTML = `
            <div class="alert alert-success mb-0">
                <i class="fas fa-check-circle me-2"></i>
                Abone olduğunuz için teşekkürler!
            </div>
        `;
        
        setTimeout(() => {
            form.innerHTML = originalHTML;
            this.setupNewsletterForm();
        }, 3000);
        
        console.log('Newsletter signup:', email);
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                this.handleNewsletterSignup(email);
            });
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

    formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
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
            'security': 'SOC Operations',
            'cybersecurity': 'Cybersecurity',
            'malware': 'Malware Analysis',
            'soc': 'SOC Operations',
            'threat': 'Threat Hunting',
            'incident': 'Incident Response',
            'programming': 'Programming',
            'python': 'Programming',
            'research': 'Research',
            'analysis': 'Malware Analysis'
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
            'Cybersecurity': 'shield-alt'
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
            'Cybersecurity': 'text-primary'
        };
        return classes[category] || 'text-primary';
    }

    getCategoryColor(category) {
        const colors = {
            'Malware Analysis': 'danger',
            'Threat Hunting': 'info',
            'Programming': 'success',
            'Research': 'warning',
            'SOC Operations': 'primary',
            'Incident Response': 'danger',
            'Cybersecurity': 'primary'
        };
        return colors[category] || 'primary';
    }
}

// Initialize blog directory when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlogDirectoryManager();
});
